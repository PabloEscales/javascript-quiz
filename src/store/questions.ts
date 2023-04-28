import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

const API_URL = 'https://microsoft-quiz.vercel.app/'

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    loading: false,
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch(`${API_URL}/data.json`)
      const json = await res.json()

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions }, false, 'FETCH_QUESTIONS')
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // using structureClone
      const newQuestions = structuredClone(questions)
      // find the index of the question
      const questionIndex = newQuestions.findIndex((q: any) => q.id === questionId)
      // get the info of the question
      const questionInfo = newQuestions[questionIndex]
      // ask if the user has already selected an answer
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      // change this info in the question clone
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // update the state
      set({ questions: newQuestions }, false, 'SELECT_ANSWER')
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
      }
    },

    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION')
      }
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, {
  name: 'questions'
})))
