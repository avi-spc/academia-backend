const Discussion = () => {
	return (
		<div className="discussion text-normal-M">
			<div className="discussion__header">
				<span class="icon icon--light material-symbols-outlined">disc_full</span>
				<div className="discussion__header__student-name">Alex</div>
				<div className="discussion__header__timestamp text-small-M">Posted 12:04 P.M.</div>
			</div>
			<div className="discussion__details">
				<p className="discussion__details__issue">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua.
				</p>
				<div className="individual-comment">
					<div className="individual-comment__avatar"></div>
					<div className="individual-comment__student-name">Bilaal</div>
					<p className="individual-comment__text text-small-M">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
				<form className="discussion__details__comment-input">
					<input type="text" placeholder="comment here" className="text-normal-M"/>
					<button className="btn btn--round">POST</button>
				</form>
			</div>
		</div>
	);
};

export default Discussion;
