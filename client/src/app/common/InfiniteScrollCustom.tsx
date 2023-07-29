import * as React from 'react';

interface Props {
    loadMore: ()=>void,
    children:React.ReactNode
}

function InfiniteScrollCustom({loadMore,children}:Props) {

    const [innerHeight, setInnerHeight] = React.useState(0);
    const [scrollY, setScrollY] = React.useState(0);
    const [offsetHeight, setOffsetHeight] = React.useState(0);
    // React.useEffect(()=>{
    //     let scrollHandler = ()=>{
    //         if (window.innerHeight + window.scrollY>= document.body.offsetHeight) {
    //             loadMore();
    //         }
    //     }
    //     window.addEventListener('scroll',scrollHandler)
    //     return ()=>{
    //         window.removeEventListener('scroll',scrollHandler)
    //     }
    // },[loadMore])

    React.useEffect(()=>{
        const onScroll = ()=>{
            setOffsetHeight(document.body.offsetHeight);
            setScrollY(window.scrollY);
            setInnerHeight(window.innerHeight);
            console.log('dsadsadsad')
        }
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    },[])

    React.useEffect(()=>{
        if (innerHeight + scrollY >= offsetHeight - 1){
            loadMore();
        }
    },[innerHeight,scrollY,offsetHeight])

    return (
        <>
            {children}
        </>
    );
}

export default InfiniteScrollCustom;