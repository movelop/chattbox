import React, { useState } from 'react';
import './join.css';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div>
                    <input type="text" placeholder='Name' className='joinInput' onChange={handleNameChange} />
                </div>
                <div>
                    <input type="text" placeholder='Room' className='joinInput mt-20' onChange={handleRoomChange} />
                </div>
                <Link onClick={e => (!name|| !room)? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
                    <button className='button' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
