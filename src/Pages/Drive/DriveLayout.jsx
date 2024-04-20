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
        <main className="flex h-screen overflow-hidden w-full">
            <Sidebar />
            <section className='w-full h-full'>
                <TopNav />
                <div className='w-full h-auto overflow-y-auto p-5'>
                    <Outlet />
                </div>
            </section>
        </main>
    );
};

export default DriveLayout;