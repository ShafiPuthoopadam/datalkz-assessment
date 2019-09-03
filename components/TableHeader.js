
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Modal,
  Input
} from 'antd';
import { addNewUser } from '../actions/tableSettingsAction';

class TableHeader extends Component {
  state = {
    visible: false,
    userName: '',
    userEmail: ''
  };

  addNewUser = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const _userKeys = [...this.props.users].map(_data => Number(_data.key));
    const _highestKey = Math.max.apply(null, Object.values(_userKeys));
    this.props.handleAddNewUser({
      "key": (_highestKey + 1),
      "name": this.state.userName,
      "email": this.state.userEmail
    });
    this.setState({
      visible: false,
      userName: '',
      userEmail: ''
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      userName: '',
      userEmail: ''
    });
  };

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { userName, userEmail, visible } = this.state;
    const { users } = this.props;
    return(
      <Col span={20} style={{ paddingTop: '15px', paddingBottom: '5px' }}>
        <Row justify="space-around" type="flex">
          <Col span={12} md={12} xs={24}>
            <span>Total no. of Users is {users.length}</span>
          </Col>
          <Col span={12} md={12} xs={0}>
            <span className="ml-30 float-right">
              <Button onClick={this.addNewUser}>Add User</Button>
            </span>
          </Col>
        </Row>
        <Modal
          title="Add new user"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            <Input 
              placeholder="Enter your name"
              name="userName" 
              value={userName} 
              onChange={this.changeValue}/>
            </p>
          <p>
            <Input 
              placeholder="Enter your mail" 
              name="userEmail"
              value={userEmail} 
              onChange={this.changeValue}/>
          </p>
        </Modal>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  users: state.tableSettings.userData
});

const mapDispatchToProps = dispatch => ({
  handleAddNewUser: user => {
    dispatch(addNewUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
          