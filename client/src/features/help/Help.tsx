import * as React from 'react';


function Help() {

    React.useEffect(()=>{
        document.title = 'Help';
    },[])

    return ( 
        <div>
            Help
        </div>
     );
}

export default Help;