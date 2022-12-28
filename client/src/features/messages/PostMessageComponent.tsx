import { FormControl,TextField } from '@mui/material';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { PostMessage } from '../../app/models/Message';
import { postMessage } from '../../app/stores/actions/messagesActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';


function PostMessageComponent() {
    const dispatch = useAppDispatch();
    const [content, setContent] = React.useState<string>('');
    const {partner} = useAppSelector(state => state.messagesReducer);
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (partner){
            let message:PostMessage = {
                content
            }
            dispatch(postMessage(partner.username,message));
        }
        setContent('');
    }   
    function handleKeyDown(e:React.KeyboardEvent<HTMLFormElement>){
        if (e.key === 'Enter' && e.shiftKey){
            return;
        }
        if (e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            handleSubmit(e);
        }
    }
    return ( 
        <Form onSubmit={handleSubmit} onKeyDown={e=>handleKeyDown(e)} style={{width:'100%'}}>
            <FormControl style={{width:'100%', display:'flex'}}>
                <TextField
                    size='small'
                    label="Write your message"
                    multiline
                    variant="filled"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
            </FormControl>
        </Form>
     );
}

export default PostMessageComponent;