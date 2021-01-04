import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, CLEAR_USERS, GET_USER, GET_REPOS, SET_LOADING } from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_CLIENT_GITHUB_ID;
	githubClientSecret = process.env.REACT_APP_CLIENT_GITHUB_SECRET;
} else {
	githubClientId = process.env.CLIENT_GITHUB_ID;
	githubClientSecret = process.env.CLIENT_GITHUB_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		userRepos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users ==>
	const searchUsers = async (text) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&clinet_id=${githubClientId}&clinet_secret=${githubClientSecret}`
		);

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Get User ==>
	const getUser = async (login) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${login}?clinet_id=${githubClientId}&clinet_secret=${githubClientSecret}`
		);

		dispatch({ type: GET_USER, payload: res.data });
	};

	// Get Repos ==>

	const getUserRepos = async (login) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${login}/repos?per_page=5&created:asc&clinet_id=${githubClientId}&clinet_secret=${githubClientSecret}`
		);

		dispatch({ type: GET_REPOS, payload: res.data });
	};

	// Clear Users ==>
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set loading ==>
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				userRepos: state.userRepos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
