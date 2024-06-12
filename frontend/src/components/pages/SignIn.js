import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material'; //Online Bib von der wir einige Komponenten verwenden können
import backgroundImage from './smartfridge.jpg'; 


/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class SignIn extends Component {

	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user objext is null */
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
			<div style={{
				display: 'flex',
				flexDirection:'column',
				justifyContent:'center',
				alignItems: 'center',
				backgroundColor: 'lightblue',
				marginRight: '600px',
				marginLeft:'600px',
				marginTop:'300px'
			}}>
				<Typography sx={{margin: 2}} align='center' variant='h6'>Wilkommen in unserer SmartFridge</Typography>
				<Typography sx={{margin: 2}} align='center'>It appears, that you are not signed in.</Typography>
				<Typography sx={{margin: 2}} align='center'>Sign in to your SmartFridge</Typography>
				<Grid container justifyContent='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
						</Button>
					</Grid>
				</Grid>
			</div>
			</div>
		);
	}
}



//Hier müssen wir wahrscheinlich was was anpassen
/** PropTypes */
SignIn.propTypes = {
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default SignIn;