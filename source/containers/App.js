import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { testAction } from '../actions';
import config from '../../config';

import Header from '../components/Header';
import IndexMain from '../components/IndexMain';
import Footer from '../components/Footer';

export class App extends Component {
	render() {
		const child = () => {
			if(!!context) {
				return <context />;
			}else {
				return <IndexMain />;
			}
		}
		return (
			<div>
				<Header />
				<IndexMain />
				<Footer />
			</div>
		)
	}
}


export default App;