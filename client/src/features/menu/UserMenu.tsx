import { Button, ClickAwayListener, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';
import { logout } from '../../app/stores/slices/userSlice';
import LoginIcon from '@mui/icons-material/Login';
function UserMenu() {
    const dispatch = useAppDispatch();
    const [anchorUserMenuBtn, setAnchorUserMenuBtn] = React.useState<null | HTMLElement>(null);
    const openUserMenu = Boolean(anchorUserMenuBtn);
    const navigate = useNavigate();
    const {user} = useAppSelector(state=>state.userReducer);

    const handleClickUserMenuBtn = (event:React.MouseEvent<HTMLElement>)=>{
        setAnchorUserMenuBtn(anchorUserMenuBtn ? null : event.currentTarget);
    }

    const handleClickAway = ()=>{
        setAnchorUserMenuBtn(null);
    }

    const signOutClick = ()=>{
        dispatch(logout())
        navigate('/')
    }

    return ( 
        <>
            {
                user !== null ?
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <Button onClick={handleClickUserMenuBtn}>
                            <AccountCircleIcon/>
                            🢓
                        </Button>
                        <Popper open={openUserMenu} anchorEl={anchorUserMenuBtn} placement='bottom-end'>
                            <Paper sx={{ width: 320, maxWidth: '100%'}}>
                                <MenuList>
                                    <MenuItem component={Link} to={`profile/${user?.username}`}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText>Profile</ListItemText>
                                    </MenuItem>
                                    {/* <MenuItem component={Link} to='settings'>
                                        <ListItemIcon>
                                            <SettingsIcon/>
                                        </ListItemIcon>
                                        <ListItemText>Settings</ListItemText>
                                    </MenuItem>
                                    <MenuItem component={Link} to='help'>
                                        <ListItemIcon>
                                            <HelpIcon/>
                                        </ListItemIcon>
                                        <ListItemText>Help</ListItemText>
                                    </MenuItem> */}
                                    <Divider />
                                    <MenuItem onClick={signOutClick}>
                                        <ListItemIcon>
                                            <ExitToAppIcon/>
                                        </ListItemIcon>
                                        <ListItemText>Sign Out</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </Popper>
                    </div>
                </ClickAwayListener>
                :
                <MenuList style={{display:'flex'}}>
                    <MenuItem component={Link} to="/">
                        <ListItemIcon>
                            <LoginIcon/>
                        </ListItemIcon>
                        <ListItemText>Login/Register</ListItemText>
                    </MenuItem>
                </MenuList>
            }
        </>
     );
}

export default UserMenu;