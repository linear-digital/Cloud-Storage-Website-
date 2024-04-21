import React from 'react';
import Logo from '../../Components/Global/Logo/Logo';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Menu } from 'antd';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFolderClosed } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const items = [
    {
        label: "Upload File",
        key: 'file',
        icon: <FontAwesomeIcon icon={faUpload} width={20} height={20} />,
    },
    {
        label: "Create Folder",
        key: 'create',
        icon: <FontAwesomeIcon icon={faPlus} width={20} height={20} />,
    }
];
const links = [
    {
        name: "All Files",
        icon: faFolderOpen,
        children: [
            {
                name: "Images",
                icon: faImage
            },
            {
                name: "Documents",
                icon: faFolderClosed
            }
        ]
    },
    {
        name: "Shared with me",
        icon: faUserGroup
    },
    {
        name: "Recent",
        icon: faClockRotateLeft
    },
    {
        name: "Starred",
        icon: faStar
    }
]

const Sidebar = () => {
    const createFolder = () => {

    }
    const uploadFile = () => {

    }
    const handleClick = (e) => {
        if (e.key === 'file') {
            uploadFile()
        }
        else if (e.key === 'create') {
            createFolder()
        }
    }
    const [open, setOpen] = useState('')
    return (
        <div className='w-[350px] bg-gray-50 h-full py-9'>
            <div className="flex justify-center">
                <Logo />
            </div>
            <div className="flex justify-start mt-8 pl-10">

                <Dropdown
                    overlay={
                        <Menu onClick={handleClick}>
                            {items.map((item) => (
                                <Menu.Item icon={item.icon} key={item.key}>{item.label}</Menu.Item>
                            ))}
                        </Menu>
                    }
                    trigger={['click']}
                    overlayStyle={{ width: '200px', }}

                >
                    <a onClick={(e) => e.preventDefault()}>
                        <button className='btn btn-primary rounded w-[200px]'>
                            <FontAwesomeIcon icon={faPlus} width={20} height={20} />
                            <span>Upload</span>
                        </button>
                    </a>
                </Dropdown>
            </div>
            <ul className='mt-6'>
                {
                    links.map((link, index) => (
                        <li key={index} className=''>
                            <div className='flex items-center pr-5'>
                                <Link to="/drive" className='flex items-center gap-5 font-normal text-[17px] py-3 hover:bg-gray-100 w-full pl-10'>
                                    <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                    <span>
                                        {link.name}
                                    </span>
                                </Link>
                                {
                                    link.children && <button className='pl-4'
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
            </ul>
        </div>
    );
};

export default Sidebar;
