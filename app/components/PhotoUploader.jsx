'use client'

import { useState } from "react"
import { supabase } from "../utils/supabaseClient"
import { useRouter } from "next/navigation"

export default function PhotoUploader(){
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    async function handleFileUpload(event){
        try {
            setUploading(true);
            const file = event.target.files[0]
            const fileExt = file.name.split(".").pop()
            const fileName = `${Date.now()}.${fileExt}`;

            // Get current active user
            const {data: {user}} = await supabase.auth.getUser()
            if (!user){
                throw new Error("User not authenticated for photo upload!")
            }
            const filePath = `user_uploads/${user.id}/${fileName}`
            const {error} = await supabase.storage.from('photos')
                .upload(filePath, file)
            
            if (error) {
                throw error
            }

            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path: '/photos'})
            })

            router.refresh()

        } catch(err) {
            console.log(err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <label 
            htmlFor="photo-upload"
            className="cursor-pointer bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 m-2"
        >
            {uploading ? "Uploading..." : "Upload Photo"}
            <input 
                type="file" 
                id="photo-upload"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
            />
        </label>
    )
}