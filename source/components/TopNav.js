import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import { ActionSearch } from 'material-ui/lib/svg-icons';
import Badge from 'material-ui/lib/badge';

export class TopNav extends Component {
	render() {
		const style = {
			menuBtn: {
				color: "#444",
				fontWeight: 'bold',
				display: 'inline-block'
			},
			search: {
				width: '160px',
				fontSize: '12px'
			},
			inputStyle: {
				color: "#fff"
			},
			badgeStyle: {
				padding: '0 20px 0 0'
			}
		}
		return (
			<div className='top-nav'>
				<div className='logo'>SOF订阅</div>
				<div className='menuList'>
					<ul>
						<li><a href='/'>首页</a></li>
						<li><a href='/'>个性化订阅</a></li>
						<li>
							<a href='/list'>
								<Badge
							      badgeContent={4}
							      primary={true}
							      style={ style.badgeStyle }
							    >
							     <span>我的报告</span>
							    </Badge>
							</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default TopNav;