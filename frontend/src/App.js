import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import Theme from './theme';
import SignIn from './components/pages/SignIn';
import firebaseConfig from './firebaseconfig';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import LoadingProgress from './components/dialogs/LoadingProgress';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FridgeAPI from './API/SmartFridgeAPI';
import CheckforexistingHousehold from './components/dialogs/HouseholdCheck';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Household from './components/HouseholdList';
import UserProfile from './components/UserList';
import RecipeList from './components/RecipeList'; 
import RecipeEntryList from './components/RecipeEntryList';
import UnitList from './components/UnitList';
import FridgeEntriesComponent from './components/FridgeItemList';

class App extends React.Component {
    constructor(props) {
        super(props);
        // Initialize state with an empty User object and null as Household ID
        this.state = {
            currentHouseholdId: null,
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false
        };

        this.onHouseholdConfirmed = this.onHouseholdConfirmed.bind(this);

        // Initialize Firebase if not already initialized
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
        signInWithPopup(App.auth, App.provider).then(async (result) => {
            const user = result.user;
            const token = await user.getIdToken();
            document.cookie = `token=${token};path=/;`;
            this.setState({ authLoading: false, currentUser: user });
        }).catch((error) => {
            this.setState({ authLoading: false, authError: error.message });
        });
    };

    // Lifecycle method
    componentDidMount() {
        this.unsubscribeFromAuth = onAuthStateChanged(App.auth, async (user) => {
            if (user) {
                this.setState({ authLoading: true, currentUser: user });
                const token = await user.getIdToken();
                document.cookie = `token=${token};path=/;`;
                const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(user.uid);
                if (!userBO[0].google_user_id) {
                    let newUser = {
                        id: 0,
                        first_name: user.displayName?.split(" ")[0] || "",
                        last_name: user.displayName?.split(" ")[1] || "",
                        nick_name: user.displayName?.split(" ")[0] || "User",
                        google_user_id: user.uid,
                        household_id: null
                    };
                    await FridgeAPI.getAPI().addUser(newUser);
                }
                this.setState({
                    currentUser: user,
                    authError: null,
                    authLoading: false
                });
            } else {
                this.setState({ currentUser: null, authLoading: false });
            }
        });
    }

    // Make sure componentDidMount is only triggered once
    componentWillUnmount() {
        if (this.unsubscribeFromAuth) {
            this.unsubscribeFromAuth();
        }
    }

    // Household confirmed
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
                userBO.household_id = householdId;  // Update household ID

                await FridgeAPI.getAPI().updateUser(userBO);  // Update user via API
                this.setState({ loading: false, dialogOpen: false, selectedHouseholdId: householdId });
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
                    <div style={styles.app}>
                        <Header user={currentUser} />
                        <Container component="main" style={styles.main}>
                            <Routes>
                                <Route path="/" element={currentUser ? <Navigate replace to="/home" /> : <SignIn onSignIn={this.handleSignIn} />} />
                                <Route path="/home" element={<Secured user={currentUser}>
                                    <CheckforexistingHousehold onHouseholdConfirmed={this.onHouseholdConfirmed} />
                                    <Home />
                                </Secured>} />
                                
                                <Route path="/user" element={
                                    <Secured user={currentUser}>
                                        <UserProfile />
                                    </Secured>
                                } />
                                
                                <Route path="/fridge" element={
                                    <Secured user={currentUser}>
                                        <FridgeEntriesComponent />
                                    </Secured>
                                } />
                               
                                <Route path="/household" element={
                                    <Secured user={currentUser}>
                                        <Household />
                                    </Secured>
                                } />

                                <Route path="/recipe" element={
                                    <Secured user={currentUser}>
                                        <RecipeList />
                                    </Secured>
                                } />

                                <Route path="/recipes/entries/:recipeId" element={
                                    <Secured user={currentUser}>
                                        <RecipeEntryList />
                                    </Secured>} 
                                />
                                        
                                <Route path="/unit" element={
                                    <Secured user={currentUser}>
                                        <UnitList />
                                    </Secured>
                                }/>
                          
                                
                                <Route path="/about" element={<Secured user={currentUser}>
                                        <About />
                                    </Secured>
                                }/>
                            </Routes>
                        </Container>
                        <Footer />
                    </div>
                    <LoadingProgress show={authLoading} />
                    <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
                    <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
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

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    padding: '20px 0',
  },
};

