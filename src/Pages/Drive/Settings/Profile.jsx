import { Input } from '@material-tailwind/react';
import React from 'react';

const Profile = () => {
    return (
        <div>
            <h1 className='text-lg'>Update name and profile image</h1>
            <form action="" className='max-w-96 mt-5'>
                <Input label="Name" />
            </form>
        </div>
    );
};

export default Profile;