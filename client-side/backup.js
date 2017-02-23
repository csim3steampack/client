


const teamDisplay = (
	teamData => teamData.map(
		function teamdisplay(team) {
			const style = {
				backgroundImage: `url(${team.teamImgUrl})`,
				backgroundSize: 'cover',
				overflow: 'hidden',
			};

			return (
				<Col md="3" key={team.id} >
					<div className="team-display" style={style}>
						<Link
							to="/ground_display"
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


const teamDisplay = (
	teamData => teamData.map(team => (
		<Col md="3" key={team.id} >
			<div className="team-display">
				<Link
					to="/ground_display"
					className="teamview-link"
					onClick={() => this.props.handleClick(team.team)}
				>
					{team.team}
				</Link>
			</div>
		</Col>
	),
));
