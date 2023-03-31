import { Box} from '@mui/material';
import * as React from 'react';
import { getFavoritePosts } from '../../app/stores/actions/postsActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import NewsPost from '../news/NewsPost';


function FavoriteList() {
    const {favoritePosts} = useAppSelector(state => state.postsReducer);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        dispatch(getFavoritePosts())
    },[dispatch])
    return ( 
        <Box style={{display:'flex', flexWrap:'wrap'}}>
            {favoritePosts?.map((post) => (
                <div style={{flex:'0 0 30%'}}>
                    <NewsPost key={post.id} post={post}/>
                </div>
            ))}
        </Box>
     );
}

export default FavoriteList;