import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../stores/store';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { closeModal } from '../stores/slices/imageModalSlice';
const Div = styled.div`
    position: fixed;
    z-index: 1000;
    width: 100vw;
    display: flex;
    justify-content: center;
    .hidden{
        display: none;
    }

    .btn-cross{
        width:fit-content;
        position: absolute;
        z-index: 1001;
        top:0;
        right: 30px;
    }
    .btn-cross:hover{
        cursor: pointer;
    }
`

function ImageModalContainer() {

    const {body, open} = useAppSelector(state => state.imageModalReducer)
    const dispatch = useAppDispatch();
    return ( 
        <Div onClick={()=>dispatch(closeModal())}>
            <div onClick={(e)=>e.stopPropagation()} className={open ? '' : 'hidden'}>
                <div className='btn-cross' onClick={()=>dispatch(closeModal())}>
                    <CloseIcon/>
                </div>
                {body}
            </div>
        </Div>
     );
}

export default ImageModalContainer;