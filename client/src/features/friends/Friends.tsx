import * as React from 'react';


function Friends() {

    React.useEffect(()=>{
        document.title='Friends';
    },[])

    return ( 
        <>
            Friends
        </>
     );
}

export default Friends;