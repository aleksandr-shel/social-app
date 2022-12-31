import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';
interface Props{
    setFile: (file: any)=>void;
}

function ImageUploadWidget({setFile}:Props) {

    const [src, setSrc] = useState<any>();
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: 300
    }

    const dzActive = {
        borderColor: 'lightblue'
    }

    // const onDrop = useCallback((acceptedFiles) => {
        
    //     acceptedFiles.forEach((file: File)=>{
    //         const reader = new FileReader()

    //         reader.onload = ()=>{
    //             setSrc(reader.result)
    //             console.log('finished')
    //         }
    //         reader.readAsDataURL(file);
    //         setFiles(file);
    //     })
    // }, [setFiles, setSrc])

    const onDrop = useCallback((acceptedFiles:any) => {

        acceptedFiles.forEach((file: any)=>{
            const reader = new FileReader()
            reader.onload = ()=>{
                setSrc(reader.result);
            }

            reader.readAsDataURL(file);
            setFile(file);
        })
      }, [setSrc, setFile])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return ( 
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
            <input {...getInputProps()} />
            {
                src === undefined
                ?
                <div style={{fontSize:'15em', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <FileUploadIcon fontSize='inherit'/>
                </div>
                :
                <div style={{overflow:'hidden', display:'flex', justifyContent:'center'}}>
                    <img style={{objectFit: 'cover', height: 294}} src={src} alt='Image'/>
                </div>
            }
        </div>
     );
}

export default ImageUploadWidget;