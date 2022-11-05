const TeamMember = () => {
	return (
		<div className="team-member">
			<div className="create-heading">Add team member</div>
			<form>
				<input type="text" placeholder="search student" />
			</form>
			<div>
				<div className="student-avatar"></div>
				<div className="student-name"></div>
				<div className="student-institute-id"></div>
				<button>Add</button>
			</div>
		</div>
	);
};

export default TeamMember;
