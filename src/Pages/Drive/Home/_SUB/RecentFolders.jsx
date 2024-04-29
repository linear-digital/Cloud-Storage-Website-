import React from 'react';
import RecentFolderCard from '../../../../Components/Card/RecentFolderCard';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { api } from '../../../../Components/axios/api';
import Loader from '../../../../Components/Loader';

const RecentFolders = () => {
    const { user } = useSelector((state) => state.user)
    const { reloadFolder } = useSelector((state) => state.reload)
    const { data: folders, isLoading } = useQuery({
        queryKey: ["folders", user?._id, reloadFolder],
        queryFn: async () => {
            const { data } = await api.get(`/folder/user/${user?._id}`);
            return data;
        },
    });
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='pt-10 w-full'>
            <h1 className='text-xl font-semibold'>Recent Folders</h1>
            <div className="grid grid-cols-4 gap-5 mt-5">
                {
                    folders?.data?.length > 0 ?
                        folders?.data?.map((folder, index) => (
                            <RecentFolderCard data={folder} key={index} />
                        ))
                        :
                        <h1 className='text-base text-primary font-semibold'>No Folders Found</h1>
                }
            </div>

        </div>
    );
};

export default RecentFolders;