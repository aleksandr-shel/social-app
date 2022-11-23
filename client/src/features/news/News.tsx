import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../app/stores/actions/postsActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import CreatePostNews from './CreatePostNews';
import NewsPost from './NewsPost';


function News() {

    const {posts} = useAppSelector(state => state.postsReducer)
    const dispatch = useAppDispatch();
    useEffect(()=>{
        document.title = 'News'
        dispatch(getPosts())
    },[dispatch])

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