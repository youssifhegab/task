import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { addNote, editNote } from "./utils";
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { useRouterBack } from "../../utils";

function TodoForm() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const routeBack = useRouterBack();

  const id = queryParams.get("id");
  const isEditing = !!id;
  const todoList = JSON.parse(localStorage.getItem("todoList"));

  const selectedNote = todoList.find((note) => note.id === id);

  const { register, handleSubmit } = useForm({ defaultValues: selectedNote });
  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
    console.log({ data });
    if (isEditing) {
      console.log({ data });
      editNote(data, id);
      routeBack();
      return;
    }
    const uniqueId = uuid().slice(0, 8);
    const formattedData = { ...data, id: uniqueId };
    addNote(formattedData);
    navigate("/");
  };

  return (
    <div className='w-full flex-1'>
      <form
        className='flex flex-col justify-between p-4 h-full'
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className='flex flex-col gap-6'>
          <TextField label='title' {...register("title")} />
          <TextField
            label='content'
            {...register("content")}
            placeholder='MultiLine with rows: 2 and rowsMax: 4'
            multiline
            rows={20}
            maxRows={20}
          />
        </div>
        <Button variant='contained' type='submit'>
          Save
        </Button>
      </form>
    </div>
  );
}

export default TodoForm;
