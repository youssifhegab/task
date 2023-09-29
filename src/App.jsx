import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { useThemeContext } from "./context";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import TodoForm from "./components/TodoForm";
import TodoPage from "./components/TodoPage";
import Weather from "./components/Weather";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='relative w-full h-full flex flex-col'>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/form' element={<TodoForm />} />
          <Route path=':id' element={<TodoPage />} />
          <Route path='weather' element={<Weather />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
