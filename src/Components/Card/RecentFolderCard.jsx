import { useSelector } from 'react-redux';
import React from 'react';
import { folder } from '../Icons/File_Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { api } from '../axios/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setReloaFolder, setReloadUser } from '../../redux/Slice/reloadSlice';
import { DownloadFolderDialog } from '../Dialog/DownloadFolderDialog';
import { Dropdown } from 'antd';
import { UpdateFolder } from '../Dialog/UpdateFolder';


const RecentFolderCard = ({ data }) => {
    const dispatch = useDispatch()
    const deleteFolder = async () => {
        try {
            const comfirm = window.confirm("Are you sure you want to delete this folder?")
            if (!comfirm) return
            const res = await api.delete(`/folder/${data?._id}`)
            toast.success("Folder deleted successfully")
            dispatch(setReloaFolder(res.data))
            dispatch(setReloadUser(res.data))
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const [openUpdate, setOpenUpdate] = useState(false)

    return (
        <div className='p-5 bg-white rounded w-full hover:shadow-xl shadow-blue-100 cursor-pointer'
            onDoubleClick={() => navigate(`/drive/folders?folder=${data?._id}`)}
        >
            {
                open && <DownloadFolderDialog open={open} setOpen={setOpen} folder={data} />
            }
            {
                openUpdate && <UpdateFolder open={openUpdate} setOpen={setOpenUpdate} folder={data}/>
            }

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={folder} alt="Folder icon" width={30} />
                    <h2 className='text-[18px] font-normal mt-1'>
                        {data?.name}
                    </h2>
                </div>
              
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: <button
                                    onClick={() => setOpen(true)}
                                    className="text-primary w-[150px]">Dowload</button>,
                                key: '0',
                            },
                            {
                                label: <button
                                onClick={() => setOpenUpdate(true)}
                                className="text-primary w-[150px]">Edit</button>,
                                key: '1',
                            },
                            {
                                type: 'divider',
                            },
                            {
                                label: <button
                                    onClick={() => deleteFolder()}
                                    className="text-error w-[150px]">Delete</button>,
                                key: '3',
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <button
                            tabIndex={0}
                            role="button"
                            className='hover:text-red-500'
                        >
                            <FontAwesomeIcon icon={faEllipsisV} width={20} />
                        </button>
                    </a>
                </Dropdown>
            </div>
            <div className="flex items-center mt-2 text-blue-gray-700 gap-2">
                <h5 className='text-sm font-normal'>
                    {(data?.size).toFixed(2)} MB
                </h5>
                <div className="dot" />
                <h5 className='text-sm font-normal'>
                    {data?.files} Items
                </h5>
                <h5 className='text-sm font-normal'>
                    {data?.folders || 0} Folders
                </h5>
            </div>
        </div>
    );
};

export default RecentFolderCard;