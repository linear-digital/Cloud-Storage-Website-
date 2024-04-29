import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../Components/axios/api';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import FileCard from './FileCard';

const Files = ({ mode }) => {
    const { user } = useSelector((state) => state.user)
    const { reloadFiles } = useSelector((state) => state.reload)
    const location = useLocation()
    const category = location.search.split("=")[1]
    const { data: files, isLoading, refetch } = useQuery({
        queryKey: ["files", user?._id, reloadFiles, mode, category],
        queryFn: async () => {
            if (mode === "recovery") {
                const { data } = await api.get(`/file/bin/${user?._id}`);
                return data;
            }
            else {
                const { data } = await api.get(`/file/user/${user?._id}?limit=500&category=${category || ""}`);
                return data;
            }

        },
        enabled: !!user
    });
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full p-5'>
            <h1 className='text-xl font-semibold'>All FIles</h1>
            <div className={`${files?.data?.length > 0 && "grid grid-cols-9 gap-3"} mt-10`}>
                {
                    files?.data?.length > 0 ?
                        files?.data?.map((file, index) => (
                            <FileCard refetch={refetch} data={file} key={index} mode={mode} index={index}/>
                        ))
                        :
                        <h1 className='text-base text-primary font-semibold'>{
                            mode === "recovery" ? "Your Recycle Bin is empty" : "No Files Found"
                        }</h1>
                }
            </div>
        </div>
    );
};

export default Files;