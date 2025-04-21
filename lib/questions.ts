// This file contains the questions for the quiz game
// You can easily modify these questions or add new ones

export interface Question {
  question: string
  answers: string[]
  correctAnswer: string
  category: "tech" | "scifi" | "arcade"
}

export const questions: Question[] = [
  // Tech Questions
  {
    question: "Who is known as the co-founder of Apple Inc. along with Steve Jobs?",
    answers: ["Steve Wozniak", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    correctAnswer: "Steve Wozniak",
    category: "tech",
  },
  {
    question: "What does CPU stand for?",
    answers: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Core Processing Unit"],
    correctAnswer: "Central Processing Unit",
    category: "tech",
  },
  {
    question: "Which programming language was created by Brendan Eich in 10 days?",
    answers: ["JavaScript", "Python", "Java", "C++"],
    correctAnswer: "JavaScript",
    category: "tech",
  },
  {
    question: "What year was the first iPhone released?",
    answers: ["2007", "2005", "2010", "2008"],
    correctAnswer: "2007",
    category: "tech",
  },
  {
    question: "Which company developed the first commercially available quantum computer?",
    answers: ["D-Wave", "IBM", "Google", "Microsoft"],
    correctAnswer: "D-Wave",
    category: "tech",
  },

  // Sci-Fi Questions
  {
    question: "Who wrote the novel 'Dune'?",
    answers: ["Frank Herbert", "Isaac Asimov", "Arthur C. Clarke", "Philip K. Dick"],
    correctAnswer: "Frank Herbert",
    category: "scifi",
  },
  {
    question: "In 'Star Wars', what is the name of Han Solo's ship?",
    answers: ["Millennium Falcon", "Star Destroyer", "X-Wing", "TIE Fighter"],
    correctAnswer: "Millennium Falcon",
    category: "scifi",
  },
  {
    question: "Which sci-fi film features a computer system called Skynet?",
    answers: ["The Terminator", "The Matrix", "Blade Runner", "Alien"],
    correctAnswer: "The Terminator",
    category: "scifi",
  },
  {
    question: "In 'Star Trek', what is the name of the Vulcan mind technique?",
    answers: ["Mind Meld", "Mind Link", "Mind Sync", "Mind Fusion"],
    correctAnswer: "Mind Meld",
    category: "scifi",
  },
  {
    question: "Which author wrote 'The Hitchhiker's Guide to the Galaxy'?",
    answers: ["Douglas Adams", "Isaac Asimov", "Ray Bradbury", "Philip K. Dick"],
    correctAnswer: "Douglas Adams",
    category: "scifi",
  },

  // Arcade Questions
  {
    question: "Which arcade game features a yellow character eating dots while avoiding ghosts?",
    answers: ["Pac-Man", "Space Invaders", "Donkey Kong", "Galaga"],
    correctAnswer: "Pac-Man",
    category: "arcade",
  },
  {
    question: "What year was the arcade game 'Space Invaders' released?",
    answers: ["1978", "1982", "1975", "1980"],
    correctAnswer: "1978",
    category: "arcade",
  },
  {
    question: "Which company created the arcade game 'Street Fighter'?",
    answers: ["Capcom", "Sega", "Namco", "Atari"],
    correctAnswer: "Capcom",
    category: "arcade",
  },
  {
    question: "What was the first commercially successful video game?",
    answers: ["Pong", "Tetris", "Space Invaders", "Asteroids"],
    correctAnswer: "Pong",
    category: "arcade",
  },
  {
    question: "Which arcade game features a gorilla throwing barrels at a plumber?",
    answers: ["Donkey Kong", "Pac-Man", "Frogger", "Galaga"],
    correctAnswer: "Donkey Kong",
    category: "arcade",
  },
]
