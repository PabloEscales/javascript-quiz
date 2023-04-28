import './App.css'
import { Container, Stack, Typography, useTheme } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'
import { useQuestionsData } from './hooks/useQuestionsData'
import { Results } from './Results'
import useMediaQuery from "@mui/material/useMediaQuery";

function App () {
  const questions = useQuestionsStore(state => state.questions)
  const { unanswered } = useQuestionsData()
  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
            JavaScript Quiz
          </Typography>


        </Stack>

          <strong style={{ fontSize: '18px', marginBottom: '48px', display: 'block' }}>
            Test your knowledge of JavaScript 💪
          </strong>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

        <strong style={{ display: 'block', fontSize: '14px', marginTop: '48px' }}>Develop with React, TypeScript & Zustand - <a style={{ color: 'yellow' }} href='https://github.com/PabloEscales/javascript-quiz'>Go to code</a></strong>

      </Container>
    </main>
  )
}

export default App
