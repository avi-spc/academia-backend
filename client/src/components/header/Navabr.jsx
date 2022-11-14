import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../reduxStore/actions/auth';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = ({ logout, auth: { account } }) => {
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setShowProfileDropdown(false);
	}, [location]);

	return (
		<div className="navbar-parent">
			<div className="navbar">
				<Link to="/">
					<div className="navbar__logo">academia</div>
				</Link>
				<div className="navbar__profile">
					<span className="account-name text-medium-SB">{account.name}</span>
					<div
						className="navbar__account"
						onClick={() => setShowProfileDropdown(!showProfileDropdown)}
					></div>
					{showProfileDropdown && (
						<div className="navbar__logout text-medium-SB" onClick={logout}>
							Logout
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
