import { expose } from "comlink";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { filter, mapTo } from "rxjs/operators";

const epicMiddleware = createEpicMiddleware();

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(
  counterReducer,
  applyMiddleware(logger, epicMiddleware)
);

const __subscribe = store.subscribe;
store.subscribe = cb => {
  const unsubscribe = __subscribe(cb);
};

const pingEpic = action$ =>
  action$.pipe(
    filter(action => action.type === "PING"),
    mapTo({ type: "PONG" })
  );

epicMiddleware.run(pingEpic);

expose(store);
