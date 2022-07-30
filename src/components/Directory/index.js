import React from 'react';

import './styles.scss'

import shopNatsukashii from './../../assets/natsukashii.png';
import shopArcade2051 from './../../assets/arcade2051.png';
import { Link } from 'react-router-dom';

const Directory = props => {
    return (
        <div className='directory'>
            <div className='wrap'>
                <div 
                    className='item'
                    style={{
                    backgroundImage: `url(${shopArcade2051})`
                }}> 
                    <Link to = '/search/arcade'>
                        Arcade 2051
                    </Link>
                </div>

                <div
                    className='item'
                    style={{
                    backgroundImage: `url(${shopNatsukashii})`
                }}>
                    <Link to ='/search/natsu'>
                        Natsukashii
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Directory;