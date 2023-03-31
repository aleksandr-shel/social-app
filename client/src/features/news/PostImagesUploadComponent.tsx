import { Button } from '@mui/material';
import * as React from 'react';
import {useDropzone} from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styled from 'styled-components';

const PostImagesUploadDiv = styled.div`
    .image-container{
        display: flex;
        flex-wrap: wrap;
    }
    .image-to-upload{
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        object-fit: cover;
        margin: 1px;
    }

    .btn-upload-image{
        display: block;
        width: 10%;
    }

    .btn-close{
        width: 5px;
        height:5px;
    }
`;

interface Props{
    setFiles:(files:any)=>void,
    srcs:string[],
    setSrcs: React.Dispatch<React.SetStateAction<string[]>>,
}


function PostImagesUploadComponent({setFiles,srcs, setSrcs}:Props) {

    const [hitMaxImages, setHitMaxImages] = React.useState(false);

    React.useEffect(()=>{
        setTimeout(()=>{
            setHitMaxImages(false)
        },5000)
    },[hitMaxImages])

    function handleDeleteImageToUpload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number){
        e.stopPropagation();
        setSrcs((srcs:string[])=>{
            let newSrcs = srcs.filter((src, i)=>{
                return index !== i;
            })
            return [...newSrcs]
        })

        setFiles((files:any[])=>{
            let newFiles = files.filter((file, i)=>{
                return index !== i;
            })
            return [...newFiles]
        })
    }
    const onDrop = React.useCallback((acceptedFiles:any) => {
        if (srcs.length >= 10){
            setHitMaxImages(true);
            return;
        } 
        acceptedFiles.forEach((file: any)=>{
            const reader = new FileReader()
            reader.onload = ()=>{
                setSrcs((srcs:any)=>[...srcs!, reader.result])
            }
            setFiles((files:any)=>[...files,file])
            reader.readAsDataURL(file);
        })
      }, [setSrcs, srcs, setFiles])

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return ( 
        <PostImagesUploadDiv {...getRootProps()}>
            <input {...getInputProps()}/>
            <Button className='btn-upload-image' title='Add Image'>
                <AddPhotoAlternateIcon/>
            </Button>
            <div className='image-container'>
                {
                    srcs !== undefined
                    &&
                    srcs.length !== 0
                    &&
                    srcs.map((src,index) => (
                        <div className='position-relative' key={index}>
                            <img className='image-to-upload' key={index} src={src} alt='something wrong:)'/>
                            <button onClick={(e)=>handleDeleteImageToUpload(e,index)} type="button" className="btn-close position-absolute top-0 end-0 m-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                    ))
                }
            </div>
            {
                hitMaxImages
                &&
                <p style={{color:'red'}}>
                    No more than 10 Images
                </p>
            }
        </PostImagesUploadDiv>
     );
}

export default PostImagesUploadComponent;