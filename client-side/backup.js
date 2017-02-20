<Container>
	<h3 className="profileView-header">프로필 등록</h3>
	<Row>
		<Col md="1" />
		<Col md="10" className="profileView-container">
			<input type="file" />
			<div>Username</div>
			<input
				name="name"
				type="text"
				className="test-game"
				value={this.state.name}
				onChange={this.handleChange}
			/>
			<div>Team Name</div>
			<input
				name="teamName"
				type="text"
				className="test-game"
				value={this.state.teamName}
				onChange={this.handleChange}
			/>
			<div>Position</div>
			<input
				name="position"
				type="radio"
				value="FW"
				onChange={this.handleChange}
			/>FW
			<input
				name="position"
				type="radio"
				value="MF"
				onChange={this.handleChange}
			/>MF
			<input
				name="position"
				type="radio"
				value="DF"
				onChange={this.handleChange}
			/>DF
			<input
				name="position"
				type="radio"
				className="test-game"
				value="GK"
				onChange={this.handleChange}
			/>GK
			<div>Member State</div>
			<input
				name="leaderState"
				type="radio"
				className="test-game"
				value="1"
				onChange={this.handleChange}
			/>leader
			<input
				name="leaderState"
				type="radio"
				className="test-game"
				value="0"
				onChange={this.handleChange}
			/>member
			<div>Height(cm)</div>
			<input
				name="height"
				type="text"
				className="test-game"
				value={this.state.height}
				onChange={this.handleChange}
			/>
			<div>Foot(right or left)</div>
			<input
				name="foot"
				type="radio"
				className="test-game"
				value="right"
				onChange={this.handleChange}
			/>right
			<input
				name="foot"
				type="radio"
				className="test-game"
				value="left"
				onChange={this.handleChange}
			/>left
			<input
				name="foot"
				type="radio"
				className="test-game"
				value="both"
				onChange={this.handleChange}
			/>both
			<Button onClick={this.handleProfile}>저장하기</Button>
		</Col>
		<Col sm="1" />
	</Row>
</Container>
