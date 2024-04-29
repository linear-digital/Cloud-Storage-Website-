import React from 'react';
import { fileIconProvider } from './file_icon_provider';
import { imageurl } from '../../../helper/imageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../Components/axios/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setReloadUser } from '../../../redux/Slice/reloadSlice';
import Loader from '../../../Components/Loader';

const FileCard = ({ data }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const deleteFile = async (id) => {
        try {
            setLoading(true)
            const res = await api.delete(`/file/${id}`)
            setLoading(false)
            toast.success("File deleted successfully")
            dispatch(setReloadUser(res))
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message || error.message || "Something went wrong")
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='flex w-full shadow-md rounded flex-col p-2'>
            <div className='pb-2 flex items-center justify-between px-2'>
                <p className='text-xs'>
                    {data?.filename.slice(0, 8) + "...." + data?.extension}
                </p>
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} role="button">
                        <FontAwesomeIcon icon={faEllipsisV} width={20} />
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button className="text-primary">Edit</button>
                        </li>
                        <li>
                            <button
                                onClick={() => deleteFile(data?._id)}
                                className="text-error">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            {
                data?.mimetype?.startsWith("image") ?
                    <img
                        loading='lazy'
                        className='max-h-[200px] w-full object-cover'
                        src={imageurl(data?.path)} alt="" />
                    :
                    <img
                        loading='lazy'
                        className='max-h-[200px] w-full object-cover'
                        src={fileIconProvider(data?.extension)} alt="" />
            }
        </div>
    );
};

export default FileCard;