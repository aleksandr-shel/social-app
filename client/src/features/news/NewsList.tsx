import { Box } from '@mui/material';
import * as React from 'react';
import { Post } from '../../app/models/Post';
import { getPosts } from '../../app/stores/actions/postsActions';
import { setPosts } from '../../app/stores/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import CreatePostNews from './CreatePostNews';
import NewsPost from './NewsPost';

interface Props{
    profilePosts?:Post[],
    username?:string
}

function NewsList({profilePosts, username}:Props) {
    const {posts} = useAppSelector(state => state.postsReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        if (profilePosts !== undefined){
            dispatch(setPosts(profilePosts))
        } else {
            document.title = 'News'
            dispatch(getPosts())
        }
    },[dispatch, profilePosts])
    return ( 
        <Box>
            {
                (username === undefined || user?.username === username)
                &&
                <CreatePostNews/>
            }
            {posts?.map((post) => (
                <NewsPost key={post.id} post={post}/>
            ))}
        </Box>
     );
}

export default NewsList;