import React from 'react';
import Logo from '../../Components/Global/Logo/Logo';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const links = [
        {
            name: "All Files",
            icon: faFolderOpen
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
    return (
        <div className='w-[350px] bg-gray-50 h-full py-9'>
            <div className="flex justify-center">
                <Logo />

            </div>
            <ul className='mt-10'>
                {
                    links.map((link, index) => (
                        <li key={index} className='pl-10 hover:bg-gray-100 '>
                            <Link to="/drive" className='flex items-center gap-5 font-normal text-[17px] py-3'>
                                <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                               <span>
                               {link.name}
                               </span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;