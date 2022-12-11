import React from 'react'
import { Container, Grow, Grid} from '@material-ui/core';
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getPosts} from "../../actions/posts"

// What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.

    
// useEffect here if the dependency array value changes then the function gets launched

const Home = () => {


    const [currentId, setCurrentId]=useState(null);
    const [currentD, setCurrentD]=useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
        dispatch(getPosts());
    },[currentId,dispatch,currentD]);
    return (
        <Grow in>
                {/* Grow provides animation and in is an attribute to it which simply means grow in */}
                <Container>
                    <Grid  container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} setCurrentD={setCurrentD} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
        </Grow>
    )
}

export default Home
