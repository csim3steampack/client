this.props.getStatusRequest().then(
	() => {
		if (!this.props.status.valid) {
			loginData = {
				isLoggedIn: false,
				currentUserId: '',
			};
			document.cookie = 'key=' + btoa(JSON.stringify(loginData));
			alert("have a problem");
		}
	}
);
