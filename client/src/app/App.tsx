import React, { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import NotFound from '../features/errors/NotFound';
import Friends from '../features/friends/Friends';
import Groups from '../features/groups/Groups';
import Help from '../features/help/Help';
import Main from '../features/Main';
import Messages from '../features/messages/Messages';
import MessagesPanel from '../features/messages/MessagesPanel';
import News from '../features/news/News';
import Profile from '../features/profile/Profile';
import Settings from '../features/settings/Settings';
import Layout from './layout/Layout';
import { current } from './stores/actions/userActions';
import { setToken } from './stores/slices/userSlice';
import { useAppDispatch, useAppSelector } from './stores/store';

function App() {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(state => state.userReducer);
	useEffect(()=>{
		const savedToken = window.localStorage.getItem('ridiculum-token');
		if (savedToken){
			dispatch(setToken(savedToken));
			dispatch(current())
		}
	},[dispatch])


	return (
		<>
			<Routes>
				<Route path='/' element={user !== null ? <Layout/> : <Main/>}>
					<Route path='*' element={<NotFound/>}/>
					<Route index element={<Navigate to="/news" />}/>
					<Route path='profile' element={<Profile/>}/>
					<Route path='news' element={<News/>}/>
					<Route path='messages' element={<MessagesPanel/>}/>
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
