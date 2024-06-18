import React, { Component } from 'react';
import UserList from '../UserList';
import backgroundImage from './smartfridge.jpg'
class Home extends Component {
    render() {
        return (
        <div style={{
            textAlign: 'center',
            backgroundImage: `url(${backgroundImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			width: '100vw',
			height: '100vh',
			position: 'fixed',
			top: 0,
			left: 0,
			zIndex: -1
        }}>
        <h1>Willkommen in unsere SmartFridge Anwendung!</h1>;
        </div>
    )}
}

export default Home;
