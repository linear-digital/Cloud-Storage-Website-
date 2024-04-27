import { useNavigate } from 'react-router-dom';
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { api } from '../../Components/axios/api';
import Cookie  from 'js-cookie';
import { toast } from 'react-hot-toast';

const Social = () => {
    const clientId = "945344222356-ni54p9vtt5hvijagqfspp94ejc7ev6gd.apps.googleusercontent.com";
    const navigate = useNavigate();
    const onSUccess = async (credentialResponse) => {
        console.log(credentialResponse);
        const token = credentialResponse.credential;
        // try {
        //     const res = await api.post('/user/login', { ...data, provider: "password" })
        //     Cookie.set('authToken', res.data.token)
        //     toast.success('Login Successfully')
        //     navigate('/drive')
        // } catch (error) {
        //     toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        // }
    };
    return (
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={onSUccess}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>

        </div>
    );
};

export default Social;


