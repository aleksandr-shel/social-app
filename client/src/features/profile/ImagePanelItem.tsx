import * as React from 'react';
import { Image } from '../../app/models/Image';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../app/stores/store';
import { deleteImageAct, setMainImageAct } from '../../app/stores/actions/profileActions';
import ImageCarousel from '../images/ImageCarousel';
import { setCurrentImage, setImages } from '../../app/stores/slices/imagesSlices';
import { openModal } from '../../app/stores/slices/imageModalSlice';
const ImageDiv = styled.div`
    flex: 0 0 33.3%;
    overflow: hidden;
    img{
        height: 200px;
        width: 100%;
        object-fit: contain;
    }
    .buttons{
        display: flex;
        flex-direction: column;
    }
`;

interface Props{
    img:Image,
    owner: boolean,
    images: Image[],
}

function ImagePanelItem({img, owner,images}:Props) {

    const dispatch = useAppDispatch();
    function handleSetMain(){
        dispatch(setMainImageAct(img))
    }

    function handleDelete(){
        dispatch(deleteImageAct(img))
    }

    function handleClickImage(){
        dispatch(openModal(<ImageCarousel/>))
        dispatch(setCurrentImage(img))
        dispatch(setImages(images))
    }

    return (
            <ImageDiv key={img.key} onClick={()=>{handleClickImage()}}>
                <img src={img.url} alt={img.key}/>
                {
                    owner 
                    &&
                    <div className='buttons' onClick={(e)=>e.stopPropagation()}>
                        {
                            !img.isMain
                            &&
                            <Button onClick={handleSetMain}>
                                Set main
                            </Button>
                        }
                        <Button onClick={handleDelete} color='secondary'>
                            Delete
                        </Button>
                    </div>
                }
            </ImageDiv>
     );
}

export default ImagePanelItem;