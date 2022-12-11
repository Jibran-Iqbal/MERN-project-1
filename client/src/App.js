import React from 'react';
import { Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import auth from './components/Auth/auth.js';




const App = () =>{
    return(
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;

