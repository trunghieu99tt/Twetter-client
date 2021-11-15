// import "./wdyr";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "context/app.context";
import { ToastContainer, toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "draft-js/dist/Draft.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-virtualized/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";

import "./i18.config";

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
