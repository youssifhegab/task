import { IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { routes } from "../../constant";

function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const todoList = JSON.parse(localStorage.getItem("todoList"));

  const selectedNote = todoList.find((note) => note.id === id);

  return (
    <div className='w-full flex-1 flex flex-col gap-6 p-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-extrabold'>{selectedNote.title}</h2>
        <div className='flex gap-2'>
          <IconButton
            onClick={() => {
              navigate(`/${routes.FORM}?${new URLSearchParams({ id })}`, {
                replace: true,
              });
            }}
          >
            <EditIcon
              sx={{ "&:hover": { color: "#1976d2" } }}
              fontSize='large'
            />
          </IconButton>
          <IconButton
            onClick={() => {
              const listWithoutDeletedItem = todoList.filter(
                (note) => note.id !== id
              );
              localStorage.setItem(
                "todoList",
                JSON.stringify(listWithoutDeletedItem)
              );
              navigate("/");
            }}
          >
            <DeleteForeverIcon
              sx={{ "&:hover": { color: "rgb(185 28 28)" } }}
              fontSize='large'
            />
          </IconButton>
        </div>
      </div>
      <p className='whitespace-pre-wrap'>{selectedNote.content}</p>
    </div>
  );
}

export default TodoPage;
