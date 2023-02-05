import React, { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([{ label: "go to store" }]);
  const [editing, setEditing] = useState(false);
  const [editingNum, setEditingNum] = useState(0);
  const [addingTodo, setAddingTodo] = useState(false);

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setTodos([...todos, { label: formData.get("todo") as string }]);
    setAddingTodo(false);
  }

  function update(e: React.FormEvent) {
    e.preventDefault();
    setEditing(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const num = parseInt(formData.get("num") as string);
    const todo = formData.get("todo");
    todos[num].label = todo as string;
    setTodos([...todos]);
  }

  return (
    <div className="box">
      <h2 className="title">Todos</h2>

      {todos.map((el, num) => (
        <div className="box columns" key={num}>
          <div className="column">{el.label}</div>
          <div className="column">
            <button
              className="button is-link"
              onClick={() => {
                setEditing(true);
                setEditingNum(num);
              }}
            >
              Edit
            </button>
          </div>
          <div className="column">
            <button className="button is-link">delete</button>
          </div>
        </div>
      ))}

      <button className="button is-link" onClick={() => setAddingTodo(true)}>
        Add todo
      </button>

      {editing && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content has-background-white p-3 ">
            <h3 className="title">Edit</h3>
            <form onSubmit={update}>
              <input type="hidden" name="num" value={editingNum} />
              <input
                className="input is-primary"
                type={"text"}
                defaultValue={todos[editingNum].label}
                name="todo"
              />
              <button
                onClick={() => setEditing(false)}
                className="button is-link"
              >
                cancel
              </button>
              <button className="button is-link" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {addingTodo && (
        <>
          <hr />
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content has-background-white p-3">
              <h2 className="title">Add todo</h2>
              <form onSubmit={submitForm}>
                <input className="input is-primary" name="todo" />
                <button
                  onClick={() => setAddingTodo(false)}
                  className="button is-link"
                >
                  cancel
                </button>
                <button className="button is-link" type="submit">
                  add
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
