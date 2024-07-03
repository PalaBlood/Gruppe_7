import React, { Component } from 'react';
import UserList from '../UserList';
import backgroundImage from './smartfridge.jpg'
class Home extends Component {
    render() {
        return (
        <div style={{ textAlign:'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
        <h1 style={{color: 'white'}}>Welcome to our Smartfridge!</h1>;
        </div>
    )}
}

export default Home;
