import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search_Bar = () => {
   
    return (
        <div contextMenu={false} className='w-[721.60px] h-[47.60px] bg-white rounded-2xl overflow-hidden flex items-center pl-3'>
            <FontAwesomeIcon icon={faMagnifyingGlass} height={14} />
            <input type="text"
                className='w-full h-full pl-3 outline-none bg-white'
                placeholder='Search in drive'
            />
            <button onClick={(e) => {
            }} className='btn btn-primary rounded-none'>Search</button>
        </div>
    );
};

export default Search_Bar;