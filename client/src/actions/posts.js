import {CREATE, FETCH_ALL, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from '../constants/actionTypes.js';
import * as api from '../api';

export const getPost = (id) => async(dispatch) =>{
    try{
        // console.log("hello1")
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        // dispatch(action)
        // console.log(data)
        dispatch({type:FETCH_POST,payload:data});
        dispatch({type: END_LOADING});
        // We store the data in payload
    }
    catch(err)
    {
        console.log(err.message);
    }
}
export const getPosts = (page, d=false) => async(dispatch) =>{
    try{
        // console.log("hello1")
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        // dispatch(action)
        // console.log(data)
        dispatch({type:FETCH_ALL,payload:data});
        dispatch({type: END_LOADING});
        // We store the data in payload
    }
    catch(err)
    {
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery,) => async(dispatch) =>{
    try {
        dispatch({type: START_LOADING});
        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        // console.log(data)
        dispatch({type:FETCH_BY_SEARCH,payload:data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post,history) => async(dispatch)=> {

    try{
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);

        history.push(`/posts/${data._id}`)
        dispatch({type:CREATE, payload:data})
        dispatch({type: END_LOADING});
    }
    catch(err){
        console.log(err);
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
        // console.log("Hello")
        const {data} = await api.likePost(id);
        // console.log(data)
        // the axios of the api will return the updated post to response.data
        dispatch({type:LIKE, payload:data})
        // console.log(data);
        // console.log("hhh")
    } catch (error) {
        console.log(error);
    }
}
export const commentPost = (value, id) => async(dispatch) => {
    try {
        const {data} = await api.comment(value, id);
        // console.log(data);
        dispatch({type:COMMENT, payload:data}) 

        return data.comments
    } catch (error) {
        console.log(error)
    }
}


// https://youtu.be/VsUzmlZfYNg?t=9190