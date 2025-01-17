import { useContext} from 'react'
import { NavLink, Routes, Route, Link, useNavigate } from "react-router-dom";
import github from "../assets/github.svg";
import styles from "./App.module.css";
import {LoggedInContext} from '../components/Auth/authcontext'

import Login from "./authuser/Auth"
import QA from "./qa/QA"
import Chat from "./chat/Chat"

const App = () => {

    const isLoggedIn = useContext(LoggedInContext)
    const navigation = useNavigate()

    type Props = {
        children?: React.ReactNode;
    }

    // ログイン済みの場合はそのままルーティング・未ログインの場合はログインページへ
    const PrivateRoute : React.FC<Props> = ({ children }) => {
        if (isLoggedIn) {
            return children
        } else {
            navigation("/")
        }
    }

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>GPT + Enterprise data | Sample</h3>
                    </Link>
                    <nav>
                        <ul className={styles.headerNavList}>
                            <li>
                                <NavLink to="/ch" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink to="/QA" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    規程QA
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://aka.ms/entgptsearch" target={"_blank"} title="Github repository link">
                                    <img
                                        src={github}
                                        alt="Github logo"
                                        aria-label="Link to github repository"
                                        width="20px"
                                        height="20px"
                                        className={styles.githubLogo}
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h4 className={styles.headerRightText}>Azure OpenAI + Cognitive Search</h4>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/ch" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/QA" element={<PrivateRoute><QA /></PrivateRoute>} />
            </Routes>
        </div>
    );
};

export default App;
