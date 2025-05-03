 import { NextResponse } from "next/server"
import { supabaseServer } from "@/app/auth/supabase"

export async function GET(request: Request) {
  try {
    const supabase = await supabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const severity = searchParams.get("severity")

    let query = supabase
      .from('flood_alerts')
      .select('*')
      .order('created_at', { ascending: false })

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    if (severity) {
      query = query.eq('severity', severity)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ alerts: data })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flood alerts" },
      { status: 500 }
    )
  }
}
