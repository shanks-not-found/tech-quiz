import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Zap, Award, ArrowLeft, Gamepad, Download } from "lucide-react"

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* CRT effect overlay */}
      <div className="absolute inset-0 z-0 crt-overlay"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-0 scanlines"></div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg"></div>

      {/* Tech circuit patterns */}
      <div className="absolute top-0 left-0 w-full h-full circuit-overlay opacity-20"></div>

      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-cyan-500/30 blur-3xl animate-pulse"></div>

      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>

      <Card className="z-10 w-full max-w-2xl bg-black/80 border-2 border-cyan-500 shadow-[0_0_30px_rgba(80,200,255,0.5)]">
        <CardHeader className="border-b border-cyan-800">
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-lime-400 arcade-font">
            HOW TO PLAY
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2 arcade-font">Beat the Clock</h3>
              <p className="text-gray-300">
                You have 60 seconds to answer as many questions as possible. The timer keeps ticking, so think fast!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2 arcade-font">Score Points</h3>
              <p className="text-gray-300">
                Each correct answer earns you 10 points. Wrong answers don't deduct points, but they waste precious
                time!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-2 arcade-font">Challenge Yourself</h3>
              <p className="text-gray-300">
                Questions cover tech, sci-fi, and arcade gaming topics. How many can you answer correctly before time
                runs out?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Gamepad className="w-8 h-8 text-pink-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-pink-300 mb-2 arcade-font">Controls</h3>
              <p className="text-gray-300">
                Click or tap on your answer choice. The faster you answer, the more questions you can tackle!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Download className="w-8 h-8 text-lime-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-lime-300 mb-2 arcade-font">Save Your Results</h3>
              <p className="text-gray-300">
                After the game, you can export your results to a spreadsheet file to track your progress over time!
              </p>
            </div>
          </div>

          <div className="bg-cyan-950/50 p-4 rounded-lg border border-cyan-800 mt-6">
            <p className="text-sm text-cyan-300">
              <strong>TIP:</strong> The game gets progressively more challenging. Early questions are easier, so make
              sure to answer them quickly!
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/register">
              <Button className="w-64 h-16 text-xl bg-gradient-to-r from-fuchsia-600 to-lime-500 hover:from-fuchsia-700 hover:to-lime-600 border-2 border-lime-400 shadow-[0_0_15px_rgba(80,255,80,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(80,255,80,0.8)] arcade-button">
                START GAME
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
