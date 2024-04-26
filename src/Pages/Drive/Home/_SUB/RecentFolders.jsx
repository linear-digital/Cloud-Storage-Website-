import React from 'react';
import RecentFolderCard from '../../../../Components/Card/RecentFolderCard';

const RecentFolders = () => {
    return (
        <div className='pt-10 w-full'>
            <h1 className='text-xl font-semibold'>Recent Folders</h1>
            <div className="grid grid-cols-4 gap-5 mt-5">
                <RecentFolderCard />
                <RecentFolderCard />
                <RecentFolderCard />
                <RecentFolderCard />
            </div>

        </div>
    );
};

export default RecentFolders;