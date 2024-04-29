import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../Components/axios/api';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';

const Files = () => {
    const { user } = useSelector((state) => state.user)
    const { reloadFiles } = useSelector((state) => state.reload)
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id, reloadFiles],
        queryFn: async () => {
            const { data } = await api.get(`/file/user/${user?._id}?limit=50`);
            return data;
        },
    });
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full p-5'>
            <h1>All FIles</h1>
        </div>
    );
};

export default Files;