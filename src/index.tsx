/// <reference types="@welldone-software/why-did-you-render" />
import "./wdyr";

import "antd/dist/antd.css";
import AppProvider from "context/app.context";
import "draft-js/dist/Draft.css";
import React, { Suspense } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "react-toastify/dist/ReactToastify.css";
import "react-virtualized/styles.css";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "./i18.config";
injectStyle();

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AppProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <HelmetProvider>
                <App />
              </HelmetProvider>
              <ToastContainer
                position="bottom-left"
                hideProgressBar
                autoClose={5000}
              />
            </RecoilRoot>
          </QueryClientProvider>
        </BrowserRouter>
      </AppProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
