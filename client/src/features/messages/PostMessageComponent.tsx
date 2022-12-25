import { FormControl, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '../../app/stores/store';


function PostMessageComponent() {
    const dispatch = useAppDispatch();
    const [content, setContent] = React.useState<string>('');

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setContent('')
    }   
    return ( 
        <Form onSubmit={handleSubmit}>
            <FormControl style={{width:'100%', transition: 'width 1s'}}>
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