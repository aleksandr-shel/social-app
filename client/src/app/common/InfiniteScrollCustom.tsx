import * as React from 'react';

interface Props {
    loadMore: ()=>void,
    children:React.ReactNode
}

function InfiniteScrollCustom({loadMore,children}:Props) {

    React.useEffect(()=>{
        let scrollHandler = ()=>{
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
                loadMore();
            }
        }
        window.addEventListener('scroll',scrollHandler)
        return ()=>{
            window.removeEventListener('scroll',scrollHandler)
        }
    },[loadMore])
    return (
        <>
            {children}
        </>
    );
}

export default InfiniteScrollCustom;