import * as React from 'react';
import { Comment } from '../../app/models/Comment';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { deleteCommentAct } from '../../app/stores/actions/commentsActions';

interface Props{
    comment:Comment
}

function CommentItem({comment}:Props) {

    const {user} = useAppSelector(state=>state.userReducer);

    const dispatch = useAppDispatch();
    function handleDeleteComment(){
        dispatch(deleteCommentAct({commentId:comment.id, postId:comment.postId}))
    }
    return ( 
        <div className='comment-div'>
            <div className='avatar'>
                <Avatar style={{textDecoration:'none'}} component={Link} to={`/profile/${comment.author.username}`} src={comment.author.imageUrl}>
                    {comment.author.lastName.slice(0,1)}
                </Avatar>
            </div>
            <div className='content'>
                <div>
                    <Link  style={{textDecoration:'none'}} to={`/profile/${comment.author.username}`}>
                        {comment.author.firstName}
                        {' '}
                        {comment.author.lastName}
                    </Link>
                </div>
                <div style={{whiteSpace:'pre-wrap'}}>
                    {comment.content}
                </div>
                <div style={{display:'flex'}}>
                    <div className='date-div'>
                        {formatDistanceToNow(new Date(comment.date.endsWith('Z') ? comment.date : comment.date + 'Z'))} ago
                    </div>
                    {
                        user?.username === comment.author.username
                        &&
                        <div className='delete-btn' onClick={handleDeleteComment}>
                            Delete
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}

export default CommentItem;