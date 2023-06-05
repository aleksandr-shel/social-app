import * as React from 'react';
import { Button } from 'react-bootstrap';
import { clearCurrentImageAndImages, moveLeft, moveRight } from '../../app/stores/slices/imagesSlices';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import styled from 'styled-components';

const NavContainer = styled.div`
    height: 100vh;
    position: absolute;
    top:0;
    z-index: 1000;
    display: flex;
    .left-side {
        width: 50%;
    }
    .right-side{
        width: 50%;
    }
`

function ImageCarousel() {
    const {images, currentImage} = useAppSelector(state=>state.imagesReducer);
    const dispatch = useAppDispatch();
    const ref = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);

    React.useEffect(()=>{
        setWidth(ref.current!.clientWidth);
    })
    const handleRightArrow = ()=>{
        dispatch(moveRight())
    }

    const handleLeftArrow = ()=>{
        dispatch(moveLeft())
    }

    React.useEffect(()=>{
        return ()=>{
            dispatch(clearCurrentImageAndImages())
        }
    },[dispatch])

    return ( 
        <>
            <div ref={ref}>
                <img alt={currentImage?.key} src={currentImage?.url} key={currentImage?.key} style={{height:'100vh'}}/>
                {
                    images.length > 1
                    &&
                    <NavContainer style={{width:width}}>
                        <div className='left-side' onClick={handleLeftArrow}>
                        </div>
                        <div className='right-side' onClick={handleRightArrow}>
                        </div>
                    </NavContainer>
                }
            </div>
            
        </>
     );
}

export default ImageCarousel;