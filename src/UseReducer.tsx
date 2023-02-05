import React, { useReducer, useState } from "react";
import { produce } from "immer";
enum Actions {
  EDIT_TODO,
  ADD_TODO,
}

type State = Record<string, any>;
type Action = {
  type: Actions;
  payload: any;
};

function myReducerFunction(state: State, action: Action) {
  if (action.type === Actions.EDIT_TODO) {
    return produce(state, (state) => {
      state.todos[action.payload.num].label = action.payload.todo;
    });
  }

  if (action.type === Actions.ADD_TODO) {
    return produce(state, (state) => {
      state.todos.push({ label: action.payload });
    });
  }

  return { ...state };
}

export default function UserReducer() {
  const [editing, setEditing] = useState(false);
  const [editingNum, setEditingNum] = useState(0);
  const [addingTodo, setAddingTodo] = useState(false);

  const [state, dispatch] = useReducer(myReducerFunction, {
    todos: [{ label: "go to store" }],
  });

  function submitForm(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    setAddingTodo(false);

    dispatch({
      type: Actions.ADD_TODO,
      payload: formData.get("todo"),
    });
  }

  function update(e: React.FormEvent) {
    e.preventDefault();
    setEditing(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const num = parseInt(formData.get("num") as string);
    const todo = formData.get("todo");

    dispatch({
      type: Actions.EDIT_TODO,
      payload: {
        num,
        todo,
      },
    });

    // todos[num].label = todo as string;
    // setTodos([...todos]);
  }

  return (
    <div className="box">
      <h2 className="title">Todos</h2>

      {state.todos.map((el: Record<string, any>, num: number) => (
        <div className="box columns" key={num}>
          <div className="column">{el.label}</div>
          <div className="column">
            <button
              className="button"
              onClick={() => {
                setEditing(true);
                setEditingNum(num);
              }}
            >
              Edit
            </button>
          </div>
          <div className="column">
            <button className="button">delete</button>
          </div>
        </div>
      ))}

      <button className="button" onClick={() => setAddingTodo(true)}>
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
                defaultValue={state.todos[editingNum].label}
                name="todo"
              />
              <button onClick={() => setEditing(false)} className="button">
                cancel
              </button>
              <button className="button" type="submit">
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
                <button onClick={() => setAddingTodo(false)} className="button">
                  cancel
                </button>
                <button className="button" type="submit">
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
