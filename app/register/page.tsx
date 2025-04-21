"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Hash, Phone, Gamepad2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    rollNumber: "",
    phoneNumber: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors = {
      name: !formData.name ? "Name is required" : "",
      rollNumber: !formData.rollNumber ? "Roll number is required" : "",
      phoneNumber: !formData.phoneNumber
        ? "Phone number is required"
        : !/^\d{10}$/.test(formData.phoneNumber)
          ? "Enter a valid 10-digit phone number"
          : "",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(formData))

    // Initialize game data
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        score: 0,
        answeredQuestions: [],
        startTime: new Date().toISOString(),
      }),
    )

    // Redirect to game
    router.push("/game")
  }

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

      <Card className="z-10 w-full max-w-md bg-black/80 border-2 border-cyan-500 shadow-[0_0_30px_rgba(80,200,255,0.5)]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 arcade-font">
            PLAYER REGISTRATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-cyan-300 flex items-center">
                <User className="w-4 h-4 mr-2" /> Player Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-900 border-cyan-700 focus:border-cyan-500 text-white"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-purple-300 flex items-center">
                <Hash className="w-4 h-4 mr-2" /> Roll Number
              </Label>
              <Input
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="bg-gray-900 border-purple-700 focus:border-purple-500 text-white"
                placeholder="Enter your roll number"
              />
              {errors.rollNumber && <p className="text-red-500 text-sm">{errors.rollNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-yellow-300 flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="bg-gray-900 border-yellow-700 focus:border-yellow-500 text-white"
                placeholder="Enter your phone number"
                type="tel"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border border-cyan-400 arcade-button"
            >
              <Gamepad2 className="w-5 h-5 mr-2" /> READY PLAYER ONE
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
