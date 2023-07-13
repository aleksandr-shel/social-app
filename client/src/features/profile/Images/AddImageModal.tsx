import * as React from 'react';
import { addImageAct } from '../../../app/stores/actions/profileActions';
import { useAppDispatch } from '../../../app/stores/store';
import ImageUploadWidget from '../../../app/common/ImageUploadWidget';
import { Button } from '@mui/material';


function AddImageModal() {
    const dispatch = useAppDispatch();
    const [file, setFile] = React.useState<File>();
    function handleUpload(){
        if (file){
            dispatch(addImageAct(file, false));
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

export default AddImageModal;