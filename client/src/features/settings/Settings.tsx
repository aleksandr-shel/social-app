import * as React from 'react';

function Settings() {

    React.useEffect(()=>{
        document.title = 'Settings';
    },[])

    return ( 
        <>
            Settings
        </>
     );
}

export default Settings;