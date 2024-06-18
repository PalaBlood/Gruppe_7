import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import Theme from './theme';
import SignIn from './components/pages/SignIn';
import firebaseConfig from './firebaseconfig';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import LoadingProgress from './components/dialogs/LoadingProgress';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FridgeAPI from './API/SmartFridgeAPI.js';
import CheckforexistingHousehold from './components/dialogs/HouseholdCheck.js';
import UserList from './components/UserList.js';
import UserBO from './API/UserBO.js';
import Fridge from './components/pages/Fridge'; // Fridge Komponente importieren

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHouseholdId: null,
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false
        };

        this.onHouseholdConfirmed = this.onHouseholdConfirmed.bind(this);

        //initialisiere firebase, davor checken ob bereits initialisiert
        if (!App.firebaseInitialized) {
            App.app = initializeApp(firebaseConfig);
            App.auth = getAuth(App.app);
            App.provider = new GoogleAuthProvider();
            App.firebaseInitialized = true;
        }
    }

    static getDerivedStateFromError(error) {
        return { appError: error };
    }

    handleSignIn = () => {
        this.setState({ authLoading: true });
        signInWithRedirect(App.auth, App.provider);
    };

    //lifecycle methode
    componentDidMount() {
        this.unsubscribeFromAuth = onAuthStateChanged(App.auth, async (user) => {
            if (user) {
                console.log("Auth state changed: User is present.");
                this.setState({ authLoading: true });

                const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(user.uid);
                if (!userBO[0].google_user_id) {
                    console.log("No corresponding user object found in the database, creating new user.");
                    let newUser = new UserBO
                    newUser = {
                        id: 0,
                        first_name: user.displayName?.split(" ")[0] || "",
                        last_name: user.displayName?.split(" ")[1] || "",
                        nick_name: user.displayName?.split(" ")[0] || "User",
                        google_user_id: user.uid,
                        household_id: null
                    };
                    await FridgeAPI.getAPI().addUser(newUser);
                } else {
                    console.log("User object found in the database, skipping creation.");
                }

                this.setState({
                    currentUser: user,
                    authError: null,
                    authLoading: false
                });
            } else {
                console.log("Auth state changed: No user logged in.");
                this.setState({ currentUser: null, authLoading: false });
            }
        });
    }

    //function die dafür sorgt das componentdidmount nur einmal getriggert wird
    componentWillUnmount() {
        if (this.unsubscribeFromAuth) {
            this.unsubscribeFromAuth();
        }
    }

    onHouseholdConfirmed = async (householdId) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            this.setState({ error: "No authenticated user found." });
            return;
        }

        this.setState({ loading: true });

        try {
            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = householdId;  // householdid updaten

                await FridgeAPI.getAPI().updateUser(userBO);  // user per api updaten
                this.setState({ loading: false, dialogOpen: false, selectedHouseholdId: householdId });
                console.log("User's household updated:", userBO);
            } else {
                throw new Error("User profile not found.");
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false });
            console.error("Failed to update user's household:", error);
        }
    }

    render() {
        const { currentUser, appError, authError, authLoading } = this.state;
        return (
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Router>
                    <Container maxWidth='md' style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <Header user={currentUser} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <Routes>
                                <Route path="/" element={currentUser ? <Navigate replace to="/home" /> : <SignIn onSignIn={this.handleSignIn} />} />
                                <Route path="/home" element={
                                    <Secured user={currentUser}>
                                        <CheckforexistingHousehold onHouseholdConfirmed={this.onHouseholdConfirmed} />
                                    </Secured>
                                } />
                                <Route path="/users" element={
                                    <Secured user={currentUser}>
                                        <UserList />
                                    </Secured>
                                } />
                                <Route path="/fridge" element={
                                    <Secured user={currentUser}>
                                        <Fridge />
                                    </Secured>
                                } />
                            </Routes>
                            <LoadingProgress show={authLoading} />
                            <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
                            <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
                        </div>
                    </Container>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;

function Secured({ user, children }) {
    let location = useLocation();
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
