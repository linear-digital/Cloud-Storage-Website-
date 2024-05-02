import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Settings = () => {
    return (
        <div className='p-5 h-full w-full'>
            <h1 className='text-2xl font-semibold'>Account settings</h1>
            <p>
                View and update your account details, profile and more.
            </p>
            <div className="flex gap-5">
                <Sidebar />
                <section className='w-full bg-white mt-5 p-5'>
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default Settings;