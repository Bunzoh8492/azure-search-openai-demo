import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, AuthInfoContext } from "../../components/Auth/authcontext";
import styles from "./Auth.module.css";

const Auth = () => {
    const navigation = useNavigate();
    const [frmPwd, setFrmPwd] = useState("");
    const isLoggedIn = useContext(LoggedInContext);
    const [authInfo, setAuthInfo] = useContext(AuthInfoContext);

    // azureの環境変数からパスワードを取得
    var envPwd: string;
    // console.log("before fetch");
    fetch("/auth")
        .then(response => response.json())
        .then(data => {
            envPwd = data.pwd;
            // console.log("fetch:" + data.pwd);
        });
    // console.log("after fetch");

    // 正しいパスワードの場合はAuthInfoを更新
    const handleLogin = () => {
        if (frmPwd == envPwd) {
            setAuthInfo({ pwd: frmPwd });
        } else {
          alert("パスワードが違います")
        }
    };

    // handleLogin内ではstateがまだ更新されていないので
    // useEffectでフックする（詳細は公式ドキュメント参照）
    useEffect(() => {
        if (isLoggedIn) {
            navigation("/ch");
        }
    }, [isLoggedIn]);

    return (
        <div className={styles.container}>
            {isLoggedIn ? `ID: ${authInfo?.pwd}` : "パスワードを入力してください"}
            <input type="password" value={frmPwd} onChange={e => setFrmPwd(e.target.value)} />
            <button onClick={handleLogin}>送信</button>
        </div>
    );
};

export default Auth;
