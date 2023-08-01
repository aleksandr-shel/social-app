import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../app/models/Comment';
import { useAppDispatch } from '../../app/stores/store';
import SendIcon from '@mui/icons-material/Send';
import { createComment, loadComments } from '../../app/stores/actions/commentsActions';
import CommentItem from './CommentItem';

interface Props{
    show:boolean,
    setShow:(val:boolean)=>void,
    comments:Comment[],
    commentsTotal:number,
    postId:string,
}

const CommentsDiv = styled.div`
    background-color: white;
    overflow: hidden;
    border-top: 0.5px solid #D3D3D3;
    margin-top: 0.5em;
    .btn-cross{
        width:fit-content;
    }
    .btn-cross:hover{
        cursor: pointer;
    }

    .comment-div{
        display: flex;
        border-bottom: 0.5px solid #D3D3D3;
    }

    .comment-div .avatar{
        width: 8%;
    }

    .date-div{
        font-size: small;
    }

    .content{
        margin-left: 1em;
        width: 80%;
    }
    .load-more{
        width:fit-content;
        color: #229ED9;
        cursor: pointer;
    }
    .load-more:hover{
        text-decoration: underline;
    }

    .delete-btn{
        color: #229ED9;
        cursor: pointer;
    }
    .delete-btn:hover{
        text-decoration: underline;
    }
`

const CreateCommentForm = styled.form`
    margin-top: 0.5em;
    display: flex;
    align-items: start;
    .item-input{
        flex: 0 0 80%;
    }
    .item-btn{
        margin-left: 0.5em;
    }
`

function Comments({commentsTotal, show, setShow, comments, postId}:Props) {
    const dispatch = useAppDispatch()
    const [content,setContent] = React.useState('');
    const [rows, setRows] = React.useState(3);
    const [loaded, setLoaded] = React.useState(false);

    function handleChangeComment(e:React.ChangeEvent<HTMLTextAreaElement>){
        setContent(e.target.value);
    }

    function handleLoadMore(){
        setLoaded(true);
        dispatch(loadComments(postId))
    }

    function handleSubmit(){
        dispatch(createComment({postId, content}))
        setContent('')
    }

    if (!show) return null;
    return ( 
        <CommentsDiv>

            {
                comments.length > 0
                &&
                <>
                {comments.map((comment)=>{
                    return(
                        <CommentItem comment={comment}/>
                    )
                })}
                </>
            }

            {
                !loaded 
                &&
                (commentsTotal > comments.length)
                &&
                <div className='load-more' onClick={handleLoadMore}>
                    Load more...
                </div>
            }

            <CreateCommentForm id='comment-form' onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
                <textarea form='comment-form' className='item-input' value={content} rows={rows} onChange={handleChangeComment} placeholder='Leave your thoughts'/>
                <button className='item-btn' type='submit'>
                    <SendIcon/>
                </button>
            </CreateCommentForm>
        </CommentsDiv>
     );
}

export default Comments;