import { connect } from 'react-redux';

import { logout } from '../../reduxStore/actions/auth';

const Navbar = ({ logout }) => {
	return (
		<div className="navbar">
			<div>
				<div className="navbar__logo">academia</div>
			</div>
			<div className="navbar__logout text-large-M" onClick={logout}>
				Logout
			</div>
			<div className="navbar__account"></div>
		</div>
	);
};

export default connect(null, { logout })(Navbar);
