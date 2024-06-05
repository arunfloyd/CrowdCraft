import { Provider } from "react-redux";
import Router from "./components/Router/Router";
import store from "./components/store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />;
      </Provider>
    </>
  );
}

export default App;
