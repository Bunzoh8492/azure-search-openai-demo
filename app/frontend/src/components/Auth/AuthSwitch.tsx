
import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {LoggedInContext, AuthInfoContext} from './authcontext'

const isLoggedIn = useContext(LoggedInContext)
const [authInfo, setAuthInfo] = useContext(AuthInfoContext)
const navigation = useNavigate()

type Props = {
    children?: React.ReactNode;
  }

