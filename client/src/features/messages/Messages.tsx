import * as React from 'react';

function Messages() {
    React.useEffect(()=>{
        document.title = 'Messages';
    },[])
    return ( 
        <>
            Messages
        </>
     );
}

export default Messages;