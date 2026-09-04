import AppRouter from "@/router/AppRouter"
import { ThemeProvider } from "next-themes"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
