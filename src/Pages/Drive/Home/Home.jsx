import React from 'react';
import { icons } from '../../../Components/Icons/IconProvider';
import CategoryCard from './_Ui/CategoryCard';
import RecentFolders from './_SUB/RecentFolders';

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
        </div>
    );
};

export default Home;