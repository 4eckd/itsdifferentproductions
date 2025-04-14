import { Globe } from "@/components/globe"
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { IconAppWindow } from "@tabler/icons-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 relative">
            <div className="relative w-full max-w-[480px] aspect-square">
                <Globe />
                <h1 className="mt-1 text-gray-800 flex min-h-screen flex-col items-center justify-center p-2 relative">Its Different Productions ™</h1>
                <p className="mt-1 text-gray-800 flex items-center justify-center">Welcome to Our new Digital Shop across the Globe!</p>
            </div>
        </main>
    );
}

export function BackgroundGradientDemo() {
    return (
        <div>
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <Image
                    src="/public/pikachu.jpg"
                    alt="Pikachu"
                    height="400"
                    width="400"
                    className="object-contain"
                />
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    Pikachu Lighting
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    A classic desk lamp for anime lovers.
                </p>
                <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                    <span>Buy now</span>
                    <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">$65.00</span>
                </button>
            </BackgroundGradient>
        </div>
    );
}