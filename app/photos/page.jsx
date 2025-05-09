import PhotoUploader from "../components/PhotoUploader"
import PhotoGrid from "../components/PhotoGrid"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import ParticlesBackground from "../components/ParticlesBackground"


export default function Photos(){
    return (
    <main className="flex flex-col min-h-screen bg-white text-black relative p-10">
        <div className="z-0">
            <ParticlesBackground />
        </div>
        <div className="sticky top-0 z-11 flex justify-center">
            <Nav />
        </div>
        <div className="container mx-auto px-4 py-4 z-10">
            <div className="flex flex-col items-center mb-6">
            <h1 className="text-4xl pt-4 font-bold mb-4">Photos</h1>
            <PhotoUploader />
            </div>
            <PhotoGrid />
        </div>
        <div className="mt-auto flex justify-center z-10">
            <Footer />
        </div>
    </main>
    )
}