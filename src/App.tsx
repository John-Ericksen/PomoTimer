import './App.css'
import Content from './components/Content/Content';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline/>
      <Content/>
    </CssVarsProvider>
  )
}
export default App
