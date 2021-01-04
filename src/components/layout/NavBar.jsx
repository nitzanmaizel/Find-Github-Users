import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// 2. Distracting the OBJ from props ==>

const NavBar = ({ icon, title }) => {
	// // 1. Distracting the OBJ from props  ==>
	// const { icon, title } = props;

	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

NavBar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
};

NavBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default NavBar;
