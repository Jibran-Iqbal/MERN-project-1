import {CREATE, FETCH_ALL, UPDATE, DELETE, LIKE} from '../constants/actionTypes.js';
// Here posts are referring to state 
export default (posts = [],action)=>{
    switch(action.type)
    {
        case DELETE:
            return posts.filter((post)=>post._id!==action.payload.id);
        case UPDATE:
        case LIKE:
            return posts.map((post)=>post._id===action.payload.id?action.payload : post)
            // This map functions says go through all the posts and return all the posts and updated post which we can find by comparing with it's id
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts,action.payload];
        default:
            return posts;
    }
}

// https://youtu.be/VsUzmlZfYNg?t=6416