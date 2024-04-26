import React from 'react';
import { folder } from '../Icons/File_Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@material-tailwind/react';

const RecentFolderCard = () => {
    return (
        <div className='p-5 bg-white rounded w-full'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={folder} alt="Folder icon" width={30} />
                    <h2 className='text-[18px] font-normal mt-1'>
                        Folder Name
                    </h2>
                </div>
                <button>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>
            <div className="flex items-center mt-2 text-blue-gray-700 gap-2">
                <h5 className='text-sm font-normal'>
                    250MB
                </h5>
                <div className="dot" />
                <h5 className='text-sm font-normal'>
                    10 Items
                </h5>
            </div>
        </div>
    );
};

export default RecentFolderCard;