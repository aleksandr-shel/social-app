import * as React from 'react';
import { Group } from '../../app/models/Group';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/stores/store';
import { selectGroup } from '../../app/stores/slices/groupsSlice';
import { toggleFollowGroupAction } from '../../app/stores/actions/groupsActions';

interface Props{
    group:Group
}

const GroupItemDiv = styled.div`
    display: flex;
    background-color: white;
    border-radius: 15px;
    margin: 0.5em;
    padding: 0.5em;
    border: 0.5px solid  #D3D3D3;
    justify-content: space-between;
    &:hover{
        box-shadow: 0 0 2px black;
    }
    .image{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #D3D3D3;
    }

    .image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .group-info{
        margin-left: 1em;
    }
`

const CustomBtn = styled.button`
    cursor: pointer;
    border:0;
    border-radius: 20px;
    color:white;
    padding: 0.5em 0.5em;
    margin: 0.5em;
    font-weight: bold;
    position: relative;
    min-width: 180px;
    white-space: nowrap;

    &:hover{
        box-shadow: 0 0 10px #0072b1;
    }

    &:active{
        box-shadow: 0 0 30px #0072b1;
    }
`

function GroupItem({group}:Props) {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleClick(group:Group){
        dispatch(selectGroup(group));
        navigate(`/groups/${group.id}`)
    }

    function handleJoinLeaveBtn(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation()
        dispatch(toggleFollowGroupAction(group.id))
    }

    return ( 
        <GroupItemDiv onClick={()=>handleClick(group)} title={group.description}>
            <div style={{display:'flex'}}>
                <div className='image'>
                    {
                        group.image ?
                        <img src={group.image} alt={group.name}/>
                        :
                        <div style={{fontSize:'xxx-large', fontWeight:'bolder'}}>
                            {group.name.slice(0,1)}
                        </div>
                    }
                </div>
                <div className='group-info'>
                    <h4>
                        {group.name}
                    </h4>
                    <p>
                        {group.category}
                    </p>
                </div>
            </div>
            <div>
                <CustomBtn onClick={handleJoinLeaveBtn} style={{backgroundColor: group.follow ? 'darkred':'#0072b1'}}>
                    {
                        group.follow ?
                        'leave'
                        :
                        'join'
                    }
                </CustomBtn>
            </div>
        </GroupItemDiv>
     );
}

export default GroupItem;