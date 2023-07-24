import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { loadGroups } from '../../app/stores/actions/groupsActions';
import GroupItem from './GroupItem';
import styled from 'styled-components';

const GroupsDiv = styled.div`
    max-width: 400px;
    overflow: hidden;
`

function Groups() {

    const {groups} = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        document.title='Groups';

        dispatch(loadGroups());
    },[dispatch])
    return ( 
        <GroupsDiv>
            {
                groups.map((group, index)=>{
                    return(
                        <React.Fragment key={group.id}>
                            <GroupItem group={group}/>
                        </React.Fragment>
                    )
                })
            }
        </GroupsDiv>
     );
}

export default Groups;