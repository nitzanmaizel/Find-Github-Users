import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

export default function Repos({ userRepos }) {
	return userRepos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
}

Repos.prototype = {
	repos: PropTypes.object.isRequired,
};
