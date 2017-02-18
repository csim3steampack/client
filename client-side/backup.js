export function groundDisplayRequest(tempTeam) {
	return (dispatch) => {
		dispatch(groundDisplay());
		const url = `http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/ground_display/?teamA=codestates&teamB=${tempTeam}`;
		return axios.get(url).then((response) => {
			dispatch(groundDisplaySuccess(response.data));
		})
    .catch(() => {
	dispatch(groundDisplayFailure());
});
	};
}

componentDidMount() {
	const component = this;
	this.props.groundDisplayRequest(this.props.teamPlayerName)
	.then(
		() => {
const homeArray = [];
const awayArray = [];

for (let i = 0; i < this.props.teamMembers.length; i += 1) {
	const teamMembers = this.props.teamMembers;
	if (teamMembers[i].team === this.props.teamPlayerName) {
		homeArray.push(teamMembers[i].name);
	} else {
		awayArray.push(teamMembers[i].name);
	}
}
component.setState({
	userMembers: homeArray,
	awayMembers: awayArray,
});
},
);
}


//id, username, team, position, learder, height, foot
