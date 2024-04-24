import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Social = () => {
    const clientId = "";
    return (
        <div>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>

        </div>
    );
};

export default Social;


