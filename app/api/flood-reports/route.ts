import { NextResponse } from "next/server"
import { supabaseServer } from "@/app/auth/supabase"
import { z } from "zod"

const reportSchema = z.object({
  location: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  waterLevel: z.enum(["ankle", "knee", "waist"]),
  description: z.string().optional(),
  imageUrl: z.string().optional()
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const severity = searchParams.get("severity")

    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    let query = supabase
      .from('flood_reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    if (severity) {
      query = query.eq('water_level', severity)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ reports: data })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flood reports" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = reportSchema.parse(body)

    const { data, error } = await supabase
      .from('flood_reports')
      .insert([{
        location: validatedData.location,
        coordinates: `POINT(${validatedData.coordinates.lng} ${validatedData.coordinates.lat})`,
        water_level: validatedData.waterLevel,
        description: validatedData.description,
        image_url: validatedData.imageUrl,
        user_id: user.id
      }])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: "Flood report submitted successfully",
      report: data[0]
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit flood report" },
      { status: 500 }
    )
  }
}
