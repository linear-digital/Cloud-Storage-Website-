import React from 'react';
import RecentFolderCard from '../../../../Components/Card/RecentFolderCard';

const RecentFolders = () => {
    return (
        <div className='pt-10'>
            <h1 className='text-xl font-semibold'>Recent Folders</h1>
            <RecentFolderCard  />
        </div>
    );
};

export default RecentFolders;