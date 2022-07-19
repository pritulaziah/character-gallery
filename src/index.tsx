import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react/macro";
import { QueryClient, QueryClientProvider } from "react-query";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Routes, Route, HashRouter } from "react-router-dom";
import Characters from "components/Characters";
import Character from "components/Character";

axios.defaults.baseURL = "https://api.jikan.moe/v4";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global
        styles={{
          body: {
            fontFamily: "Roboto",
            width: "100%",
            minHeight: "100vh",
          },
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
        }}
      />
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="characters">
              <Route index element={<Characters />} />
              <Route path=":characterId" element={<Character />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
