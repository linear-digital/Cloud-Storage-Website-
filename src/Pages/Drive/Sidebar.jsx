import React from 'react';
// import Logo from '../../Components/Global/Logo/Logo';
// import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
// import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { Dropdown, Menu } from 'antd';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import { faFolderClosed } from '@fortawesome/free-regular-svg-icons';
// import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faFileZipper } from '@fortawesome/free-regular-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Progress } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { UploadDialog } from '../../Components/Dialog/UploadDialog';



const links = [
    {
        name: "Home",
        icon: faHome,
        path: "/drive"
    },
    {
        name: "Files",
        icon: faFile
    },
    {
        name: "Starred",
        icon: faStar
    },
    {
        name: "Shared",
        icon: faCircleNodes
    },
    {
        name: "Recent",
        icon: faFolder
    },
    {
        name: "Recovery",
        icon: faTrashCan
    },
    {
        name: "Settings",
        icon: faGear
    },
    {
        name: "Zip Files",
        icon: faFileZipper
    }

]

const Sidebar = () => {
    const { user } = useSelector((state) => state.user)
    const [active, setActive] = useState("/drive");

    const [open, setOpen] = useState('')
    const upgrade = () => {

    }
    const [openUpload, setOpenUpload] = useState(false)
    return (
        <div className='w-[350px] bg-white h-full overflow-y-auto py-5 rounded'>

            <UploadDialog open={openUpload} setOpen={setOpenUpload} />
            <ul className=''>
                {
                    links.map((link, index) => (
                        <li key={index} className=''>
                            <div className='flex items-center'>
                                <Link to="/drive" className={`flex items-center gap-5 text-[16px] leading-6 py-3 hover:bg-black font-semibold w-full pl-8  text-blue-gray-700 hover:text-white ${active === link.path ? 'bg-black text-white shadow' : ''}`}>
                                    <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                    <span>
                                        {link.name}
                                    </span>
                                </Link>
                                {
                                    link.children && <button className='pl-4 pr-5'
                                        onClick={() => setOpen(open === index ? '' : index)}
                                    >
                                        {
                                            open === index ? <FontAwesomeIcon icon={faChevronUp} width={20} height={20} /> : <FontAwesomeIcon icon={faChevronDown} width={20} height={20} />
                                        }
                                    </button>
                                }
                            </div>

                            {
                                link.children && open === index && (
                                    <ul>
                                        {
                                            link.children.map((child, index) => (
                                                <li key={index} className='pl-14 hover:bg-gray-100 '>
                                                    <Link to="/drive" className='flex items-center gap-5 font-normal text-[17px] py-3'>
                                                        <FontAwesomeIcon icon={child.icon} width={20} height={20} />
                                                        <span>
                                                            {child.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </li>
                    ))
                }
                <li className='ml-8 mt-5'>
                    <button
                        onClick={() => setOpenUpload(true)}
                        className='btn btn-primary rounded w-[200px]'>
                        <FontAwesomeIcon icon={faPlus} width={20} height={20} />
                        <span>Upload</span>
                    </button>
                </li>
            </ul>
            <div className='pl-8 mt-5 pr-5'>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faDatabase} width={20}
                            className='text-primary'
                        />
                        <h5 className='text-[13px] font-semibold '>
                            Storage
                        </h5>
                    </div>
                    <button className='btn btn-link text-primary'>
                        Upgrade
                    </button>
                </div>
                <Progress value={user?.storage || 100} max={user?.storageMax || 100} size="sm"
                    color="green"
                />
                <h5 className='mt-3 text-sm'>
                    {user?.storage || 100} GB of {user?.storageMax || 100} GB used
                </h5>
            </div>
        </div>
    );
};

export default Sidebar;
