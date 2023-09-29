import { Box, IconButton, useTheme } from "@mui/material";
import NightModeToggle from "../NightModeToggle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useGetCurrLocation, useRouterBack } from "../../utils";
import { routes } from "../../constant";

function Navbar() {
  const routerBack = useRouterBack();
  const currLocation = useGetCurrLocation();
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.primary.contrastText}
      className='sticky top-0 shadow-md w-full p-4 flex justify-between items-center opacity-100'
    >
      <div className='flex items-center'>
        {![routes.HOME, ""].includes(currLocation) && (
          <IconButton onClick={routerBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <p>Weather today</p>
      </div>
      <div>
        <NightModeToggle />
      </div>
    </Box>
  );
}

export default Navbar;
