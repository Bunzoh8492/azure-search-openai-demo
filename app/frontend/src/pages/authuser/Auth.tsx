import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, AuthInfoContext } from "../../components/Auth/authcontext";

const Auth = () => {
    const navigation = useNavigate();
    const [userId, setUserId] = useState("");

    const isLoggedIn = useContext(LoggedInContext);
    const [authInfo, setAuthInfo] = useContext(AuthInfoContext);

    // .envから環境変数を取得=>azureの環境変数から取得に変更
    // const envpwd = import.meta.env.VITE_APP_AUTH;
    // console.log("envpwd:" + envpwd);

    // azureの環境変数からパスワードを取得
    var pwd: string;
    console.log("before fetch");
    fetch("/auth")
        .then(response => response.json())
        .then(data => {
            pwd = data.pwd;
            console.log("fetch:" + data.pwd);
        });
    console.log("after fetch");

    // 正しいパスワードの場合はAuthInfoを更新
    const handleLogin = () => {
        // alert("userID:"+userId)
        if (userId == pwd) {
            setAuthInfo({ userId: userId });
            // alert("AuthInfo:"+authInfo.userId)
            // alert("isLoggedIn:"+isLoggedIn)
        }
    };

    // handleLogin内ではstateがまだ更新されていないので
    // useEffectでフックする（詳細は公式ドキュメント参照）
    useEffect(() => {
        if (isLoggedIn) {
            // alert("useEffect_AuthInfo:"+authInfo.userId)
            // alert("useEffect_isLoggedIn:"+isLoggedIn)
            navigation("/ch");
        }
    }, [isLoggedIn]);

    return (
        <div>
            {isLoggedIn ? `ID: ${authInfo?.userId}` : "パスワードを入力してください"}
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
            <button onClick={handleLogin}>送信</button>
        </div>
    );
};

export default Auth;
