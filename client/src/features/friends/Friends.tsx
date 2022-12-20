import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import ProfileList from '../../app/common/ProfileList';
import { getFollows } from '../../app/stores/actions/friendsActions';
import { useAppDispatch, useAppSelector } from '../../app/stores/store';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function Friends() {

    const {friends, followers, followings} = useAppSelector(state => state.friendsReducer);
    const dispatch = useAppDispatch();

    React.useEffect(()=>{
        document.title='Friends';
		dispatch(getFollows())
    },[dispatch])

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return ( 
        <>
			<Grid container>
				<Grid item xs={6}>
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Friends" {...a11yProps(0)} />
								<Tab label="Followers" {...a11yProps(1)} />
								<Tab label="Followings" {...a11yProps(2)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<ProfileList profiles={friends}/>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<ProfileList profiles={followers}/>
						</TabPanel>
						<TabPanel value={value} index={2}>
							<ProfileList profiles={followings}/>
						</TabPanel>
					</Box>
				</Grid>
			</Grid>
        </>
     );
}

export default Friends;