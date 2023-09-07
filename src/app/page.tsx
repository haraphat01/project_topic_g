import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-2xl px-4 py-8 mx-auto">
        <h1 className="text-4xl font-bold text-center">Welcome to the Project Topic Generator!</h1>
        <p className="mt-4 text-lg text-center">Are you a final year student looking for project topic ideas? Look no further!</p>
        <div className="mt-8">
          <Image src="/project-idea.png" alt="Project Idea" width={400} height={300} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">How it works:</h2>
          <ul className="mt-4 list-disc list-inside">
            <li>Enter your area of study or interest</li>
            <li>Click the "Generate" button</li>
            <li>Get a list of project topic ideas tailored to your field</li>
          </ul>
        </div>
      </div>
    </main>
  )
}