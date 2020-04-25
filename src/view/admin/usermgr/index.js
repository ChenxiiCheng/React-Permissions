import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Table,
  Button,
  Modal,
  message,
  Avatar,
  Popconfirm,
  Input,
} from 'antd';
import store from '../../../store';
import { LoadUserActionAsync } from '../../../action/userAction';
import AddUser from './addUser';
import EditUser from './editUser';
import { deleteUser } from '../../../service';
import SetRole from './setRole';
import SetPer from './setPer';
// import { loadUserList } from '../../../service';

class UserMgr extends Component {
  state = {
    setPerUser: null,
    showSetPerDialog: false,
    showSetRoleDialog: false, // 显示设置用户角色对话框
    editUserRow: null, // 当前编辑的用户信息 传给EditUser组件 再传给EditUserFormComponent组件
    showEditUserDialog: false, // 显示修改用户的对话框
    showAddUserDialog: false, // 显示添加用户的对话框
    unsubscribe: null,
    selectRowKeys: [],
    setRoleUser: null,
    userList: store.getState().userList.list,
    params: { _page: 1, _limit: 6 },
    total: 0,
    columns: [
      {
        key: 'id',
        title: 'No',
        dataIndex: 'id',
      },
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
      },
      {
        key: 'phone',
        title: 'Phone',
        dataIndex: 'phone',
      },
      {
        key: 'avatar',
        title: 'Avatar',
        dataIndex: 'avatar',
        render: (avatar) => <Avatar src={avatar} />,
      },
      {
        key: 'del',
        title: 'Edit',
        dataIndex: 'del',
        render: (del, row) => {
          return (
            <div>
              <Button
                onClick={() =>
                  this.setState({ showEditUserDialog: true, editUserRow: row })
                }
                type="primary"
                style={{ marginRight: '10px' }}
              >
                Edit
              </Button>
              <Popconfirm
                onConfirm={() => {
                  // message.info(row.id);
                  this.deleteUser(row.id);
                }}
                okText="Confirm"
                cancelText="Cancel"
                title="Are u sure to delete?"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
  };

  //Popconfirm组件的删除操作
  deleteUser = (id) => {
    deleteUser([id])
      .then((res) => {
        store.dispatch(LoadUserActionAsync(this.state.params));
        message.success('Deleted success!');
        let newSelectRowKeys = this.state.selectRowKeys.filter(
          (item) => item !== id
        );
        this.setState({ selectRowKeys: newSelectRowKeys });
      })
      .catch((err) => {
        message.error('Deleted failed, please try again...');
      });
  };

  userListChange = () => {
    const userList = store.getState().userList;
    this.setState({
      userList: userList.list,
      total: userList.total,
    });
  };

  componentDidMount() {
    // 发送ajax请求到后台，获取当前用户的列表数据
    // loadUserList().then((res) => {
    //   this.setState({ userList: res.data });
    // });

    store.dispatch(LoadUserActionAsync(this.state.params));
    const unsubscribe = store.subscribe(this.userListChange);
    this.setState({ unsubscribe: unsubscribe });
  }

  componentWillMount() {
    this.state.unsubscribe && this.state.unsubscribe();
  }

  changePage = (page, pageSize, q = '') => {
    if (!q) {
      q = this.state.params.q;
    }
    // console.log('page:', page, ' pageSize:', pageSize);
    this.setState(
      (preState) => {
        return {
          ...preState,
          ...{ params: { _page: page, _limit: pageSize, q } },
        };
      },
      () => {
        store.dispatch(LoadUserActionAsync(this.state.params));
      }
    );
  };

  // 隐藏添加用户 modal弹框
  hideAddUserDialog = () => {
    this.setState({ showAddUserDialog: false });
  };

  // 隐藏修改用户 modal弹框
  hideEditUserDialog = () => {
    this.setState({ showEditUserDialog: false });
  };

  handleDelete = () => {
    // 拿到所有要删除的数据
    // console.log(this.state.selectRowKeys);
    if (this.state.selectRowKeys.length === 0) {
      message.error('Please select items');
      return;
    }
    Modal.confirm({
      title: 'Are U sure to delete?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        // console.log(this.state.selectRowKeys);
        deleteUser(this.state.selectRowKeys)
          .then((res) => {
            store.dispatch(LoadUserActionAsync(this.state.params));
            message.success('Deleted success!');
            this.setState({ selectRowKeys: [] });
          })
          .catch((err) => {
            message.error('Deleted failed, please try again...');
          });
      },
    });
  };

  handleEdit = () => {
    if (this.state.selectRowKeys.length !== 1) {
      message.error('Please select only one item!');
      return;
    }

    // 拿到要编辑的数据
    const userId = this.state.selectRowKeys[0];
    let editUser = store
      .getState()
      .userList.list.find((item) => item.id === userId);
    // console.log(editUser);
    this.setState({
      showEditUserDialog: true,
      editUserRow: editUser,
    });
  };

  handleSearch = (value) => {
    // 第一步：先把搜索的参数放到state里
    this.setState(
      (preState) => {
        preState.params.q = value;
        return { ...preState };
      },
      () => {
        // 第二步：重新请求当前页数据
        this.changePage(1, 6, value);
      }
    );
  };

  handleSetRole = () => {
    if (this.state.selectRowKeys.length !== 1) {
      message.error('Please select one use to set role!');
      return;
    }
    const setRoleUserId = this.state.selectRowKeys[0];
    const setRoleUser = this.state.userList.find(
      (item) => item.id === setRoleUserId
    );
    // console.log(setRoleUser);
    this.setState({ showSetRoleDialog: true, setRoleUser: setRoleUser });
  };

  hideSetRoleDialog = () => {
    this.setState({ showSetRoleDialog: false });
  };

  handleSetPer = () => {
    if (this.state.selectRowKeys.length !== 1) {
      message.error('Please select one use to set permission!');
      return;
    }
    const setPerUserId = this.state.selectRowKeys[0];
    const setPerUser = this.state.userList.find(
      (item) => item.id === setPerUserId
    );
    // console.log(setRoleUser);
    this.setState({ showSetPerDialog: true, setPerUser: setPerUser });
  };

  hideSetPerDialog = () => {
    this.setState({ showSetPerDialog: false });
  };

  // Button style
  buttonStyle = { margin: '5px' };

  render() {
    // 多选配置参数
    let { selectRowKeys } = this.state;
    let userRowSelection = {
      selectedRowKeys: selectRowKeys,
      onChange: (selectedRowKeys) => {
        // console.log(selectedRowKeys);
        this.setState({ selectRowKeys: selectedRowKeys });
      },
    };
    return (
      <div className="admin-usermgr">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/user_mgr">User Management</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <Button
          onClick={() => this.setState({ showAddUserDialog: true })}
          style={this.buttonStyle}
          type="primary"
        >
          Add
        </Button>

        <Button
          style={this.buttonStyle}
          type="default"
          onClick={this.handleEdit}
        >
          Edit
        </Button>

        <Button
          style={this.buttonStyle}
          type="danger"
          onClick={this.handleDelete}
        >
          Delete
        </Button>
        <Button
          style={this.buttonStyle}
          type="danger"
          onClick={this.handleSetRole}
        >
          Set Role
        </Button>
        <Button
          style={this.buttonStyle}
          type="primary"
          onClick={this.handleSetPer}
        >
          Set Permission
        </Button>
        <Input.Search
          placeholder="Search"
          onSearch={this.handleSearch}
          enterButton
          style={{ margin: '5px', width: '320px' }}
        />
        <Table
          bordered
          style={{ backgroundColor: '#fff' }}
          dataSource={this.state.userList}
          columns={this.state.columns}
          rowSelection={userRowSelection}
          rowKey="id"
          pagination={{
            total: this.state.total,
            pageSize: 6,
            defaultCurrent: 1,
            onChange: this.changePage,
          }}
        />
        <AddUser
          close={this.hideAddUserDialog}
          visible={this.state.showAddUserDialog}
        />
        <EditUser
          visible={this.state.showEditUserDialog}
          close={this.hideEditUserDialog}
          data={this.state.editUserRow}
        />
        {this.state.showSetRoleDialog ? (
          <SetRole
            data={this.state.setRoleUser}
            close={this.hideSetRoleDialog}
            visible={this.state.showSetRoleDialog}
          />
        ) : null}

        {this.state.showSetPerDialog ? (
          <SetPer
            data={this.state.setPerUser}
            close={this.hideSetPerDialog}
            visible={this.state.showSetPerDialog}
          />
        ) : null}
      </div>
    );
  }
}

export default UserMgr;
