const StudyMaterial = () => {
	return (
		<div className="study-material text-normal-M">
			<div className="study-material__header">
				<span className="icon icon--light material-symbols-outlined">description</span>
				<div className="study-material__header__title">Lecture 101</div>
				<div className="study-material__header__timestamp text-small-M">
					Posted 12:04 PM
				</div>
			</div>
			<div className="study-material__details">
				<button className="btn btn--round">Download</button>
			</div>
		</div>
	);
};

export default StudyMaterial;
