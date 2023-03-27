import React from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getPosts, getPostsBySearch} from "../../actions/posts"
import Pagination from '../pagination'
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

// What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.

    
// useEffect here if the dependency array value changes then the function gets launched

const Home = () => {


    const [currentId, setCurrentId]=useState(null);
    const [currentD, setCurrentD]=useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history=useHistory();
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    // console.log(page)
    // useEffect(()=>{
    //     dispatch(getPosts());
    //     dispatch(getPosts());
    // },[currentId,dispatch,currentD]);

    const handleAdd = (tag) => setTags([...tags,tag])
    
    const handleDelete = (tagD) => setTags(tags.filter((tag)=> tag!==tagD))
    
    const searchPost = () => {
        // That means if there is a search term that is the title or a search term that is the tags 
        if(search.trim() || tags)
        {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            // Since tags is a array we can't just pass it as a parameter so we use 
            // tags.join which changes an array in the following manner
            // [a,b,c,d] ==> "a,b,c,d"
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
            // We use history.push to push the website into that url 
        }
        else {
            history.push('/')
        }
        
    }
    const handleKeyPress = (e)=>{
        if(e.keyCode === 13)
        {
            searchPost()
        }
    }
    // console.log("Hello")
    return (
        <Grow in>
                {/* Grow provides animation and in is an attribute to it which simply means grow in */}
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} setCurrentD={setCurrentD} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField name="search"
                                variant='outlined' 
                                label='Search Memories' 
                                fullWidth value={search} 
                                onChange={(e)=>setSearch(e.target.value)} 
                                onKeyPress={handleKeyPress}
                                //onKeyPress means on pressing enter key as 13 in handleKeyPress means enter
                                />  
                                <ChipInput 
                                    style={{margin:'10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button variant="contained" onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination currentId={currentId} currentD={currentD} page={page}/>
                            </Paper>)}
                        </Grid>
                    </Grid>
                </Container>
        </Grow>
    )
}

export default Home
