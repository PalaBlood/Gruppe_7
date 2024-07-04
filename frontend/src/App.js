import React, { useState, useEffect } from 'react';
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

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const App = () => {
    const [currentHouseholdId, setCurrentHouseholdId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [appError, setAppError] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const handleSignIn = () => {
        setAuthLoading(true);
        signInWithPopup(auth, provider).then(async (result) => {
            const user = result.user;
            const token = await user.getIdToken();
            document.cookie = `token=${token};path=/;`;
            setAuthLoading(false);
            setCurrentUser(user);
        }).catch((error) => {
            setAuthLoading(false);
            setAuthError(error.message);
        });
    };

    const onHouseholdConfirmed = async (householdId) => {
        if (!auth.currentUser) {
            setAppError("No authenticated user found.");
            return;
        }

        try {
            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(auth.currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = householdId;

                await FridgeAPI.getAPI().updateUser(userBO);
                setCurrentHouseholdId(householdId);
            } else {
                throw new Error("User profile not found.");
            }
        } catch (error) {
            setAppError(error.message);
            console.error("Failed to update user's household:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthLoading(true);
                setCurrentUser(user);
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
                setAuthLoading(false);
            } else {
                setCurrentUser(null);
                setAuthLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Router>
                <div style={styles.app}>
                    <Header user={currentUser} />
                    <Container component="main" style={styles.main}>
                        <Routes>
                            <Route path="/" element={currentUser ? <Navigate replace to="/home" /> : <SignIn onSignIn={handleSignIn} />} />
                            <Route path="/home" element={<Secured user={currentUser}>
                                <CheckforexistingHousehold onHouseholdConfirmed={onHouseholdConfirmed} />
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
                <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={handleSignIn} />
                <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
            </Router>
        </ThemeProvider>
    );
};

const Secured = ({ user, children }) => {
    let location = useLocation();
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export default App;

