import { useSelector } from 'react-redux';
import React from 'react';
import { folder } from '../Icons/File_Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios/api';
import { useNavigate } from 'react-router-dom';
import { filesize } from '../../helper/fileSize';
import UpdateDialog from '../Dialog/UpdateDialog';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setReloaFolder, setReloadUser } from '../../redux/Slice/reloadSlice';
import Loader from '../Loader';
import { DownloadFolderDialog } from '../Dialog/DownloadFolderDialog';


const RecentFolderCard = ({ data }) => {
    const [show, setShow] = useState(false)
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
    const [isLoading, setIsLoading] = useState(false)
    const dowloadFile = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/folder/download/${data?._id}`, {
                responseType: 'blob' // Ensure response is treated as binary data
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data?.name}.zip`);
            document.body.appendChild(link);
            link.click();
            // Clean up the URL object after the download is complete
            window.URL.revokeObjectURL(url);
            setIsLoading(false)
            toast.success("File downloaded successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
            setIsLoading(false)
        }
    }
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='p-5 bg-white rounded w-full hover:shadow-xl shadow-blue-100 cursor-pointer'
            onDoubleClick={() => navigate(`/drive/folders?folder=${data?._id}`)}
        >
            {
                open && <DownloadFolderDialog open={open} setOpen={setOpen} folder={data} />
            }
            <UpdateDialog open={show} setOpen={setShow} />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={folder} alt="Folder icon" width={30} />
                    <h2 className='text-[18px] font-normal mt-1'>
                        {data?.name}
                    </h2>
                </div>
                {/* <button onClick={deleteFolder}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button> */}
                <div className={`dropdown `}>
                    <button tabIndex={0} role="button">
                        <FontAwesomeIcon icon={faEllipsisV} width={20} />
                    </button>

                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button
                                onClick={() => setOpen(true)}
                                className="text-primary">Dowload</button>
                        </li>
                        <li>
                            <button className="text-primary">Edit</button>
                        </li>
                        <li>
                            <button
                                onClick={() => deleteFolder()}
                                className="text-error">Delete</button>
                        </li>
                    </ul>


                </div>
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