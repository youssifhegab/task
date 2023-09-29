import { useMemo, useState } from "react";
import { createTheme } from "@mui/material";

export const useColorTheme = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    localStorage.setItem("mode", mode === "light" ? "dark" : "light");
  };

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
