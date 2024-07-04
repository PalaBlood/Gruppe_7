import React from 'react';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to FridgeFinder!</h1>
            <div style={styles.logoContainer}>
                <img src={`${process.env.PUBLIC_URL}/images/LogoIcon.png`} alt="FridgeFinder Logo" style={styles.logo} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        flex: 1, // Nimmt den verbleibenden Platz zwischen Header und Footer ein
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Text bleibt oben
        alignItems: 'center',
        position: 'relative', // Wichtig für das platzierte Hintergrundbild
    },
    heading: {
        color: '#001b33',
        margin: '20px 0', // Optional: Abstand um den Text herum
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%', // Volle Breite des Containers
    },
    logo: {
        width: '50vw', // Relative Größe des Logos in Bezug auf die Bildschirmbreite
        maxWidth: '450px', // Maximale Größe des Logos
        height: 'auto', // Automatische Höhe, um das Seitenverhältnis beizubehalten
        borderRadius: '50%', // Rundes Bild
        opacity: 0.5, // Setzt die Transparenz auf 50%
    },
};

export default Home;
