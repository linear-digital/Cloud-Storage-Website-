import React from 'react';
import Logo from '../../../Components/Global/Logo/Logo';
import Search_Bar from './Search_Bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const TopNav = () => {

    const links = [
        {
            name: "My Files",
            icon: faFolderOpen
        },
        {
            name: "Account Settings",
            icon: faGear,
        },
        {
            name: "Logout",
            icon: faRightFromBracket
        }
    ]
    return (
        <nav className='flex justify-between px-7 py-3 bg-white items-center'>

            <section className='flex items-center'>
                <div className="mr-10">
                    <Logo />
                </div>
                <Search_Bar />
            </section>
            <section className='flex items-center gap-5'>
                <button className='text-2xl'>
                    <FontAwesomeIcon icon={faBell} width={20} height={20} />
                </button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1 flex items-center justify-center">
                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
                        {
                            links.map((link, index) => {
                                return (
                                    <li key={index}>
                                        <Link className="justify-start gap-3 items-center text-base flex" to={'/'}>
                                            <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                            {link.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        <li>
                            <Link className="justify-start gap-3 items-center text-base flex" to={'/'}>
                                <FontAwesomeIcon icon={link.icon} width={20} height={20} />
                                {link.name}
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </nav>
    );
};

export default TopNav;