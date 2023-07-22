import * as React from 'react';
import { Group } from '../../app/models/Group';

interface Props{
    group:Group
}

function GroupItem({group}:Props) {
    return ( 
        <>
            <img src={group.image}/>
        </>
     );
}

export default GroupItem;