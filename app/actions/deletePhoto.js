'use server'
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function extractFilePath(url) {
    const parts = url.split('/user_uploads/')
    if (parts.length < 2) {
        console.error("Invalid URL format")
        return ""
    }
    let filePath = parts[1]
    if (filePath.includes('?')) {
        filePath = filePath.split('?')[0]
    }
    return 'user_uploads/' + filePath
}

export async function deletePhoto(formData) {
    const src = formData.get('photoPath')
    const filePath = extractFilePath(src)

    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name, options) {
                    cookieStore.set({ name, value: '', ...options })
                }
            }
        }
    )
    const { error, data } = await supabase.storage.from('photos').remove([filePath])
    if (error) {
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
    revalidatePath('/photos')

    return NextResponse.json({ success: true }, { status: 200 })
}