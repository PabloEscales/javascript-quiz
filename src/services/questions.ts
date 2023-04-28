export const getAllQuestions = async () => {
  const res = await fetch('http://microsoft-quiz.vercel.app/data.json')
  const json = await res.json()
  return json
}
