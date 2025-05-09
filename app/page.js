
import AuthForm from "./components/AuthForm";
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <main className="flex items-center justify-center bg-white min-h-screen">
        <div className="relative w-full max-w-lg">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-400 rounded-lg"></span>
        <div className="relative bg-gray-50 rounded-lg shadow-lg p-6 w-full max-w-lg border-2 border-indigo-400">
          <h2 className="text-black text-2xl font-bold mb-4 text-center">Welcome to Photo Store</h2>
          <p className="mb-6 text-lg text-center text-black">
            Sign in to upload and save your favorite photos.
          </p>
          <AuthForm />
        </div>
      </div>
      </main>
    </>
  )
}
