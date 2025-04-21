// This file provides functions to access and manage questions
import { techQuestions } from "./tech-questions"
import { scifiQuestions } from "./scifi-questions"
import { arcadeQuestions } from "./arcade-questions"

export interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: string
  category: "tech" | "scifi" | "arcade"
  difficulty: "easy" | "medium" | "hard"
}

// Get all questions from all categories
export function getAllQuestions(): Question[] {
  return [...techQuestions, ...scifiQuestions, ...arcadeQuestions]
}

// Get questions by category
export function getQuestionsByCategory(category: "tech" | "scifi" | "arcade"): Question[] {
  switch (category) {
    case "tech":
      return techQuestions
    case "scifi":
      return scifiQuestions
    case "arcade":
      return arcadeQuestions
    default:
      return []
  }
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: "easy" | "medium" | "hard"): Question[] {
  const allQuestions = getAllQuestions()
  return allQuestions.filter((q) => q.difficulty === difficulty)
}

// Get a random selection of questions
export function getRandomQuestions(count: number): Question[] {
  const allQuestions = getAllQuestions()
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Shuffle the answers for a question
export function shuffleAnswers(question: Question): Question {
  const shuffledAnswers = [...question.answers]

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]]
  }

  return {
    ...question,
    answers: shuffledAnswers,
  }
}
