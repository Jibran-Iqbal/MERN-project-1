import {CREATE, FETCH_ALL, UPDATE, DELETE, LIKE} from '../constants/actionTypes.js';
import * as api from '../api';

export const getPosts = () => async(dispatch) =>{
    try{
        const {data} = await api.fetchPosts();
        // dispatch(action)
        dispatch({type:FETCH_ALL,payload:data});
        // We store the data in payload
    }
    catch(err)
    {
        console.log(err.message);
    }
}

export const createPost = (post) => async(dispatch)=> {

    try{
        const {data} = await api.createPost(post);

        dispatch({type:CREATE, payload:data})
    }
    catch(err){
        console.log("err.message");
    }

}


export const updatePost = (id,post)=>async(dispatch)=>{

    try {
        const {data} = await api.updatePost(id,post);
        // the axios of the api will return the updated post to response.data
        dispatch({type:UPDATE, payload:data})
        // console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async(dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async(dispatch) =>{
    try {
    const {data} = await api.likePost(id);
        // the axios of the api will return the updated post to response.data
        dispatch({type:LIKE, payload:data})
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}


// https://youtu.be/VsUzmlZfYNg?t=9190