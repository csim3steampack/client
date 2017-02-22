const teamDisplay = (
	teamData => teamData.map(
		function teamdisplay(team) {
			const style = {
				backgroundImage: `url(${team.teamImgUrl})`,
				backgroundSize: 'cover',
				overflow: 'hidden',
			};

			const color = {
				color: 'darkgrey',
			};

			return (
				<Col md="3" key={team.id} >
					<div className="team-display" style={style}>
						<Link
							to="/ground_display"
							style={color}
							className="teamview-link"
							onClick={() => this.props.handleClick(team.team)}
						>
							{team.team}
						</Link>
					</div>
				</Col>
			);
		},
));
