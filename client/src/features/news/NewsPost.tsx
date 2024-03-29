import * as React from 'react';
import { Post } from '../../app/models/Post';
import styled from 'styled-components';
import { Avatar, Box, Grid, List, ListItem, ListItemButton, ListItemText, Popper } from '@mui/material';
import {formatDistanceToNow} from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { deletePost } from '../../app/stores/actions/postsActions';
import EditPostNews from './EditPostNews';
import { Link } from 'react-router-dom';
import { setCurrentImage, setImages } from '../../app/stores/slices/imagesSlices';
import ImageCarousel from '../images/ImageCarousel';
import { Image } from '../../app/models/Image';
import { toggleFavoritePost } from '../../app/stores/actions/messagesActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { openModal } from '../../app/stores/slices/imageModalSlice';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from './Comments';

const StyledPostDiv = styled.div`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;
    padding: 1em;
    position: relative;
    .header-post{
        margin-bottom: 0.5em;
    }
    .date-div{
        font-size: small;
    }

    .content-text{
        padding-top: 0.5em;
        border-top: 0.5px solid #D3D3D3;
        white-space: pre-wrap;
    }
    /* images styles */
    .images-container{
        margin-top: 1em;
    }

    .images-container img{
        border-radius: 15px;
    }

    .first-two-images{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .first-two-images .image{
        flex: 1 1 50%;
    }

    .first-two-images .image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .rest-images{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rest-images .image{
        flex: 0 1 50%;
    }

    .rest-images .image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    /* like button styles */
    .like-btn{
        border-radius: 20px;
        background-color: #e3e3e3;
        padding: 0.5em;
        margin-top: 0.2em;
    }
    .like-btn:hover{
        cursor: pointer;
    }
    .like-btn.animation{
        animation: explode 0.5s infinite linear;
    }

    @keyframes clippath {
        0%,
        100% {
            clip-path: inset(0 0 95% 0);
        }
        25% {
            clip-path: inset(0 95% 0 0);
        }
        50% {
            clip-path: inset(95% 0 0 0);
        }
        75% {
            clip-path: inset(0 0 0 95%);
        }
    }

    @keyframes explode {
        from {
            transform: scale(0.95);
        }
        to{
            transform: scale(1.05);
        }
    }

    .comment-btn{
        border-radius: 20px;
        background-color: #e3e3e3;
        padding: 0.5em;
        margin-top: 0.2em;
        margin-left: 1em;
        cursor: pointer;
    }

    .comment-btn:active{
        transform: scale(0.95);
    }
`
const DotsButton = styled.div`
    cursor:pointer;
`;

const DotsPopper = styled.div`
    background-color: white;
    border-radius: 7px;
    border: 1px solid #D3D3D3;
    box-shadow: #D3D3D3 0px 8px 24px;
    li{
        padding:0;
    }
`

interface Props{
    post:Post
}

function NewsPost({post}:Props) {

    //like-btn
    const [animation,setAnimation] = React.useState(false);

    //comments
    const [showComments, setShowComments] = React.useState(false);

    //Dots Popper handler
    const [anchorDotsButton, setAnchorDotsButton] = React.useState<null | HTMLElement>(null);
    const [needMoreBtn, setMoreBtn] = React.useState(post.content?.length > 100);
    const [less, setLess] = React.useState(false);
    const handleMouseOverDotsButton = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorDotsButton(event.currentTarget);
    };
    const handleMouseLeaveDotsButton = ()=>{
        setAnchorDotsButton(null);
    }
    const open = Boolean(anchorDotsButton);

    const {user} = useAppSelector(state => state.userReducer);
    //delete post
    const dispatch = useAppDispatch();
    function deletePostHandler(id:string){
        dispatch(deletePost(id))
    }

    function toggleFavorite(){
        dispatch(toggleFavoritePost(post.id))
        setAnimation(true);
        setTimeout(() => setAnimation(false), 500);
    }

    //edit mode
    const [editMode, setEditMode] = React.useState(false);
    function clickMore(){
        setMoreBtn(false);
        setLess(true);
    }
    function clickLess(){
        setLess(false);
        setMoreBtn(true);
    }

    function handleClickImage(img:Image){
        dispatch(openModal(<ImageCarousel/>))
        dispatch(setCurrentImage(img))
        dispatch(setImages(post.images))
    }
    return ( 
        <>
            {editMode ?
                <EditPostNews post={post} setEditMode={setEditMode}/>
                :
                <StyledPostDiv>
                    <div>
                        <Grid container className='header-post'>
                            <Grid item xs={1.5}>
                                <Avatar style={{textDecoration:'none'}} component={Link} to={`/profile/${post.author.username}`} src={post.author.imageUrl}>
                                    {post.author.lastName.slice(0,1)}
                                </Avatar>
                            </Grid>
                            <Grid item xs={10}>
                                <Box style={{textDecoration:'none'}} component={Link} to={`/profile/${post.author.username}`}>
                                    {post.author.firstName} 
                                    {' '}
                                    {post.author.lastName} 
                                </Box>
                                <div className='date-div'>
                                    {formatDistanceToNow(new Date(post.date.endsWith('Z') ? post.date : post.date + 'Z'))} ago
                                </div>
                            </Grid>
                            <Grid item xs={0.5}>
                                {user !== null && user!.username === post.author.username &&
                                    <DotsButton onMouseOver={handleMouseOverDotsButton} onMouseLeave={handleMouseLeaveDotsButton}>
                                        <MoreHorizIcon/>
                                        <Popper open={open} anchorEl={anchorDotsButton} placement='bottom-end'>
                                            <DotsPopper>
                                                <List>
                                                    <>
                                                        <ListItem>
                                                            <ListItemButton onClick={()=>{setEditMode(true); setAnchorDotsButton(null);}}>
                                                                <ListItemText primary="Edit" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemButton onClick={()=>deletePostHandler(post.id)}>
                                                                <ListItemText primary="Delete" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </>
                                                </List>
                                            </DotsPopper>
                                        </Popper>
                                    </DotsButton>
                                }
                            </Grid>
                        </Grid>
                        <div className='content-text'>
                            {
                                needMoreBtn
                                ?
                                <>
                                    {post.content.slice(0, 100)}
                                    <span style={{color:'blue', cursor:'pointer'}} onClick={clickMore}>...more</span>
                                </>
                                :
                                <>
                                    {post.content}
                                    {
                                        less 
                                        &&
                                        <span style={{color:'blue', cursor:'pointer'}} onClick={clickLess}>
                                            {' '}show less
                                        </span>
                                    }
                                </>
                            }
                        </div>
                        {
                            post.images.length !== 0
                            &&
                            <div className='images-container'>
                                <div className='first-two-images'>
                                    <div className='image' key={post.images[0].key}>
                                        <img alt={post.images[0].key} src={post.images[0].url} onClick={()=>handleClickImage(post.images[0])}/>
                                    </div>
                                    {
                                        post.images.length >= 2
                                        &&
                                        <div className='image' key={post.images[1].key}>
                                            <img alt={post.images[1].key} src={post.images[1].url} onClick={()=>handleClickImage(post.images[1])}/>
                                        </div>
                                    }
                                </div>
                                {
                                    post.images.length > 2
                                    &&
                                    <div className='rest-images'>
                                        {
                                            post.images.map((img,index)=>{
                                                if (index <=1){
                                                    return null;
                                                }
                                                return(
                                                    <div className='image' key={img.key}>
                                                        <img alt={img.key} src={img.url} onClick={()=>handleClickImage(img)}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {
                            post.documents.length !== 0
                            &&
                            <div>
                                {
                                    post.documents.map((doc, index)=>{
                                        return(
                                            <div key={index}>
                                                <a href={doc.url} target='_blank' rel='noreferrer'>{doc.name}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        <div style={{display:'flex'}}>
                            <div className={`like-btn ${animation ? 'animation':''}`} style={{width:'fit-content'}} onClick={toggleFavorite}>
                                {
                                    post.liked ?
                                    <FavoriteIcon style={{color:'red'}}/>
                                    :
                                    <>
                                        <FavoriteBorderIcon/>
                                    </>
                                }
                                {post.likes}
                            </div>
                            <div className='comment-btn' onClick={()=>setShowComments(!showComments)}>
                                {post.commentsTotal}
                                <CommentIcon/>
                            </div>
                        </div>
                    </div>
                    <Comments comments={post.comments} commentsTotal={post.commentsTotal} show={showComments} setShow={setShowComments} postId={post.id}/>
                </StyledPostDiv>
            }
        </>
     );
}

export default NewsPost;