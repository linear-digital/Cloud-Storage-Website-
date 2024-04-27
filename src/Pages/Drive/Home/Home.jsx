import React from 'react';
import { icons } from '../../../Components/Icons/IconProvider';
import CategoryCard from './_Ui/CategoryCard';
import RecentFolders from './_SUB/RecentFolders';
import Files from './_SUB/Files';

const Home = () => {
    return (
        <div className=' px-5'>
            <section className='flex gap-7 flex-wrap'>
                {
                    icons.map((icon, index) => {
                        return (
                            <CategoryCard key={index} icon={icon} />
                        )
                    })
                }
            </section>

            <RecentFolders />
            <Files />
        </div>
    );
};

export default Home;