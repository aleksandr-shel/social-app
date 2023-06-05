import { Box } from '@mui/material';
import * as React from 'react';
import { Post } from '../../app/models/Post';
import { setPosts } from '../../app/stores/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import NewsPost from '../news/NewsPost';
import CreatePostNews from '../news/CreatePostNews';

interface Props{
    profilePosts?:Post[],
    username?:string
}

function ProfileNewsList({profilePosts, username}:Props) {
    const {posts} = useAppSelector(state => state.postsReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        if (profilePosts !== undefined){
            dispatch(setPosts(profilePosts))
        } 
    },[dispatch, profilePosts])

    return ( 
        <>
            <Box>
                {
                    (username === undefined || user?.username === username)
                    &&
                    <CreatePostNews/>
                }
                {
                    posts?.length !== 0 ? 
                    posts?.map((post) => (
                        <NewsPost key={post.id} post={post}/>
                    ))
                :
                    <div className='text-center'>
                        No posts yet
                    </div>
                }
            </Box>
        </>
     );
}

export default ProfileNewsList;