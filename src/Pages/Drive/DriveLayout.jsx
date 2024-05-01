import { useState } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './Navbar/TopNav';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { CreateFolder } from '../../Components/Dialog/CreateFolder';
import Logo from '../../Components/Global/Logo/Logo';
import { useDispatch } from 'react-redux';
import { setShowSidebar } from '../../redux/Slice/toolsSlice';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import FileInfo from '../../Components/Card/FileInfo';

const DriveLayout = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const { showSidebar, showFileInfo, selectedFile } = useSelector(state => state.tools)
    const hideSidebar = () => {
        dispatch(setShowSidebar(false))
        console.log(showSidebar)
    }
    return (
        <main className="flex  w-full bg-[#EAEDF2]">

            <section className='w-full'>
                <TopNav />
                <div className='w-full p-5'>
                    
                    <div className="flex w-full h-screen overflow-hidden">
                        <div className='lg:block md:hidden hidden'>
                            <Sidebar />
                        </div>
                        {
                            showSidebar && <div className='absolute z-50 top-0 left-0 right-0 h-screen shadow-2xl bg-white'>
                                <div className="pl-8 pt-10 flex justify-between">
                                    <Logo />
                                    <Switch color="warning" checked={showSidebar} onChange={hideSidebar} />
                                </div>
                                <Sidebar hideSidebar={hideSidebar} />
                            </div>
                        }
                        <div className="w-full h-full overflow-y-auto">
                            <Outlet />
                        </div>
                        {
                            (selectedFile || (selectedFile && showFileInfo)) &&
                            <FileInfo />
                        }
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DriveLayout;