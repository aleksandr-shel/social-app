import * as React from 'react';
import { Image } from '../../app/models/Image';
import styled from 'styled-components';

const ImageDiv = styled.div`
    flex: 0 0 33.3%;
    overflow: hidden;
    img{
        height: 200px;
        width: 100%;
        object-fit: contain;
    }
`;

interface Props{
    img:Image
}

function ImagePanelItem({img}:Props) {
    return ( 
        <ImageDiv>
            <img src={img.url} alt={img.key}/>
        </ImageDiv>
     );
}

export default ImagePanelItem;