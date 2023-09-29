import { Box, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { routes } from "../../constant";

function HomePage() {
  const theme = useTheme();
  const todoList = JSON.parse(localStorage.getItem("todoList"));

  if (todoList.length === 0) {
    return (
      <div className='w-full flex flex-1 h-full justify-center items-center'>
        <h1 className='tex text-3xl font-bold'>You todo list is empty.</h1>
      </div>
    );
  }

  return (
    <Box className='flex-1 flex flex-col gap-4 w-full p-6'>
      <Link to={routes.FORM} className='self-center'>
        <Button variant='contained'>Add note</Button>
      </Link>
      {todoList.map((todo) => (
        <Link key={todo.id} to={`${todo.id}`}>
          <Box
            sx={{
              display: "flex",
              bgcolor: theme.palette.grey[200],
            }}
            className='flex flex-col p-4 shadow-md rounded-md'
          >
            <p className='text-black font-semibold text-lg'>{todo.title}</p>
            <p className='truncate text-black'>{todo.content}</p>
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default HomePage;
