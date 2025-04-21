"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Volume2, Clock, Zap, Settings } from "lucide-react"

export default function SettingsPage() {
  const [gameTime, setGameTime] = useState(60)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [hardMode, setHardMode] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* CRT effect overlay */}
      <div className="absolute inset-0 z-0 crt-overlay"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-0 scanlines"></div>

      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg"></div>

      <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>

      <Card className="z-10 w-full max-w-xl bg-black/80 border-2 border-cyan-500 shadow-[0_0_30px_rgba(80,200,255,0.5)]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center arcade-font">
            <Settings className="mr-2 h-6 w-6 text-cyan-400" />
            SETTINGS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                <Label htmlFor="game-time" className="text-lg font-medium text-cyan-300 arcade-font">
                  Game Duration
                </Label>
              </div>
              <span className="text-xl font-bold text-white arcade-font">{gameTime}s</span>
            </div>
            <Slider
              id="game-time"
              min={30}
              max={120}
              step={15}
              value={[gameTime]}
              onValueChange={(value) => setGameTime(value[0])}
              className="[&>span:first-child]:h-2 [&>span:first-child]:bg-cyan-950 [&_[role=slider]]:bg-cyan-500 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-2 [&_[role=slider]]:border-cyan-300 [&>span:first-child_span]:bg-cyan-600"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="w-5 h-5 text-cyan-400 mr-2" />
                <Label htmlFor="sound-effects" className="text-lg font-medium text-cyan-300 arcade-font">
                  Sound Effects
                </Label>
              </div>
              <Switch
                id="sound-effects"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="w-5 h-5 text-purple-400 mr-2" />
                <Label htmlFor="music" className="text-lg font-medium text-purple-300 arcade-font">
                  Background Music
                </Label>
              </div>
              <Switch
                id="music"
                checked={musicEnabled}
                onCheckedChange={setMusicEnabled}
                className="data-[state=checked]:bg-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                <Label htmlFor="hard-mode" className="text-lg font-medium text-yellow-300 arcade-font">
                  Hard Mode
                </Label>
              </div>
              <Switch
                id="hard-mode"
                checked={hardMode}
                onCheckedChange={setHardMode}
                className="data-[state=checked]:bg-red-500"
              />
            </div>
          </div>

          <div className="bg-purple-950/50 p-4 rounded-lg border border-purple-800 mt-6">
            <p className="text-sm text-purple-300">
              <strong>NOTE:</strong> These settings will be applied to your next game. Current games in progress will
              not be affected.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Link href="/">
              <Button className="w-48 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border border-cyan-400 arcade-button">
                SAVE SETTINGS
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
