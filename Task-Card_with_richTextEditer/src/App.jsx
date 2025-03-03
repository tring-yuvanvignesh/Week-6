import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import SignIn from './Pages/Signin/SignIn';
import Signup from './Pages/Signup/Signup';
import LandingPage from './Pages/LandingPage/LandingPage';
import PersonaDetails from './Pages/CardPage/PersonaDetails';
import Privateroute from './Components/Privateroute/Privateroute';
import { Provider } from 'react-redux';
import store from './app/store';
import { ApolloProvider } from '@apollo/client';
import  client  from './apolloClient'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='signUp' element={<Signup />} />
            <Route path='signIn' element={<SignIn />} />
            <Route path='/persona/:id' element={<PersonaDetails />} />
            <Route element={<Privateroute />}>
              <Route path='landingPage' element={<LandingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
