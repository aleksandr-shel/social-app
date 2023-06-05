import { Box, CircularProgress} from '@mui/material';
import * as React from 'react';
import { Post } from '../../app/models/Post';
import { getNextPosts, getPosts } from '../../app/stores/actions/postsActions';
import { setPageNumber } from '../../app/stores/slices/postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import CreatePostNews from './CreatePostNews';
import NewsPost from './NewsPost';
import InfiniteScrollCustom from '../../app/common/InfiniteScrollCustom';

interface Props{
    profilePosts?:Post[],
    username?:string
}

function NewsList({username}:Props) {
    const {posts, loading} = useAppSelector(state => state.postsReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        document.title = 'News'
        dispatch(setPageNumber(1))
        dispatch(getPosts())
        
    },[dispatch])

    function handleGetNext(){
        dispatch(getNextPosts())
    }

    
    return ( 
        <div>
            <InfiniteScrollCustom loadMore={()=>handleGetNext()}>
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
                            No news yet.
                        </div>
                    }
                </Box>
            </InfiniteScrollCustom>
            {
                loading
                &&
                <>
                    <CircularProgress/>
                </>
            }
        </div>
     );
}

export default NewsList;