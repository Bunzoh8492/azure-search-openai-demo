import React, { useEffect, useState } from "react";

/**
 * 簡易的な認証情報の型のサンプル
 */
type AuthInfo = {
  userId: string;
};

// ログイン状態のContext
export const LoggedInContext = React.createContext<boolean>(false);

// 認証情報と認証情報セットのContext
export const AuthInfoContext = React.createContext<
  [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]
>([{ userId: "" }, () => {}]);

type Props = {
  children?: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  // stateの定義
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>({ userId: "" });

  // authInfoのバリデーション
  useEffect(() => {
    // authInfoに正しく値がセットされているかどうかをチェック
    if (authInfo?.userId) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authInfo]);
  return (
    <LoggedInContext.Provider value={loggedIn}>
      <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
        {children}
      </AuthInfoContext.Provider>
    </LoggedInContext.Provider>
  );
};