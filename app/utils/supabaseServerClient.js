import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function createSupabase(){
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name){
                    return cookieStore.get(name)?.value
                }
            }
        }
    )
}

export async function getSupabaseServer() {
    return await createSupabase();
  }