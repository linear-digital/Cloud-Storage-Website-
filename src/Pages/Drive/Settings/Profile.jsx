import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../Components/axios/api';
import { useDispatch } from 'react-redux';
import { setReloadUser } from '../../../redux/Slice/reloadSlice';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const formHandeler = async (e) => {
        e.preventDefault()
        const target = new FormData(e.target)
        const data = Object.fromEntries(target.entries())
        try {
            const res = await api.put(`/user/${user?._id}`, data)
            dispatch(setReloadUser(res.data))
            toast.success("Name Changed Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    return (
        <div>
            <h1 className='text-lg'>Update name and profile image</h1>
            <form onSubmit={formHandeler} className='max-w-96 mt-5'>
                <Input label="Name"
                    defaultValue={user?.name}
                    name='name'
                />
                <Button className='mt-3' type='submit'>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default Profile;