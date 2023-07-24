import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { loadSelectedGroup } from '../../app/stores/actions/groupsActions';
import styled from 'styled-components';
import { Grid } from '@mui/material';


const CustomBtn = styled.button`
    cursor: pointer;
    background-color: #0072b1;
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

const GroupPageDiv = styled.div`
    margin-top:0.5em;
    .cover-section{
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        overflow: hidden;
    }
    .cover-section img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .about-section{
        display: flex;
    }

    .avatar{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        top: -100px;
        border: 5px solid white;
        background-color: #EAEAEA;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .info{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1em;
    }

    .category{
        font-size: smaller;
    }
`

function GroupPage() {

    const {groupId} = useParams();
    const dispatch = useAppDispatch();
    const {selectedGroup} = useAppSelector(state => state.groupReducer);
    
    React.useEffect(()=>{
        if (groupId && groupId !== selectedGroup?.id){
            dispatch(loadSelectedGroup(groupId))
        }
    }, [groupId, dispatch, selectedGroup?.id])

    if (selectedGroup === null) return null

    return ( 
        <>
            <Grid container>
                <Grid item xs={10}>
                    <GroupPageDiv>
                        <div className='cover-section'>
                            <img src={selectedGroup.backgroundImage ? selectedGroup.backgroundImage : '/cover.jpg'} alt={selectedGroup.name}/>
                        </div>
                        <div className='about-section'>
                            <div className='avatar'>
                                {
                                    selectedGroup.image ?
                                    <img src={selectedGroup.image} alt={selectedGroup.name}/>
                                    :
                                    <div style={{fontSize:'xxx-large', fontWeight:'bolder'}}>
                                        {selectedGroup.name.slice(0,1)}
                                    </div>
                                }
                            </div>
                            <div className='info'>
                                <h1>
                                    {selectedGroup.name}
                                </h1>
                                <div className='category'>
                                    {selectedGroup.category}
                                </div>
                                <p>
                                    {selectedGroup.description}
                                </p>
                                <div>
                                    {
                                        selectedGroup.isAdmin ?
                                        <CustomBtn>
                                            Edit
                                        </CustomBtn>
                                        :
                                        <CustomBtn>
                                            Follow
                                        </CustomBtn>
                                    }
                                </div>
                                <div style={{display:'flex', color:'gray',fontWeight:'bold'}}>
                                    <div style={{marginRight:'1em'}}>
                                        <span style={{color:'#01579b'}}>
                                            {selectedGroup.followers}
                                        </span>
                                        {' '}
                                        followers
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GroupPageDiv>
                </Grid>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
        </>
     );
}

export default GroupPage;