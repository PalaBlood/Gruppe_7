import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, Box } from '@mui/material';

const SignIn = ({ onSignIn }) => {
    const handleSignInButtonClicked = () => {
        onSignIn();
    };

    return (
        <Box sx={styles.container}>
            <img src={`${process.env.PUBLIC_URL}/images/LogoIcon.png`} alt="Background" style={styles.backgroundImage} />
            <Box sx={styles.overlay}>
                <Box sx={styles.box}>
                    <Typography sx={{ margin: 2 }} variant='h5' align='center' fontWeight="bold">
                        Welcome to FridgeFinder
                    </Typography>
                    <Typography sx={{ margin: 2 }} align='center'>
                        It appears that you are not signed in.
                    </Typography>
                    <Typography sx={{ margin: 2 }} align='center'>
                        Sign in to your FridgeFinder
                    </Typography>
                    <Grid container justifyContent='center'>
                        <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleSignInButtonClicked}>
                            Sign in with Google
                        </Button>
                    </Grid>
                    <Grid container justifyContent='center' sx={{ mt: 1 }}>
                        <Typography variant="body2">
                            Don't have an account? <a href="https://www.google.com" target='_blank' rel='noopener noreferrer'>Sign up!</a>
                        </Typography>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

SignIn.propTypes = {
    onSignIn: PropTypes.func.isRequired,
};

const styles = {
    container: {
        flex: 1, // Nimmt den verbleibenden Platz zwischen Header und Footer ein
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Zentriert den Inhalt vertikal
        alignItems: 'center',
        position: 'relative', // Wichtig für das platzierte Hintergrundbild
        overflow: 'hidden', // Verhindert Überlauf
    },
    overlay: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1, // Über das Bild legen
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparenter weißer Hintergrund
    },
    box: {
        width: 'auto',
        maxWidth: 360,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
    },
    backgroundImage: {
        width: '40%',
        height: '40%',
        objectFit: 'cover', // Das Bild wird skalieren, um den Container auszufüllen
        position: 'absolut',
        top: 0,
        left: 0,
        zIndex: 0, // Hinter den Inhalt legen
        opacity: 0.5, // Transparenz
    },
};

export default SignIn;
