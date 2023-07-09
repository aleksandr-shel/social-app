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

const StyledPostDiv = styled.div`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;
    padding: 1em;
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
        display: flex;
        margin-top: 1em;
        display: flex;
        flex-wrap: nowrap;
    }

    .first-image{
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 0 50%;
    }

    .images-container .first-image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .not-first-images{
        display: flex;
        flex-wrap: wrap;
    }

    .image{
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .not-first-images .image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .image.one{
        flex: 0 1 100%;
    }
    .image.two{
        flex: 0 0 50%;
    }
    .image.three{
        flex: 0 1 50%;
    }
    .image.four{
        flex: 0 1 50%;
    }
    .image.five{
        flex: 0 1 50%;
    }
    .image.six{
        flex: 0 1 33%;
    }
    .image.seven{
        flex: 0 1 33%;
    }
    .image.eight{
        flex: 0 1 33%;
    }
    .image.nine{
        flex: 0 1 33%;
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
    function toStringNumber(length:number){
        switch(length){
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            case 4:
                return 'four';
            case 5:
                return 'five';
            case 6:
                return 'six';
            case 7:
                return 'seven';
            case 8:
                return 'eight';
            case 9:
                return 'nine';
        }
    }
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
                                <div className='first-image'>
                                    <img alt={post.images[0].key} src={post.images[0].url} onClick={()=>handleClickImage(post.images[0])}/>
                                </div>
                                <div className='not-first-images'>
                                    {post.images.map((img, index)=>{
                                        if (index === 0) return null;
                                        return(
                                            <div key={img.key} className={'image ' + toStringNumber(post.images.length - 1)}>
                                                <img alt={img.key} src={img.url} onClick={()=>handleClickImage(img)}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        <div>
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
                        </div>
                    </div>
                </StyledPostDiv>
            }
        </>
     );
}

export default NewsPost;