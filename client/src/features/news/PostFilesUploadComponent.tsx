import { Button } from '@mui/material';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const PostFilesUploadDiv = styled.div`
    .file-container{
    }
    .file-to-upload{
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        object-fit: cover;
        margin: 1px;
    }

    .btn-upload-file{
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
    files:File[],
}

function PostFilesUploadComponent({setFiles, setSrcs, srcs, files}:Props) {
    const [hitMaxImages, setHitMaxImages] = React.useState(false);

    React.useEffect(()=>{
        setTimeout(()=>{
            setHitMaxImages(false)
        },5000)
    },[hitMaxImages])

    function handleDeleteImageToUpload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index:number){
        e.stopPropagation();
        console.log('files: ', files);
        console.log('srcs: ', srcs);
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
                setSrcs((srcs:any)=>{
                    setFiles((files:any)=>[...files,file])
                    return [...srcs!, reader.result]
                })

            }
            reader.readAsDataURL(file);
        })
      }, [setFiles, setSrcs, srcs.length])

    const {getRootProps, getInputProps} = useDropzone({onDrop})
    return ( 
        <PostFilesUploadDiv {...getRootProps()}>
            <input {...getInputProps()}/>
            <Button className='btn-upload-file' title='Add File'>
                <AttachFileIcon/>
            </Button>
            <div className='file-container'>
                {
                    srcs !== undefined
                    &&
                    srcs.length !== 0
                    &&
                    srcs.map((src,index) => (
                        <div className='position-relative' key={index}>
                            <a className='file-to-upload' key={index} href={src}>{files[index].name}</a>
                            <button onClick={(e)=>handleDeleteImageToUpload(e,index)} type="button" className="btn-close position-absolute top-0 end-0 m-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                    ))
                }
            </div>
            {
                hitMaxImages
                &&
                <p style={{color:'red'}}>
                    No more than 10 Files
                </p>
            }
        </PostFilesUploadDiv>
     );
}

export default PostFilesUploadComponent;