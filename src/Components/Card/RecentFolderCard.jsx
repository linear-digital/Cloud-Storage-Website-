import { useSelector } from 'react-redux';
import React from 'react';
import { folder } from '../Icons/File_Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios/api';
import { useNavigate } from 'react-router-dom';


const RecentFolderCard = ({ data }) => {

    // if (isLoading) return null;
    const navigate = useNavigate();
    return (
        <div className='p-5 bg-white rounded w-full hover:shadow-xl shadow-blue-100 cursor-pointer'
            onClick={() => navigate(`/drive/files?folder=${data?._id}`)}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={folder} alt="Folder icon" width={30} />
                    <h2 className='text-[18px] font-normal mt-1'>
                        {data?.name}
                    </h2>
                </div>
                <button>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>
            <div className="flex items-center mt-2 text-blue-gray-700 gap-2">
                <h5 className='text-sm font-normal'>
                    {data?.size} MB
                </h5>
                <div className="dot" />
                <h5 className='text-sm font-normal'>
                    {data?.files} Items
                </h5>
            </div>
        </div>
    );
};

export default RecentFolderCard;