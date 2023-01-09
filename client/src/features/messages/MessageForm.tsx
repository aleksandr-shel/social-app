import { Avatar, Box, CircularProgress, FormControl,TextField } from '@mui/material';
import * as React from 'react';
import { PostMessage } from '../../app/models/Message';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { postMessage } from '../../app/stores/actions/messagesActions';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { setProfile } from '../../app/stores/slices/profileSlice';

function MessageForm() {

    const dispatch = useAppDispatch();
    const {profile} = useAppSelector(state => state.profileReducer);
    const [content, setContent] = React.useState<string>('');
    const [isSent, setSent] = React.useState(false);

    React.useEffect(()=>{
        return ()=>{
            dispatch(setProfile(null))
        }
    },[dispatch])
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (profile){
            let message:PostMessage = {
                content
            }
            dispatch(postMessage(profile.username,message));
        }
        setSent(true);
        setContent('');
        
    }   

    function handleKeyDown(e:React.KeyboardEvent<HTMLFormElement>){
        if (e.key === 'Enter' && !e.shiftKey){
            return;
        }
        if (e.key === 'Enter' && e.shiftKey){
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return ( 
        <div>
            {
                isSent
                ?
                <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center',height:'100%'}}>
                    <CircularProgress />
                </Box>
                :
            <>
            <h5 style={{textAlign:'center'}}>
                New message
            </h5>
            <div style={{display:'flex'}}>
                <Avatar alt={profile!.firstName} src={profile!.imageUrl} />
                <span style={{marginLeft:'1em'}}>
                    {profile?.firstName + ' ' + profile?.lastName}
                </span>
            </div>
            <div style={{margin:'1em'}}>
                <Form onSubmit={(e)=>handleSubmit(e)} style={{width:'100%'}} onKeyDown={e=>handleKeyDown(e)}>
                    <FormControl style={{width:'100%'}}>
                        <TextField
                            style={{float:'left'}}
                            size='small'
                            label="Write your message"
                            variant="filled"
                            value={content}
                            onChange={(e)=>setContent(e.target.value)}
                            multiline
                            rows={5}
                        />

                    </FormControl>
                    <Button type='submit'>
                        Send Message
                    </Button>
                </Form>
            </div>
            </>
            }
        </div>
     );
}

export default MessageForm;