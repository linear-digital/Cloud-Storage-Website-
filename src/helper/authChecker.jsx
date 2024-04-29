import { useNavigate } from 'react-router-dom';

import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AuthChecker = ({ children }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    if (user) {
        return children
    }
    else if (!user) {
        navigate('/login')
    }
};

export default AuthChecker;