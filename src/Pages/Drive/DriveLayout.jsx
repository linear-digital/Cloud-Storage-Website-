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
        <main className="flex h-screen overflow-y-auto w-full">
            <Sidebar />
            <section className='w-full'>
                <TopNav />
                <Outlet />
            </section>
        </main>
    );
};

export default DriveLayout;