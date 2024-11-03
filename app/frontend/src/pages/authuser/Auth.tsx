import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LoggedInContext, AuthInfoContext} from '../../components/Auth/authcontext'

const Auth = () => {
  const navigation = useNavigate()
  const [userId, setUserId] = useState("")

  const isLoggedIn = useContext(LoggedInContext)
  const [authInfo, setAuthInfo] = useContext(AuthInfoContext)

  const pwd = "a"

  // 正しいパスワードの場合はAuthInfoを更新
  const handleLogin = () => {
    // alert("userID:"+userId)
    if (userId == pwd) {
      setAuthInfo({ userId: userId })
      // alert("AuthInfo:"+authInfo.userId)
      // alert("isLoggedIn:"+isLoggedIn)      
    }
  }

  // handleLogin内ではstateがまだ更新されていないので
  // useEffectでフックする（詳細は公式ドキュメント参照）
  useEffect(() => {
    if (isLoggedIn) {
      // alert("useEffect_AuthInfo:"+authInfo.userId)
      // alert("useEffect_isLoggedIn:"+isLoggedIn)      
      navigation("/ch")
    }
  },[isLoggedIn] )

  return (
    <div>
      {isLoggedIn ? `ID: ${authInfo?.userId}` : "パスワードを入力してください"}
      <input type="text" value={userId} onChange={e => setUserId(e.target.value)}/>
      <button onClick={handleLogin}>送信</button>
    </div>
  )
}

export default Auth