import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const supabaseServer = async () => {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )
}

export const getSession = async () => {
  const supabase = await supabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const getUser = async () => {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signIn = async (email: string, password: string) => {
  const supabase = await supabaseServer()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signUp = async (email: string, password: string) => {
  const supabase = await supabaseServer()
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const supabase = await supabaseServer()
  const { error } = await supabase.auth.signOut()
  
  if (error) throw error
}