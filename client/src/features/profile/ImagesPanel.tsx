import * as React from 'react';
import {Image} from '../../app/models/Image';
import styled from 'styled-components';
import ImagePanelItem from './ImagePanelItem';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../app/stores/store';
import { openModal } from '../../app/stores/slices/modalSlice';
import AddImageModal from './Images/AddImageModal';
interface Props{
    images:Image[],
    owner: boolean,
}

const ImagesPanelDiv = styled.div`
    border-radius: 15px;
    background-color: white;
    margin-top: 1em;
    border: 0.5px solid  #D3D3D3;

    .images-container{
        position: relative;
    }

    .images{
        display:flex;
        position: relative;
        padding: 1em;
    }

    .btn-slider{
        user-select: none;
        cursor: pointer;
        z-index: 100;
        position: absolute;
        font-size: 5em;
        background-color: #EAEAEA;
        opacity: 0;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .btn-slider:hover{
        opacity: 0.5;
    }

    .left-btn{
        left:0;
    }
    .right-btn{
        right: 0;
    }

    .photos-top{
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #01579b;
    }
    .header {
        color:#01579b;
        margin: 0.5em 1em 0 1em;
        a {
            color:inherit;
            text-decoration: none;
        }
    }

    .disabled{
        display: none;
    }
`;

function ImagesPanel({images, owner}:Props) {
    const pageSize = 3;
    const [current, setCurrent] = React.useState(1);
    const [pages, setPages] = React.useState<number>(0);
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        setCurrent(1);
        setPages(Math.ceil((images.length) / pageSize))
    },[images])
    function handleLeftBtn(){
        if (current - 1 > 0){
            setCurrent(current - 1);
        }
    }

    function handleRightBtn(){
        if (pages >= current + 1 && pages !== 0){
            setCurrent(current + 1);
        }
    }

    function handleAddImageClick(){
        dispatch(openModal(<AddImageModal/>))
    }

    if (images.length === 0 && owner) 
    {
        return(
            <ImagesPanelDiv>
                <div className='photos-top'>
                    <h4 className='header'>
                        <Link to='images'>
                            Images
                        </Link>
                    </h4>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100px'}}>
                    <Button onClick={handleAddImageClick}>
                        Add Image
                    </Button>
                </div>
            </ImagesPanelDiv>
        )
    }

    if (images.length === 0) return null

    
    return ( 
        <ImagesPanelDiv>
            <div className='photos-top'>
                <h4 className='header'>
                    <Link to='images'>
                        Images
                    </Link>
                </h4>
                {
                    owner
                    &&
                    <Button onClick={handleAddImageClick}>
                        Add Image
                    </Button>
                }
            </div>
            <div className='images-container'>
                <div className={pages > 1 ? 'left-btn btn-slider' : 'left-btn btn-slider disabled'} onClick={handleLeftBtn}>
                    {'<'}
                </div>
                <div className={pages > 1 ? 'right-btn btn-slider' : 'right-btn btn-slider disabled'}  onClick={handleRightBtn}>
                    {'>'}
                </div>
                <div className='images'>
                    {images.map((img,index)=>{
                        if (index < pageSize * current && index >= pageSize * (current - 1)){
                            return (<ImagePanelItem key={img.key} img={img} owner={owner} images={images}/>)
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </ImagesPanelDiv>
     );
}

export default ImagesPanel;