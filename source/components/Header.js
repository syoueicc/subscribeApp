import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import UserNav from './UserNav';
import TopNav from './TopNav';

export class Header extends Component {
	render() {
		return (
			<AppBar title={ <TopNav /> }
					iconElementRight={<UserNav />}
					iconStyleRight={ {marginTop: "14px", marginRight: '0px', fontSize: '12px'} }
					showMenuIconButton={false} />
		)
	}
}

export default Header;