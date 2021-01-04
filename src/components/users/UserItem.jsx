import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// 2. Distracting the user OBJ from props ==>
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
	// 1. Distracting the user OBJ from props  ==>
	// const { login, avatar_url, html_url } = props.user;
	return (
		<div className='card text-center'>
			<img src={avatar_url} alt={login} className='round-img' style={{ width: '60px' }} />
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className='btn-dark btm-sm my-1'>
					More
				</Link>
			</div>
		</div>
	);
};

UserItem.prototype = {
	user: PropTypes.object.isRequired,
};

export default UserItem;
