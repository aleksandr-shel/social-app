import React from 'react';
import {Routes, Route} from 'react-router-dom'
import NotFound from '../features/errors/NotFound';
import Friends from '../features/friends/Friends';
import Groups from '../features/groups/Groups';
import Help from '../features/help/Help';
import Main from '../features/Main';
import Messages from '../features/messages/Messages';
import News from '../features/news/News';
import Profile from '../features/profile/Profile';
import Settings from '../features/settings/Settings';
import Layout from './layout/Layout';

function App() {

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route path='*' element={<NotFound/>}/>
					<Route index element={<Main/>}/>
					<Route path='profile' element={<Profile/>}/>
					<Route path='news' element={<News/>}/>
					<Route path='messages' element={<Messages/>}/>
					<Route path='settings' element={<Settings/>}/>
					<Route path='help' element={<Help/>}/>
					<Route path='friends' element={<Friends/>}/>
					<Route path='groups' element={<Groups/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
