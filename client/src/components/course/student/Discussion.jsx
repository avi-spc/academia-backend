const Discussion = () => {
	return (
		<div className="discussion">
			<div className="discussion__header">
				<span className="discussion__header__icon"></span>
				<div className="discussion__header__student-name"></div>
				<div className="discussion__header__timestamp"></div>
			</div>
			<div className="discussion__details">
				<div className="discussion__details__issue"></div>
				<div className="individual-comment">
					<div className="individual-comment__avatar"></div>
					<div className="individual-comment__student-name"></div>
					<div className="individual-comment__text"></div>
				</div>
				<form className="discussion__details__comment-input">
					<input type="text" placeholder="comment here" />
					<button>POST</button>
				</form>
			</div>
		</div>
	);
};

export default Discussion;
