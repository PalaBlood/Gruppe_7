import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import Theme from './Theme';
import Header from './components/layout/Header';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';

/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the 
 * user to the respective pages, react-router-dom ist used.
 * 
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 * 
 * @author [Michel Finger](https://github.com/PalaBlood)
 */
class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null, //Null gesetzt, da beim Start der App noch kein Benutzer angemeldet ist.
			appError: null, //appError und authError: Zum Erfassen von Fehlern in der Anwendung bzw. während der Authentifizierung.
			authError: null,
			authLoading: false//Ein Boolescher Wert, der angibt, ob ein Authentifizierungsvorgang läuft, um beispielsweise Ladeindikatoren zu aktivieren.
		};
	}

	/** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
		 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** 
	 * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
		 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
		 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
		 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});

		const app = initializeApp(firebaseConfig);
		//const auth = getAuth(app);
		const auth = getAuth(app);
		const provider = new GoogleAuthProvider();

		auth.languageCode = 'en';
		signInWithRedirect(auth, provider);
	}


	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		const app = initializeApp(firebaseConfig);
		const auth = getAuth(app);

		auth.languageCode = 'en';
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.setState({
					authLoading: true
				});
				// The user is signed in
				user.getIdToken().then(token => {
					// Add the token to the browser's cookies. The server will then be
					// able to verify the token against the API.
					// SECURITY NOTE: As cookies can easily be modified, only put the
					// token (which is verified server-side) in a cookie; do not add other
					// user information.
					document.cookie = `token=${token};path=/`;
					// console.log("Token is: " + document.cookie);

					// Set the user not before the token arrived 
					this.setState({
						currentUser: user,
						authError: null,
						authLoading: false
					});
				}).catch(e => {
					this.setState({
						authError: e,
						authLoading: false
					});
				});
			} else {
				// User has logged out, so clear the id token
				document.cookie = 'token=;path=/';

				// Set the logged out user to null
				this.setState({
					currentUser: null,
					authLoading: false
				});
			}
		});
	}

	/** Renders the whole app */
	render() {
		const { currentUser, appError, authError, authLoading } = this.state;
		// console.log(currentUser)

		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router>
					<Container maxWidth='md'>
						<Header user={currentUser} />
						<Routes>
							<Route path={process.env.PUBLIC_URL}/**Siehe unter packeage.json unter "homepage" */ >
								<Route path={process.env.PUBLIC_URL + '/'} element={
									// For some special cases we need to handle the root route
									// Redirect if the user is signed in
									currentUser ? //Wenn der Benutzer angemeldet ist, wird er automatisch umgeleitet. Ansonsten kommt er zur SignIn methode.
										<Navigate replace to={process.env.PUBLIC_URL + '/customers'} /> /**Hier können wir entscheiden, wo der Startpunkt der App ist (im Bankbeispiel ist es /Customers) */
										:  
										<SignIn onSignIn={this.handleSignIn} />
								} />
								<Route path={process.env.PUBLIC_URL + '/*'} element={
									// Firebase redirects to index.html
									// Redirect if the user is signed in
									currentUser ? //Sollte es einen User geben, dann gehe direkt zur Hauptapp, ansonsten zu SignIn
										<Navigate replace to={process.env.PUBLIC_URL + '/customers'} />
										:
										<SignIn onSignIn={this.handleSignIn} />
								}/>
								<Route path={process.env.PUBLIC_URL + '/customers'} element={<Secured user={currentUser}><CustomerList /> </Secured>} />
								<Route path={process.env.PUBLIC_URL + '/transactions'} element={<Secured user={currentUser}><TransactionList /></Secured>} />
								<Route path={process.env.PUBLIC_URL + '/accounts'} element={<Secured user={currentUser}> <AllAccountList /></Secured>} />
								<Route path={process.env.PUBLIC_URL + '/about'} element={<About />} />
							</Route>
						</Routes>
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;


/**
 * Helper Component to wrap other Components, which shall only be accessed by a logged in user.
 * 
 * @param {props} The React props 
 * @returns 
 */
function Secured(props) {
	let location = useLocation();

	if (!props.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={process.env.PUBLIC_URL + '/index.html'} state={{ from: location }} replace />;
	}

	return props.children;
}