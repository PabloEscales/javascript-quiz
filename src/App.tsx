import './App.css'
import { Container, Stack, Typography, useTheme } from '@mui/material'
import { MicrosoftLogo } from './MicrosoftLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'
import { useQuestionsData } from './hooks/useQuestionsData'
import { Results } from './Results'
import useMediaQuery from "@mui/material/useMediaQuery";
import { SocialIcon } from 'react-social-icons';

function App () {
  const questions = useQuestionsStore(state => state.questions)
  const { unanswered } = useQuestionsData()
  const theme = useTheme()

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <MicrosoftLogo />
          <Typography variant={medium ? 'h2' : 'h5'} component='h1'>
            Microsoft Quiz
          </Typography>

        </Stack>

          <strong style={{ fontSize: '20px', marginBottom: '48px', display: 'block' }}>
            Test your knowledge of PL-900 Certification 💪
          </strong>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

        <strong style={{ display: 'block', fontSize: '14px', marginTop: '48px' }}>Develop with React, TypeScript & Zustand<a style={{ color: 'yellow' }} href='https://github.com/PabloEscales/javascript-quiz' target="_blank"><br/>

        <SocialIcon
          url="https://github.com/PabloEscales/microsoft-quiz"
          fgColor='gray'
          bgColor='transparent'
          target="_blank"
          style={{ marginBottom: "-6px" }}
        />

        <br/>View code</a></strong>

      </Container>
    </main>
  )
}

export default App
