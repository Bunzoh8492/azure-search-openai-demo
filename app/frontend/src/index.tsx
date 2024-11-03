import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter  } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";
import {AuthContextProvider} from "./components/Auth/authcontext"
import "./index.css";
import App from "./pages/App"

initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>
);
