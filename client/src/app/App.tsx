import React, { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import NotFound from '../features/errors/NotFound';
import FavoriteList from '../features/favorite/FavoriteList';
import Friends from '../features/friends/Friends';
import Main from '../features/Main';
import MessagesPanel from '../features/messages/MessagesPanel';
import News from '../features/news/News';
import Profile from '../features/profile/Profile';
import SearchResults from '../features/search/SearchResults';
import ModalContainer from './common/ModalContainer';
import Layout from './layout/Layout';
import { createHubConnection } from './stores/actions/messagesActions';
import { current } from './stores/actions/userActions';
import { stopHubConnection } from './stores/slices/messagesSlice';
import { setToken } from './stores/slices/userSlice';
import { useAppDispatch, useAppSelector } from './stores/store';
import ImageModalContainer from './common/ImageModalContainer';
import Images from '../features/profile/Images/Images';
import FollowersPage from '../features/profile/FollowersPage';
import Groups from '../features/groups/Groups';

function App() {
	const dispatch = useAppDispatch();
	const {user} = useAppSelector(state => state.userReducer);
	useEffect(()=>{
		const savedToken = window.localStorage.getItem('netverse-token');
		if (savedToken){
			dispatch(setToken(savedToken));
			dispatch(current())
		}
		dispatch(createHubConnection())
		return ()=>{
			dispatch(stopHubConnection())
		}
	},[dispatch, user?.token])


	return (
		<>
			<ToastContainer autoClose={8000} hideProgressBar position='bottom-right'/>
			<ModalContainer/>
			<ImageModalContainer/>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route path='profile/:username' element={<Profile/>}/>
				</Route>
				<Route path='/' element={user !== null ? <Layout/> : <Main/>}>
					<Route path='*' element={<NotFound/>}/>
					<Route index element={<Navigate to="/news" />}/>
					<Route path='profile/:username' element={<Profile/>}/>
					<Route path='profile/:username/images' element={<Images/>}/>
					<Route path='profile/:username/followers' element={<FollowersPage/>}/>
					<Route path='news' element={<News/>}/>
					<Route path='messages' element={<MessagesPanel/>}/>
					{/* <Route path='settings' element={<Settings/>}/>
					<Route path='help' element={<Help/>}/> */}
					<Route path='friends' element={<Friends/>}/>
					<Route path='favorite' element={<FavoriteList/>}/>
					<Route path='groups' element={<Groups/>}/>
					<Route path='search' element={<SearchResults/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
