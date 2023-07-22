import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { loadGroups } from '../../app/stores/actions/groupsActions';


function Groups() {

    const {groups} = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        document.title='Groups';

        dispatch(loadGroups());
    },[dispatch])
    return ( 
        <>
            {
                groups.map((group, index)=>{
                    return(
                        <>
                            {
                                group.image
                            }
                        </>
                    )
                })
            }
        </>
     );
}

export default Groups;