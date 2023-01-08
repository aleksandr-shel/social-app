import * as React from 'react';
import { Button } from 'react-bootstrap';
import { clearCurrentImageAndImages, moveLeft, moveRight } from '../../app/stores/slices/imagesSlices';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import ImageComponent from './ImageComponent';


function ImageCarousel() {
    const {images} = useAppSelector(state=>state.imagesReducer);
    const dispatch = useAppDispatch();

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
            <ImageComponent/>
            {
                images.length > 1
                &&
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button className='btn btn-outline-primary' variant='outline' onClick={handleLeftArrow}>
                        {'<'}
                    </Button>
                    <Button className='btn btn-outline-primary' variant='outline' onClick={handleRightArrow}>
                        {'>'}
                    </Button>
                </div>
            }
        </>
     );
}

export default ImageCarousel;