import { connect } from 'react-redux';

import { removeAlert } from '../reduxStore/actions/alert';

const Alert = ({ removeAlert, alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 && (
			<div className="alerts-group">
				{alerts.map((alert) => (
					<div className={`alert ${alert.category}`} key={alert.id}>
						<span className="material-symbols-outlined">
							{alert.category === 'success' ? 'check_circle' : 'block'}
						</span>
						<span className="text-medium-M">{alert.message}</span>
						<span
							className="material-symbols-outlined symbol--md alert__btn-close"
							onClick={() => removeAlert(alert.id)}
						>
							close
						</span>
					</div>
				))}
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert })(Alert);
