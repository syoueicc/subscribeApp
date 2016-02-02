import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

export class UserNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  open: false
		};
	}

	handleOpen() {
		this.setState({
			open: true
		});
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	render() {
		return (
			<div>
				<RaisedButton label='登录/注册' onTouchTap={ () => this.handleOpen() } />
				<Dialog
		          title="Dialog With Actions"
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose.bind(this)}>
		          Only actions can close this dialog.
		        </Dialog>
			</div>
		)
	}
}

export default UserNav;