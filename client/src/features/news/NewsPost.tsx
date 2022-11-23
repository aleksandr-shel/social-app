import * as React from 'react';
import { Post } from '../../app/models/Post';
import styled from 'styled-components';
import { Avatar, Grid, List, ListItem, ListItemButton, ListItemText, Popper } from '@mui/material';
import {formatDistanceToNow} from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { deletePost } from '../../app/stores/actions/postsActions';
import EditPostNews from './EditPostNews';

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

    //Dots Popper handler
    const [anchorDotsButton, setAnchorDotsButton] = React.useState<null | HTMLElement>(null);
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


    //edit mode
    const [editMode, setEditMode] = React.useState(false);
    return ( 
        <>
            {editMode ?
                <EditPostNews post={post} setEditMode={setEditMode}/>
                :
                <StyledPostDiv>
                    <div>
                        <Grid container className='header-post'>
                            <Grid item xs={1.5}>
                                <Avatar>
                                    {post.author.lastName.slice(0,1)}
                                </Avatar>
                            </Grid>
                            <Grid item xs={10}>
                                <div>
                                    {post.author.firstName} 
                                    {' '}
                                    {post.author.lastName} 
                                </div>
                                <div className='date-div'>
                                    {/* {format(new Date(post.date+'Z'), 'dd MMM yyyy h:mm aa')} */}
                                    {formatDistanceToNow(new Date(post.date.endsWith('Z') ? post.date : post.date + 'Z'))} ago
                                </div>
                            </Grid>
                            <Grid item xs={0.5}>
                                <DotsButton onMouseOver={handleMouseOverDotsButton} onMouseLeave={handleMouseLeaveDotsButton}>
                                    <MoreHorizIcon/>
                                    <Popper open={open} anchorEl={anchorDotsButton} placement='bottom-end'>
                                        <DotsPopper>
                                            <List>
                                                <ListItem>
                                                    <ListItemButton>
                                                        <ListItemText primary="Add to favorites" />
                                                    </ListItemButton>
                                                </ListItem>
                                                {user!.id === post.author.id &&
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
                                                }
                                            </List>
                                        </DotsPopper>
                                    </Popper>
                                </DotsButton>
                            </Grid>
                        </Grid>
                        <div className='content-text'>
                            {post.content}
                        </div>
                    </div>
                </StyledPostDiv>
            }
        </>
     );
}

export default NewsPost;