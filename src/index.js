import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store, { persistor } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
        <ChakraProvider>
          <App />
        </ChakraProvider>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
