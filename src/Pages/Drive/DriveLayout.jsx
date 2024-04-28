import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './Navbar/TopNav';
import Sidebar from './Sidebar';
import { useEffect } from 'react';

const DriveLayout = () => {
    // useEffect(() => {
    //     document.addEventListener('contextmenu', event => {
    //       event.preventDefault();
    //     });

    //     // Cleanup function to remove the event listener on component unmount
    //     return () => {
    //       document.removeEventListener('contextmenu', event => {
    //         event.preventDefault();
    //       });
    //     };
    //   }, []);
    return (
        <main className="flex  w-full bg-[#EAEDF2]">

            <section className='w-full'>
                <TopNav />
                <div className='w-full p-5'>
                    <div className="flex justify-between">
                        <h1 className='text-[20px] font-semibold pb-5 pl-2'>
                            File Manager
                        </h1>
                        <button className='btn btn-link text-base'>
                            Create New Folder
                        </button>
                    </div>
                    <div className="flex w-full h-screen overflow-hidden">
                        <Sidebar />
                        <div className="w-full h-full overflow-y-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DriveLayout;