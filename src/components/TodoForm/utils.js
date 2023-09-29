export const addNote = (data) => {
  const list = JSON.parse(localStorage.getItem("todoList")) || [];
  localStorage.setItem("todoList", JSON.stringify([...list, data]));
};

export const editNote = (data, id) => {
  const list = JSON.parse(localStorage.getItem("todoList")) || [];
  const listWithoutDeletedItem = list.filter((note) => note.id !== id);
  localStorage.setItem(
    "todoList",
    JSON.stringify([...listWithoutDeletedItem, data])
  );
};
