import React from 'react';
import { icons } from '../../../Components/Icons/IconProvider';
import CategoryCard from './_Ui/CategoryCard';

const Home = () => {
    return (
        <div className='flex gap-7 flex-wrap px-5'>
            {
                icons.map((icon, index) => {
                    return (
                        <CategoryCard key={index} icon={icon} />
                    )
                })
            }
        </div>
    );
};

export default Home;