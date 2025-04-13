import { Globe } from "@/components/globe"

import { Button } from "@/components/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
      <div className="relative w-full max-w-[480px] aspect-square">
        <Globe />
        <h1 className="mt-1 text-gray-800 flex min-h-screen flex-col items-center justify-center p-2 relative">Its Different Productions ™</h1>
        <p className="mt-1 text-gray-800 flex items-center justify-center">Welcome to Our new Digital Shop across the Globe!
        </p>
        <Button />
      </div>
    </main>
  )
}
