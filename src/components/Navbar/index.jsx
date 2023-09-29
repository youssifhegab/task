import { Box, IconButton, useTheme } from "@mui/material";
import NightModeToggle from "../NightModeToggle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudIcon from "@mui/icons-material/Cloud";

import { useGetCurrLocation, useRouterBack } from "../../utils";
import { routes } from "../../constant";
import { Link } from "react-router-dom";

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
        {currLocation !== routes.WEATHER && (
          <Link to={routes.WEATHER}>
            <CloudIcon />
          </Link>
        )}
      </div>
      <div>
        <NightModeToggle />
      </div>
    </Box>
  );
}

export default Navbar;
