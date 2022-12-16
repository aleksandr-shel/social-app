import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { Post } from '../../app/models/Post';
import { getPosts } from '../../app/stores/actions/postsActions';
import { setPosts } from '../../app/stores/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import CreatePostNews from './CreatePostNews';
import NewsPost from './NewsPost';

interface NewsProps{
    profilePosts?:Post[]
}

function News({profilePosts}:NewsProps) {

    const {posts} = useAppSelector(state => state.postsReducer)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        document.title = 'News'
        if (profilePosts !== undefined){
            dispatch(setPosts(profilePosts))
        } else {
            dispatch(getPosts())
        }
    },[dispatch, profilePosts])

    return ( 
        <Grid container>
            <Grid item xs={7}>
                <Box>
                    <CreatePostNews/>
                    {posts?.map((post) => (
                        <NewsPost key={post.id} post={post}/>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={5}>

            </Grid>
        </Grid>
     );
}

export default News;