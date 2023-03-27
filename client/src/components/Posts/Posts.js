import { CircularProgress, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post.js'
import useStyles from "./styles.js"

const Posts=({setCurrentId,setCurrentD})=>{
    const {posts, isLoading} = useSelector((state)=>state.posts);
    const classes = useStyles();
    // useEffect(()=>{
    //     if(currentD)
    //         posts.filter((post)=>post._id!==currentD)
    //         console.log(currentD)
    // },[currentD])

    if(!posts && !isLoading) return 'No Posts'

    return(
        // Adding ? after posts to make sure to not throw an error if we have no posts
        isLoading?<CircularProgress/>:(
            <Grid className={classes.container}  container alignItems="stretch" spacing={3} >
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={12} md={6}> 
                            <Post post={post}  setCurrentId={setCurrentId} setCurrentD={setCurrentD}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;