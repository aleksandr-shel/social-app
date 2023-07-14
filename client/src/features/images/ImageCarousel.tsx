import * as React from 'react';
import { clearCurrentImageAndImages, moveLeft, moveRight } from '../../app/stores/slices/imagesSlices';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import styled from 'styled-components';


const LeftBtn = styled.div`
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1000;
    border-radius: 50%;
    font-size: 120px;
    cursor: pointer;
    width: 200px;
    height: 200px;
    text-align: center;
    background-color: #D3D3D3;
    margin: auto 0;
    transform: translateY(-50%);
    opacity: 0.3;
    &:hover{
        background-color: #C0C0C0;
    }
`

const RightBtn = styled.div`
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none;
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 1000;
    border-radius: 50%;
    font-size: 120px;
    cursor: pointer;
    width: 200px;
    height: 200px;
    text-align: center;
    background-color: #D3D3D3;
    margin: auto 0;
    transform: translateY(-50%);
    opacity: 0.3;
    &:hover{
        background-color: #C0C0C0;
    }
`

function ImageCarousel() {
    const {images, currentImage} = useAppSelector(state=>state.imagesReducer);
    const dispatch = useAppDispatch();
    const ref = React.useRef<HTMLDivElement>(null);
    // const [width, setWidth] = React.useState(0);

    // React.useEffect(()=>{
    //     setWidth(ref.current!.clientWidth);
    // })

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
                    <>
                        <LeftBtn onClick={handleLeftArrow}>
                            {'<'}
                        </LeftBtn>
                        <RightBtn onClick={handleRightArrow}>
                            {'>'}
                        </RightBtn>
                    </>
                }
            </div>
            
        </>
     );
}

export default ImageCarousel;