import './App.css'
import Content from './components/Content/Content';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';
import { extendTheme } from "@mui/joy";

const CustomTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {},
    },
    dark: {
      palette: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          
        },
      },
    },
  },
});
 
function App() {
  return (
    <CssVarsProvider defaultMode='dark' theme={CustomTheme} >
      <CssBaseline/>
      <Content/>
    </CssVarsProvider>
  )
}
export default App
