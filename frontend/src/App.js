import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import Theme from './theme';
import SignIn from './components/pages/SignIn';
import firebaseConfig from './firebaseconfig';

class App extends Component {
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

    auth.languageCode = 'en';
    signInWithRedirect(auth, provider);
  };

  componentDidMount() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    auth.languageCode = 'en';
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ authLoading: true });
        user.getIdToken().then((token) => {
          document.cookie = `token=${token};path=/`;
          this.setState({
            currentUser: user,
            authError: null,
            authLoading: false
          });
        }).catch((e) => {
          this.setState({
            authError: e,
            authLoading: false
          });
        });
      } else {
        document.cookie = 'token=;path=/';
        this.setState({
          currentUser: null,
          authLoading: false
        });
      }
    });
  }

  render() {
    // Die folgenden Variablen werden deklariert, aber momentan nicht verwendet.
    // Wir müssen es dementsprechend anpassen.
    // const { currentUser, authLoading, authError, appError } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router>
          <Container maxWidth='md'>
            <Routes>
              <Route path="/" element={<SignIn onSignIn={this.handleSignIn} />} />
              <Route path="*" element={<SignIn onSignIn={this.handleSignIn} />} />
              /* Hier kommen alle Komponenten rein. Normalerweise testen wir hier, ob der User bereits angemeldet ist (siehe Bankbeispiel)
              Da wir aber noch keine andere Komponente haben, können wir keinen Else-Zweig zu einer anderen Komponente setzen
              */
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;

