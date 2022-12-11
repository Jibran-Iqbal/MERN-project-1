import React, { useEffect, useState } from 'react';
import usestyles from './styles.js';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, getPosts, updatePost } from '../../actions/posts';


// Paper is like a div with a whitish background

// In React, components need to be capitalized, and custom hooks need to start with use.
const Form=({currentId, setCurrentId})=>{

    const [postData, setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })

    const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);

    // const post={
    //     creator:'jj',
    //     title:'jj',
    //     message:'jj',
    //     tags:'jj',
    //     selectedFile:''
    // }

    // setPostData is used to fill the entries here
    useEffect(()=>{
        if(post) 
            setPostData(post);
        // console.log(post);
    },[post])


    const classes = usestyles();

    const dispatch = useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, postData));
            // console.log("Dis")
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }
    const clear = ()=>{
        setCurrentId(null);
        setPostData({ creator:'', title:'', message:'', tags:'', selectedFile:'' })

    }



    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6'>{currentId?"Editing":"Creating"} a Memory</Typography>
            <TextField  name='creator'  variant='outlined'  label='Creator'  fullWidth value={postData.creator}  onChange={(e)=>setPostData({ ...postData,creator:e.target.value})}/>

            <TextField  name='title'  variant='outlined'  label='Title'  fullWidth value={postData.title}  onChange={(e)=>setPostData({ ...postData,title:e.target.value})}/>

            <TextField  name='message'  variant='outlined'  label='Message'  fullWidth value={postData.message}  onChange={(e)=>setPostData({ ...postData,message:e.target.value})}/>

            <TextField  name='tags'  variant='outlined'  label='Tags'  fullWidth value={postData.tags}  onChange={(e)=>setPostData({ ...postData,tags:e.target.value.split(',')})}/>

            {/*e means event
            The creator key gets the input data
            so here all the data persists but creator key's value changes */}

            <div className={classes.fileInput}>
                <FileBase type='file' multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})} /> 
            
            </div>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>

            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            

            </form>

        </Paper>
    )
}
export default Form;

// https://youtu.be/VsUzmlZfYNg?t=6570