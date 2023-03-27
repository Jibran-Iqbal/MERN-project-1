import React from 'react';
import useStyles from "./styles.js"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import {useHistory} from "react-router-dom"
import { useState } from 'react';


const Post=({post, setCurrentId,setCurrentD})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory()
    const del=()=>{
        dispatch(deletePost(post._id));
        setCurrentD(post._id);
    }

    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result.sub 

    // console.log(user)
    // console.log(post.likes)


    // const hasLikedPost = post.likes.find((like)=>like===userId)
    // console.log({post,hasLikedPost})
    const hasLikedPost = likes.find((like)=>like===userId)

    const like = ()=>{
        dispatch(likePost(post._id));
        // setCurrentD(post._id);
        // if(hasLikedPost)
        if(hasLikedPost)
            setLikes(likes.filter((id)=>id!==userId));
        else
            setLikes([...likes,userId]);
    }

    const Likes = () => {
    if (likes.length > 0) {
        return likes.find((like) => like === userId)
        ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`)

    return(
            <Card className={classes.card} raised elevation={3}>

                <ButtonBase className={classes.cardAction} onClick={openPost}>
                    <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                    <div className={classes.overlay}>

                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant = "body2">{moment(post.createdAt).fromNow()}</Typography>

                    </div>
                    <div className={classes.overlay2}>
                        {(user?.result?.sub === post?.creator || user?.result?._id===post?.creator) && 
                        (<Button style={{color:'white'}} size="small" onClick={(e)=>{
                            e.stopPropagation()
                            setCurrentId(post._id)
                            }}>
                            <MoreHorizIcon fontSize="default"/>
                        </Button>)}

                    </div>
                    <div className={classes.details}>
                        <Typography variant = "body2" color="textSecondary">
                            {post.tags.map((tag)=>`#${tag} `)}
                        </Typography>
                    </div>
                    <Typography className={classes.title} variant="h5" gutterBottom>
                        {post.title}
                    </Typography>
                    <CardContent>
                        
                    <Typography variant="body2" color='textSecondary' component='p'>
                        {post.message}
                    </Typography>

                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions} >
                    <Button size="small" color="primary" onClick={like} disabled={!user?.result} >
                        <Likes/>
                    </Button>
                    {/* &nbsp; we use it for space */}
                    {(user?.result?.sub === post?.creator || user?.result?._id===post?.creator) && 
                (<Button size="small" color="primary" onClick={del}>
                        <DeleteIcon fontSize='small'/>
                        Delete
                    </Button>)
                    }
                </CardActions>
            </Card>
        )
}

export default Post;


// https://youtu.be/VsUzmlZfYNg?t=7927