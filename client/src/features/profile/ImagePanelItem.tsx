import * as React from 'react';
import { Image } from '../../app/models/Image';
import styled from 'styled-components';
import { Button, imageListClasses } from '@mui/material';
import { useAppDispatch } from '../../app/stores/store';
import { deleteImageAct, setMainImageAct } from '../../app/stores/actions/profileActions';
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
}

function ImagePanelItem({img, owner}:Props) {

    const dispatch = useAppDispatch();
    function handleSetMain(){
        dispatch(setMainImageAct(img))
    }

    function handleDelete(){
        dispatch(deleteImageAct(img))
    }

    return (
            <ImageDiv key={img.key}>
                <img src={img.url} alt={img.key}/>
                {
                    owner 
                    &&
                    <div className='buttons'>
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