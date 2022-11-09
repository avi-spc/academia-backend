import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './header/Navabr';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !loading) {
			navigate('/');
		}
	}, [isAuthenticated, loading]);

	return (
		isAuthenticated && (
			<Fragment>
				<Navbar />
				<Outlet />
			</Fragment>
		)
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
