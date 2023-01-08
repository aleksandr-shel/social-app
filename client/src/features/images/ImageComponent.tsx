import * as React from 'react';
import { useAppSelector } from '../../app/stores/store';


function ImageComponent() {
    const {currentImage} = useAppSelector(state=>state.imagesReducer);
    return ( 
        <div style={{overflow:'hidden', display:'flex', justifyContent:'center'}}>
            <img alt={currentImage?.key} src={currentImage?.url} key={currentImage?.key} height={400}/>
        </div>
     );
}

export default ImageComponent;