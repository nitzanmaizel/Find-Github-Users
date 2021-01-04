import React, { useContext } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/githubContext';

// 2. Distracting the OBJ from props  ==>

const Users = () => {
	const githubContext = useContext(GithubContext);
	// // 1. Distracting the OBJ from props  ==>
	// const { users, loading } = props;

	// 3. if loading is true show spinner,
	// Will happen until we get the response ==>

	// 4. Bringing the users and loading from GithubState ==>
	const { loading, users } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div style={userStyle}>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem',
};

export default Users;
