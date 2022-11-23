import {TextField,FormControl, Button } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { Post } from '../../app/models/Post';
import { editPost } from '../../app/stores/actions/postsActions';
import { useAppDispatch } from '../../app/stores/store';

const StyledEditPostDiv = styled.form`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;
    padding: 1em;
`
interface Props{
    post: Post,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

function EditPostNews({post,setEditMode}:Props) {
    const [content, setContent] = React.useState<string>(post.content);
    const dispatch = useAppDispatch();
    function handleSubmit(){
        dispatch(editPost(post.id, {content}));
        setEditMode(false);
    }

    function handleKeyDown(e:React.KeyboardEvent<HTMLFormElement>){
        if (e.key === 'Enter' && !e.shiftKey){
            return;
        }
        if (e.key === 'Enter' && e.shiftKey){
            e.preventDefault();
            handleSubmit();
        }
    }

    return ( 
        <StyledEditPostDiv onSubmit={e=>{e.preventDefault(); handleSubmit()}} onKeyDown={e=>handleKeyDown(e)}>
            <FormControl style={{width:'100%'}}>
                <TextField 
                    label="What is going on in your life? :)" 
                    variant="filled" 
                    multiline={true}
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    />
            </FormControl>
            <div style={{marginTop:'1em', display:'flex', justifyContent:'flex-end'}}>
                <Button type='button' variant='outlined' color='secondary' onClick={()=>setEditMode(false)}>
                    Cancel
                </Button>
                <Button type='submit' variant='outlined'>
                    Save
                </Button>
            </div>
        </StyledEditPostDiv>
     );
}

export default EditPostNews;