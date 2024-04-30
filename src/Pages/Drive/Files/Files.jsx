import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../Components/axios/api';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import FileCard from './FileCard';
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DownloadDialog } from '../../../Components/Dialog/DownloadDialog';

const Files = ({ mode }) => {
    const { user } = useSelector((state) => state.user)
    const { reloadFiles } = useSelector((state) => state.reload)
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const folder = searchParams.get("folder");

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
    const [selected, setSelected] = useState([]);
    const selectOne = (file) => {
        if (selected?.filter((item) => item?._id === file?._id).length > 0) {
            setSelected(selected?.filter((item) => item?._id !== file?._id));
        }
        else {
            setSelected([...selected, file]);
        }
    }
    const [name, setName] = useState("")
    React.useEffect(() => {
        if (!category) {
            setName("All FIles")
        }
        else if (category === "application/pdf") {
            setName("PDF")
        }
        else if (category === "image") {
            setName("Images")
        }
        else if (category === "video") {
            setName("Videos")
        }
        else if (category === "text/plain") {
            setName("Text")
        }
        else if (category.includes('application')) {
            setName("Documents & Files")
        }
    }, [category])

    
    const [openDownload, setOpenDownload] = useState(false)
    // console.log(selected.length)
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full px-5'>
            {
                openDownload && <DownloadDialog open={openDownload} setOpen={setOpenDownload} selected={selected}/>
            }
            <h1 className='text-xl font-semibold'>{
                category ? <span className='capitalize'>
                    {name}
                </span> : "All FIles"
            }</h1>
            <div className="flex gap-5 items-center">
                <div className="flex items-center">
                    <Checkbox
                        checked={selected.length === files?.data?.length}
                        onChange={() => {
                            if (selected.length === files?.data?.length) {
                                setSelected([])
                            }
                            else {
                                setSelected(files?.data)
                            }
                        }}
                        color="warning" size='small' />
                    <h5 className="ml-2 text-sm">
                        <span className=' mr-1'>
                            {selected.length}
                        </span>
                        Selected
                    </h5>
                </div>
                <button className='text-[16px] hover:text-red-600 mt-1 ' title='Move to Trash'>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className='text-[16px] hover:text-green-600 mt-1 ' title='Share Link'>
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
                {
                    selected.length > 0 &&
                    <button
                        onClick={()=> setOpenDownload(true)}
                        className='text-[16px] hover:text-primary mt-1 ' title='Share Link'>
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                }
            </div>
            <div className={`${files?.data?.length > 0 && "grid lg:grid-cols-9 md:grid-cols-6 grid-cols-3 gap-3"} mt-10`}>
                {
                    files?.data?.length > 0 ?
                        files?.data?.map((file, index) => (
                            <FileCard
                                onClick={() => selectOne(file)}
                                refetch={refetch}
                                data={file}
                                key={index}
                                mode={mode}
                                index={index}
                                selected={selected.filter((item) => item?._id === file?._id).length > 0}
                            />
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