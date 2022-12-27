import { FormControl, InputAdornment, TextField } from '@mui/material';
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
    return ( 
        <Form onSubmit={handleSubmit} style={{width:'100%'}}>
            <FormControl style={{width:'100%'}}>
                <TextField
                    style={{float:'left'}}
                    size='small'
                    label="Write your message"
                    variant="filled"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            </InputAdornment>
                        ),
                    }}
                />

            </FormControl>
        </Form>
     );
}

export default PostMessageComponent;