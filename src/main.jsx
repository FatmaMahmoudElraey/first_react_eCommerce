import { createRoot } from "react-dom/client";
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/index.css";
import "./styles/styles.css";
import { store } from "./store";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />,
  </Provider>
);
