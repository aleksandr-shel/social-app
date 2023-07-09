import * as React from 'react';
import {Image} from '../../app/models/Image';
import styled from 'styled-components';
import ImagePanelItem from './ImagePanelItem';
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
    .header{
        color:#01579b;
        border-bottom: 2px solid #01579b;
        margin: 0.5em 1em 0 1em;
    }

    .disabled{
        display: none;
    }
`;

function ImagesPanel({images, owner}:Props) {
    const pageSize = 3;
    const [current, setCurrent] = React.useState(1);
    const [pages, setPages] = React.useState<number>(0);

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

    if (images.length === 0) return null;

    return ( 
        <ImagesPanelDiv>
            <div>
                <h4 className='header'>
                    Photos
                </h4>
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