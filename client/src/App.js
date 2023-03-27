import React from 'react';
import { Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import Auth from './components/Auth/Auth';




const App = () =>{
    const user = JSON.parse(localStorage.getItem('profile'))

    return(
        <BrowserRouter>
        <GoogleOAuthProvider clientId="559357566664-up4f7fddupuseegh9u7ac6541p2fqmm7.apps.googleusercontent.com">
            <Container maxwidth="xl">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={()=><Redirect to='/posts'/>} />
                    <Route path="/posts" exact component={Home}/>
                    <Route path="/posts/search" exact component={Home}/>
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={()=>(!user? <Auth/> : <Redirect to='/posts/'/>)} />
                </Switch>
            </Container>
        </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;

