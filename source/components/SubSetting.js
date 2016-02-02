import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { addSubscribeAction, coverSubscribeAction } from '../actions';
import _ from 'lodash';

export class SubSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			ind: [],
			indVaule: '',
			types: [],
			typeValue: '',
			typeDisabled: true,
			tag: [],
			tagValue: '',
			tagDisabled: true,
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		const $this = this;
		fetch('/apis/ind').then(res => res.json()).then(ind => this.setState({
			ind: ind
		}) )

		setInterval( () => {
			fetch('/apis/list/1').then(res => res.json()).then(list => {
				dispatch(coverSubscribeAction( list ));
			})
		}, 5000 );
	}

	handleIndChange(evt, index, value) {
		this.setState({
			indValue: value
		});

		fetch('/apis/type/' + value).then(res => res.json()).then(type => {
			this.setState({
				types: type,
				typeValue: '',
				typeDisabled: false,
				tagValue: '',
				tagDisabled: true
			})
		})
	}

	handleTypeChange(evt, index, value) {
		this.setState({
			typeValue: value
		});

		fetch('/apis/tag/' + value).then(res => res.json()).then(tag => {
			this.setState({
				tag: tag,
				tagValue: '',
				tagDisabled: false
			})
		})
	}
	handleTagChange(evt, index, value) {
		this.setState({
			tagValue: value 
		});
	}

	handleClose() {
		this.setState({
			open: false,
			indValue: '',
			tagValue: '',
			typeValue: ''
		});
	}
	handleOpen() {
		this.setState({
			open: true
		});
	}

	handleSubmit() {
		console.log(this.props);
		const id = this.props.user.id;
		const indname = this.state.indValue;
		const typename = this.state.typeValue;
		const tagname = this.state.tagValue;
		const $this = this;
		const { dispatch } = this.props;

		fetch('/apis/create?' + _.chain({ id,indname,typename,tagname }).toPairs().map(x => x.join('=')).value().join('&') )
			.then(res => res.json())
			.then(result => {
				if(result.success) {
					dispatch(addSubscribeAction( result.payload ));
					$this.handleClose();
				}else{
					alert('新建失败');
				}
			})
	}

	render() {
		const actions = [
				<FlatButton
					label="取消"
					secondary={true}
					onTouchTap={this.handleClose.bind(this)}
				/>,
				<FlatButton
					label="添加"
					primary={true}
					keyboardFocused={true}
					onTouchTap={this.handleSubmit.bind(this)}
				/>,
			  ];
		const indItem = [];
		const typeItem = [];
		const tagItem = [];
		this.state.ind.map( (ind,i) => indItem.push(<MenuItem value={ind.indname} key={i} primaryText={ind.indname}/>));
		this.state.types.map( (ind,i) => typeItem.push(<MenuItem value={ind.typename} key={i} primaryText={ind.typename}/>));
		this.state.tag.map( (ind,i) => tagItem.push(<MenuItem value={ind.tagname} key={i} primaryText={ind.tagname}/>))

		const style = {
				customContentStyle:{
					width: '80%',
					maxWidth: 'none',
				},
				auto: {
					height: '200px;',
					overflow: 'scroll'
				}
			};
		const getItemContainer = (item) => {
			return  <div>
						<span>{item.indname} {item.typename} {item.tagname}</span>
						<span className='float-r'>{(() => {
							switch(item.process) {
								case '0':
									return '等待处理..';
									break;
								case '1':
									return '竞品准备中..';
									break;
								case '2':
									return '人群准备中..';
									break;
								default:
									return '未启用';
									break;
							}
						})()}</span>
					</div>
		}
		return (
			<Paper zDepth={1} className='setting-panel'>
				<RaisedButton label="添加订阅" primary={true} onTouchTap={this.handleOpen.bind(this)} />
				<List>
					{
						this.props.subList.map( (subscribe, i) => {
							return <ListItem
									key={i}
							        primaryText={ getItemContainer(subscribe) }
							        onTouchTap={ () => { window.location.href = '/item/'+subscribe.id } }
							        rightIcon={<NavigationChevronRight />} />;
						})
					}
				</List>

				<Dialog
					title="添加订阅"
					actions={actions}
					open={this.state.open}
					model={true}
				>
					<SelectField
			          value={this.state.indValue}
			          onChange={this.handleIndChange.bind(this)}
			          floatingLabelText="行业"
			        >
			          {indItem}
			        </SelectField><br />
			        <SelectField
			          value={this.state.typeValue}
			          disabled={this.state.typeDisabled}
			          onChange={this.handleTypeChange.bind(this)}
			          floatingLabelText="类型"
			        >
			          {typeItem}
			        </SelectField><br />
			        <SelectField
			          value={this.state.tagValue}
			          disabled={this.state.tagDisabled}
			          onChange={this.handleTagChange.bind(this)}
			          floatingLabelText="标签"
			        >
			          {tagItem}
			        </SelectField>
				</Dialog>
			</Paper>
		)
	}
}

SubSetting.propTypes = {
	user: PropTypes.object,
	list: PropTypes.array
}


function selector(state) {
	return {
		user: state.user,
		subList: state.list
	}
}

export default connect(selector)(SubSetting);