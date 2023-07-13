import { Button } from '@mui/material';
import * as React from 'react';
import ImageUploadWidget from '../../app/common/ImageUploadWidget';
import { addImageAct } from '../../app/stores/actions/profileActions';
import { useAppDispatch } from '../../app/stores/store';


function EditProfileImageModal() {
    const dispatch = useAppDispatch();
    const [file, setFile] = React.useState<File>();
    function handleUpload(){
        if (file){
            dispatch(addImageAct(file, true));
        }
    }
    return ( 
        <>
            <ImageUploadWidget setFile={setFile}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </>
     );
}

export default EditProfileImageModal;