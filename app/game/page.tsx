"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap, Clock, Award, Download } from "lucide-react"
import { getAllQuestions } from "@/data/questions-service"

interface GameData {
  score: number
  answeredQuestions: {
    questionId: number
    question: string
    options: string[]
    userAnswer: string
    correctAnswer: string
    correct: boolean
    timeSpent: number
  }[]
  startTime: string
  endTime?: string
}

export default function GamePage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([])
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [userData, setUserData] = useState<any>(null)
  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    answeredQuestions: [],
    startTime: new Date().toISOString(),
  })

  // Initialize game
  useEffect(() => {
    const allQuestions = getAllQuestions()

    // Create shuffled questions with randomized answer options
    const shuffled = allQuestions.map((question) => {
      // Create a copy of the answers array
      const shuffledAnswers = [...question.answers]

      // Shuffle the answers
      for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]]
      }

      return {
        ...question,
        originalAnswers: question.answers,
        answers: shuffledAnswers,
      }
    })

    setQuestions(allQuestions)
    setShuffledQuestions(shuffled)

    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      router.push("/register")
    }

    setQuestionStartTime(Date.now())
  }, [router])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true)
      const endTime = new Date().toISOString()
      setGameData((prev) => ({ ...prev, endTime }))
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Save game data to localStorage
  useEffect(() => {
    if (gameData.answeredQuestions.length > 0) {
      localStorage.setItem("gameData", JSON.stringify(gameData))
    }
  }, [gameData])

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null || shuffledQuestions.length === 0 || !shuffledQuestions[currentQuestionIndex]) return

    const timeSpent = (Date.now() - questionStartTime) / 1000
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const correct = answer === currentQuestion.correctAnswer
    setSelectedAnswer(answer)
    setIsCorrect(correct)

    const newScore = correct ? score + 10 : score
    setScore(newScore)

    const newGameData = {
      ...gameData,
      score: newScore,
      answeredQuestions: [
        ...gameData.answeredQuestions,
        {
          questionId: currentQuestion.id,
          question: currentQuestion.question,
          options: currentQuestion.answers,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
          correct,
          timeSpent,
        },
      ],
    }
    setGameData(newGameData)

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setQuestionStartTime(Date.now())
      } else {
        const endTime = new Date().toISOString()
        setGameData((prev) => ({ ...prev, endTime }))
        setGameOver(true)
      }
    }, 1000)
  }

  // Export game data as CSV
  const exportToCSV = () => {
    if (!gameData || !userData) return

    // Create CSV header
    let csv = "Player Name,Roll Number,Phone Number,Score,Start Time,End Time\n"

    // Add player info and game summary
    csv += `${userData.name},${userData.rollNumber},${userData.phoneNumber},${gameData.score},${new Date(gameData.startTime).toLocaleString()},${gameData.endTime ? new Date(gameData.endTime).toLocaleString() : ""}\n\n`

    // Add questions header
    csv += "Question ID,Question,Options,User Answer,Correct Answer,Result,Time Spent (seconds)\n"

    // Add each question data
    gameData.answeredQuestions.forEach((q) => {
      csv += `${q.questionId},"${q.question}","${q.options.join("; ")}","${q.userAnswer}","${q.correctAnswer}",${q.correct ? "Correct" : "Incorrect"},${q.timeSpent.toFixed(2)}\n`
    })

    // Create download link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `quiz_results_${userData.name}_${new Date().toLocaleDateString()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center font-mono">
        <div className="text-2xl text-lime-400 animate-pulse arcade-font">LOADING GAME...</div>
      </div>
    )
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-arcade">
        <div className="absolute inset-0 z-0 bg-[url('/retro-bg.gif')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 z-0 crt-overlay"></div>
        <div className="absolute inset-0 z-0 scanlines"></div>

        {/* Tech circuit patterns */}
        <div className="absolute top-0 left-0 w-full h-full circuit-overlay"></div>

        <Card className="z-10 w-full max-w-md p-8 bg-black/90 border-4 border-lime-400 shadow-[0_0_40px_rgba(0,255,0,0.6)]">
          <h2 className="text-5xl font-extrabold mb-6 text-center text-lime-400 drop-shadow-glow arcade-font">
            GAME OVER
          </h2>

          <div className="flex items-center justify-center mb-8">
            <Award className="w-16 h-16 text-yellow-400 mr-4" />
            <div className="text-center">
              <p className="text-lg text-pink-300">FINAL SCORE</p>
              <p className="text-6xl font-bold text-yellow-300 arcade-font">{score}</p>
            </div>
          </div>

          <div className="bg-gray-900/70 p-4 rounded-lg border border-lime-800 mb-6">
            <p className="text-center text-pink-200">
              {userData?.name || "Player"} nailed {Math.floor(score / 10)} techy puzzles!
            </p>
            <p className="text-center text-sm text-cyan-300 mt-2">Roll #: {userData?.rollNumber || "N/A"}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={exportToCSV}
              className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 border border-cyan-300 arcade-button"
            >
              <Download className="w-5 h-5 mr-2" /> EXPORT RESULTS
            </Button>

            <Button
              onClick={() => {
                setCurrentQuestionIndex(0)
                setScore(0)
                setTimeLeft(60)
                setSelectedAnswer(null)
                setIsCorrect(null)
                setGameOver(false)
                setQuestionStartTime(Date.now())
                setGameData({ score: 0, answeredQuestions: [], startTime: new Date().toISOString() })
              }}
              className="w-full h-12 bg-gradient-to-r from-fuchsia-600 to-lime-500 hover:from-fuchsia-700 hover:to-lime-600 border border-lime-300 arcade-button"
            >
              RESTART
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full h-12 border-fuchsia-500 text-fuchsia-300 arcade-button"
            >
              BACK TO MENU
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4 font-arcade">
      <div className="absolute inset-0 z-0 bg-[url('/retro-bg.gif')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 z-0 crt-overlay"></div>
      <div className="absolute inset-0 z-0 scanlines"></div>

      {/* Tech circuit patterns */}
      <div className="absolute top-0 left-0 w-full h-full circuit-overlay opacity-20"></div>

      <div className="fixed top-0 left-0 right-0 z-20 bg-black/90 border-b border-fuchsia-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-lime-400 mr-2" />
            <span className="text-xl font-bold text-lime-400">{score}</span>
          </div>

          <div className="flex-1 mx-8">
            <Progress value={(timeLeft / 60) * 100} className="h-3 bg-gray-700">
              <div
                className={`h-full ${timeLeft < 10 ? "bg-red-600" : "bg-lime-500"} transition-all duration-300`}
              ></div>
            </Progress>
          </div>

          <div className="flex items-center">
            <Clock className="w-5 h-5 text-cyan-400 mr-2" />
            <span className={`text-xl font-bold ${timeLeft < 10 ? "text-red-500" : "text-cyan-300"}`}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <Card className="z-10 w-full max-w-2xl p-6 bg-black/85 border-4 border-lime-400 shadow-[0_0_30px_rgba(0,255,0,0.6)] mt-16">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-pink-300">
              QUESTION {currentQuestionIndex + 1} OF {shuffledQuestions.length}
            </p>
            <p className="text-sm text-yellow-300">{currentQuestion.category.toUpperCase()}</p>
          </div>
          <h2 className="text-2xl font-bold text-white">{currentQuestion.question}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.answers.map((answer: string, index: number) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`h-14 text-left justify-start px-4 text-lg transition-all duration-300 arcade-button ${
                selectedAnswer === answer
                  ? isCorrect
                    ? "bg-green-600 hover:bg-green-700 border-green-400"
                    : "bg-red-600 hover:bg-red-700 border-red-400"
                  : "bg-gray-900 hover:bg-gray-800 border border-lime-700 hover:border-lime-500"
              } ${
                selectedAnswer && selectedAnswer !== answer && answer === currentQuestion.correctAnswer
                  ? "bg-green-600 border-green-400"
                  : ""
              }`}
              disabled={selectedAnswer !== null}
            >
              <span className="mr-3 text-fuchsia-400 arcade-font">{String.fromCharCode(65 + index)}.</span> {answer}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}
