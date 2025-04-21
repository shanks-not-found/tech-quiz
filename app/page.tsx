import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Joystick, Zap, Info, Settings2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* CRT effect overlay */}
      <div className="absolute inset-0 z-0 crt-overlay"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-0 scanlines"></div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg"></div>

      {/* Arcade cabinet frame */}
      <div className="absolute inset-0 z-0 arcade-cabinet">
        <div className="cabinet-top"></div>
        <div className="cabinet-sides"></div>
      </div>

      {/* Neon glow effects */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-cyan-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-20 h-20 rounded-full bg-lime-500/30 blur-2xl animate-pulse"></div>

      <div className="z-10 text-center px-4 max-w-3xl relative">
        {/* Pixel art joystick */}
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 pixel-joystick">
          <Joystick className="w-16 h-16 text-cyan-400" />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-500 retro-text arcade-font">
          TECH QUEST
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cyan-300 glitch-text arcade-font">
          RAPID-FIRE SCI-FI & TECH TRIVIA
        </p>

        <div className="space-y-6 mt-12">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/register" className="w-full md:w-auto">
              <Button className="w-full md:w-64 h-16 text-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-700 hover:to-cyan-700 border-2 border-cyan-400 shadow-[0_0_15px_rgba(80,200,255,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(80,200,255,0.8)] arcade-button">
                <Zap className="w-5 h-5 mr-2" /> START GAME
              </Button>
            </Link>

            <Link href="/instructions" className="w-full md:w-auto">
              <Button className="w-full md:w-64 h-16 text-xl bg-gradient-to-r from-lime-600 to-fuchsia-600 hover:from-lime-700 hover:to-fuchsia-700 border-2 border-lime-400 shadow-[0_0_15px_rgba(80,255,80,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(80,255,80,0.8)] arcade-button">
                <Info className="w-5 h-5 mr-2" /> HOW TO PLAY
              </Button>
            </Link>
          </div>

          <Link href="/settings" className="block w-full md:w-auto mx-auto">
            <Button
              variant="ghost"
              className="w-full md:w-64 h-12 text-lg text-purple-300 hover:text-purple-200 hover:bg-purple-950 shadow-[0_0_10px_rgba(180,80,255,0.3)] transition-all duration-300 arcade-button"
            >
              <Settings2 className="w-4 h-4 mr-2" /> SETTINGS
            </Button>
          </Link>
        </div>

        {/* Pixel art controls */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="pixel-art-controls">
            <div className="pixel-button red"></div>
            <div className="pixel-button blue"></div>
            <div className="pixel-button green"></div>
            <div className="pixel-button yellow"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-cyan-600 arcade-font">
        INSERT COIN TO CONTINUE • © {new Date().getFullYear()} TECH QUEST ARCADE • V1.0
      </div>

      {/* Circuit board patterns */}
      <div className="absolute bottom-0 left-0 w-32 h-32 circuit-pattern"></div>
      <div className="absolute top-0 right-0 w-32 h-32 circuit-pattern"></div>
    </div>
  )
}
