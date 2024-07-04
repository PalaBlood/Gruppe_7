import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, Box } from '@mui/material';
import backgroundImage from './smartfridge.jpg';

class SignIn extends Component {
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	render() {
		return (
			<div style={{
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
				<Box sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Box sx={{
						width: 'auto',
						maxWidth: 360,
						padding: 3,
						borderRadius: 2,
						boxShadow: 3,
						backgroundColor: 'background.paper'
					}}>
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
							<Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={this.handleSignInButtonClicked}>
								Sign in with Google
							</Button>
						</Grid>
						<Grid container justifyContent='center' sx={{ mt: 1 }}>
							<Typography variant="body2">
								Don't have an account? <a href="https://www.google.com" target='_blank'>Sign up!</a>
							</Typography>
						</Grid>
					</Box>
				</Box>
			</div>
		);
	}
}

SignIn.propTypes = {
	onSignIn: PropTypes.func.isRequired,
}

export default SignIn;
