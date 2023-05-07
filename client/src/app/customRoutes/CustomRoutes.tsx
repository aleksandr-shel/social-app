import React from 'react';
import { Router } from 'react-router-dom';

interface Props{
    basename?:string | undefined,
    children: React.ReactNode,
    history:any
}

function CustomRouter({ basename, children, history }:Props) {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
      });
    
    React.useLayoutEffect(() => history.listen(setState), [history]);
    return ( 
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
            children={children}
        />
     );
}

export default CustomRouter;