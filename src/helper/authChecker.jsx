import { useNavigate } from 'react-router-dom';

import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from '../Pages/Auth/Login';
import Loader from '../Components/Loader';

const AuthChecker = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    if (user === null) {
        return <Loader />
    }
    else if (user) {
        return children
    }
    else if (!user) {
        return <Login />
    }
};

export default AuthChecker;