import { Avatar } from '@material-tailwind/react';
import React from 'react';

const Avater = ({ height, width }) => {
    return (
        <div>
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"
                className={`${height} ${width}`}
            />
        </div>
    );
};

export default Avater;