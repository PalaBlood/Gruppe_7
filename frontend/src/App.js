import React, { createContext } from 'react';
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
import Home from './components/pages/Home'
import UserList from './components/UserList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false
        };
    }
    static getDerivedStateFromError(error) {
        return { appError: error };
    }
    handleSignIn = () => {
        this.setState({ authLoading: true });
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    componentDidMount() {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const AuthContext = createContext()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({ authLoading: true });
                user.getIdToken().then(token => {
                    document.cookie = `token=${token};path=/`;
                    localStorage.setItem('currentUserId', user.uid);
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
                document.cookie = 'token=;path=/';
                localStorage.removeItem('currentUserId')
                this.setState({
                    currentUser: null,
                    authLoading: false
                });
            }
        });
    }
    render() {
        const { currentUser, appError, authError, authLoading } = this.state;
        return (
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Router>
                    <Container maxWidth='md'>
                        <Header user={currentUser} />
                        <Routes>
                            <Route path={process.env.PUBLIC_URL + '/'} element={currentUser ? <Navigate replace to={process.env.PUBLIC_URL + '/home'} /> : <SignIn onSignIn={this.handleSignIn} />} />
                            <Route path={process.env.PUBLIC_URL + '/home'} element={<Home />} />
                            <Route path='/users' element={
                                currentUser ? <UserList /> : <Navigate to='/' />
                            } />
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


function Secured({ user, children }) {
    let location = useLocation();
    if (!user) {
        return <Navigate to={process.env.PUBLIC_URL + '/'} state={{ from: location }} replace />;
    }
    return children;
}