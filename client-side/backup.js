
<div>
	<Container fluid>
		<Navbar className="ground-nav" light toggleable full>
			<NavbarBrand href="/home">STEAMPACK</NavbarBrand>
			<Nav className="ml-auto" >
				<NavItem>
					<NavLink tag={Link} to="/game_register">Game Register</NavLink>
				</NavItem>
				<NavItem>
					{this.props.isLoggedIn ? logout : undefined}
				</NavItem>
			</Nav>
		</Navbar>
	</Container>
</div>
