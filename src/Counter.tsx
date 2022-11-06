import { FunctionComponent, useReducer } from "react";

import { produce } from "immer";

interface CounterProps {}

const ACTIONS = {
  INCREASE1: "INCREASE1",
  INCREASE2: "INCREASE2",
  INC_BOTH: "INC_BOTH",
  DEC_BOTH: "DEC_BOTH",
  SWITCH: "SWITCH",
  BOTH_SAME: "BOTH_SAME",
};

enum Axons {
  "INCREASE1",
  "INCREASE2",
  "INC_BOTH",
  "DEC_BOTH",
  "SWITCH",
  "BOTH_SAME",
}

type Action = {
  type: string;
  payload?: Record<string, any>;
};
type State = { counter1: number; counter2: number };

function reducer(state: State, action: Action) {
  return produce(state, (state) => {
    if (action.type === ACTIONS.INCREASE1) {
      state.counter1++;
    }

    if (action.type === ACTIONS.INCREASE2) {
      state.counter2++;
    }

    if (action.type === ACTIONS.INC_BOTH) {
      state.counter1++;
      state.counter2++;
    }

    if (action.type === ACTIONS.DEC_BOTH) {
      state.counter1--;
      state.counter2--;
    }

    if (action.type === ACTIONS.BOTH_SAME) {
      const same = Math.min(state.counter1, state.counter2);
      state.counter1 = state.counter2 = same;
    }

    if (action.type === ACTIONS.SWITCH) {
      const tmp = state.counter1;
      state.counter1 = state.counter2;
      state.counter2 = tmp;
    }

    return state;
  });
}

const Counter: FunctionComponent<CounterProps> = () => {
  const [state, dispatch] = useReducer(reducer, { counter1: 1, counter2: 2 });

  return (
    <>
      <div>
        counter1: {state.counter1}{" "}
        <button onClick={() => dispatch({ type: ACTIONS.INCREASE1 })}>
          increase counter1
        </button>
        <br />
        counter2: {state.counter2}
        <button onClick={() => dispatch({ type: ACTIONS.INCREASE2 })}>
          increase counter2
        </button>
        <hr />
        <button onClick={() => dispatch({ type: ACTIONS.INC_BOTH })}>
          increase both
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DEC_BOTH })}>
          decrease both
        </button>
        <hr />
        <button onClick={() => dispatch({ type: ACTIONS.BOTH_SAME })}>
          make both same
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.SWITCH })}>
          switch
        </button>
      </div>
    </>
  );
};

export default Counter;
