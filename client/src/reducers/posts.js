import {CREATE, FETCH_ALL, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT} from '../constants/actionTypes.js';
// Here posts are referring to state 
export default (state = {isLoading: true, posts: []},action)=>{
    switch(action.type)
    {
        case START_LOADING:
            return { 
                ...state,
                isLoading:true
            }
        case END_LOADING:
            return { 
                ...state,
                isLoading:false
            }
        case DELETE:
            return {
                ...state,
                posts:state.posts.filter((post)=>post._id!==action.payload.id)}
        case UPDATE:
        case LIKE:
            return {
                ...state,
                posts:state.posts.map((post)=>post._id===action.payload.id?action.payload : post)}
            // This map functions says go through all the posts and return all the posts and updated post which we can find by comparing with it's id
        case COMMENT:
            return{
                ...state,
                posts: state.posts.map((post) =>{
                    if(post._id === action.payload._id)
                        return action.payload;
                    return post;
                })
            }
        case FETCH_ALL:
            return {
                ...state,
                posts : action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPages : action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts : action.payload
            };
        case CREATE:
            return {
                ...state,
                posts :[...state, action.payload]
            };
        case FETCH_POST:
            return{
                ...state, post:action.payload
            }
        default:
            return state;
    }
}

// https://youtu.be/VsUzmlZfYNg?t=6416