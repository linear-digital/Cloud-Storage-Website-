import React from 'react';
import { svg_icons } from '../../Icons/svg/svg';

const Logo = () => {
    return (
        <div className='text-[25px] font-bold text-primary'>
           <img src={svg_icons[1]} width={110} alt="" />
        </div>
    );
};

export default Logo;