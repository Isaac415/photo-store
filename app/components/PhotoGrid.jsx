import { getSupabaseServer } from "../utils/supabaseServerClient";
import Photo from "./Photo";

async function fetchUserPhotos(user){
    if (!user) return;

    const folderPath = `user_uploads/${user.id}/`
    const supabaseServer = await getSupabaseServer();
    const {data, error} = await supabaseServer.storage
        .from('photos')
        .list(folderPath)
    
    if (error) {
        console.error('Error fetching photos', error)
        return
    }
    return data
}

async function getPhotoUrls(photos, user){
    const supabaseServer = await getSupabaseServer();
    return Promise.all(photos.map(async (photo) => {
        const {data, error} = await supabaseServer.storage
            .from('photos')
            .createSignedUrl(`user_uploads/${user.id}/${photo.name}`, 60 * 60)
        if (error){
            console.error('Error generating signed url', error)
            return
        }
        return {url: data.signedUrl, photoName: photo.name}
    }))
}



export default async function PhotoGrid({favorites = false}){
    const supabaseServer = await getSupabaseServer();
    const { data: { user } } = await supabaseServer.auth.getUser()
    const photos = await fetchUserPhotos(user);
    const photoObjects = await getPhotoUrls(photos, user);


    return (
        <div className="flex flex-wrap justify-center gap-6">
            {
                photoObjects.map((photo, index) => (
                    <Photo
                        key={photo.photoName}
                        src={photo.url}
                        alt={`Photo ${photo.photoName}`}
                        width={200}
                        height={200}
                        index={index}
                    />
                ))
            }
        </div>
    )
}