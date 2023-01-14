import {TextField,FormControl, Button } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { createPost } from '../../app/stores/actions/postsActions';
import { useAppDispatch } from '../../app/stores/store';
import PostImagesUploadComponent from './PostImagesUploadComponent';

const StyledCreatePostDiv = styled.form`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;
    padding: 1em;

    button{
        width: 100%;
        margin-top: 1em;
    }
`

function CreatePostNews() {

    const [content, setContent] = React.useState<string>('');
    const dispatch = useAppDispatch();
    // const [focused, setFocused] = React.useState(false);
    const [files, setFiles] = React.useState<File[]>([]);
    const [srcs, setSrcs] = React.useState<string[]>([]);

    // React.useEffect(()=>{
    //     console.log(files);
    // },[files])

    // React.useEffect(()=>{
    //     console.log(srcs);
    // },[srcs])

    function handleSubmit(){
        dispatch(createPost({content, files}));
        setContent('');
        setFiles([]);
        setSrcs([]);
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
        <StyledCreatePostDiv
            onSubmit={e=>{e.preventDefault(); handleSubmit()}} onKeyDown={e=>handleKeyDown(e)}>
            <FormControl style={{width:'100%'}}>
                <TextField 
                    label="What is going on in your life? :)" 
                    variant="filled" 
                    multiline={true}
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    />
            </FormControl>
            <PostImagesUploadComponent srcs={srcs} setSrcs={setSrcs} setFiles={setFiles}/>
            
            <Button className='btn btn-primary' type='submit' variant='outlined'>
                Post
            </Button>
        </StyledCreatePostDiv>
     );
}

export default CreatePostNews;