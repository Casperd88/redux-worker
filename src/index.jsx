import React from "react";
import { Provider, connect } from "react-redux";
import { render } from "react-dom";
import { wrap } from "comlink";
import remoteStoreWrapper from "./remoteStoreWrapper";
import "./polyfill";

async function init() {
  const worker = new Worker("./store.js", { type: "module" });
  const remoteStore = wrap(worker);
  const store = await remoteStoreWrapper(remoteStore);

  const mapState = state => ({ count: state });
  const mapDispatch = {
    increment() {
      return {
        type: "INCREMENT"
      };
    },
    decrement() {
      return {
        type: "DECREMENT"
      };
    },
    ping() {
      return {
        type: "PING"
      };
    }
  };

  const Counter = connect(
    mapState,
    mapDispatch
  )(({ count, increment, decrement, ping, hello }) => (
    <>
      Count: {count}
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={ping}>Ping</button>
    </>
  ));

  const App = () => (
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  render(<App />, document.getElementById("root"));
}

init();
