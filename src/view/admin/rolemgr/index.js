import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Table,
  Button,
  Input,
  Tag,
  message,
  Modal,
  Popconfirm,
} from 'antd';
import AddRole from './addRole';
import EditRole from './editRow';
import SetRolePer from './setRolePer';
import { loadRoleList, deleteRoles, addRole, saveRole } from '../../../service';
import { formateDateToString } from '../../../utils/helper';

class RoleMgr extends Component {
  state = {
    editRole: null,
    setRolePer: null,
    showSetRoleDialog: false,
    showAddRoleDialog: false,
    showEditRoleDialog: false,
    selectedRowKeys: [],
    params: {
      _page: 1,
      _limit: 6,
      q: '',
      _sort: 'id',
      _order: 'desc',
    },
    total: 0,
    roleList: [],
    columns: [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'No',
      },
      {
        key: 'name',
        dataIndex: 'name',
        title: 'Role Name',
      },
      {
        key: 'status',
        dataIndex: 'status',
        title: 'Status',
        render: (status, row) => (
          <Tag color="#2db7f5">{status === 0 ? 'Start' : 'Stop'}</Tag>
        ),
      },
      {
        key: 'pId',
        dataIndex: 'pId',
        title: 'Parent Role',
      },
      {
        key: 'subon',
        dataIndex: 'subon',
        title: 'Created Time',
      },
      {
        key: 'del',
        dataIndex: 'del',
        title: 'Operation',
        render: (del, row) => {
          return (
            <div>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                onClick={() => this.handleEdit(row)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are u sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={() => {
                  deleteRoles([row.id])
                    .then((res) => {
                      message.success('Deleted success!');
                      this.loadData();
                      // 重置当前的selectedRowKeys
                      this.setState({
                        selectedRowKeys: this.state.selectedRowKeys.filter(
                          (item) => item !== row.id
                        ),
                      });
                    })
                    .catch((err) => {
                      message.error('Deleted failed...');
                    });
                }}
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
  };

  addRole = (role) => {
    let newRole = Object.assign(
      {
        id: Date.now(),
        del: 0,
        subon: formateDateToString(new Date()),
        status: 0,
      },
      role
    );
    addRole(newRole)
      .then((res) => {
        message.success('Added success!');
        // 关闭对话框
        this.closeAddDialog();
        this.loadData();
      })
      .catch((err) => {
        message.error('Added faile, please try again...');
      });
  };

  handleAdd = () => {
    this.setState({
      showAddRoleDialog: true,
    });
  };

  // close add modal
  closeAddDialog = () => {
    this.setState({
      showAddRoleDialog: false,
    });
  };

  // close edit modal
  closeEditDialog = () => {
    this.setState({ showEditRoleDialog: false });
  };

  // 删除
  handleDelete = () => {
    Modal.confirm({
      title: 'Are u sure to delete?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        // 拿到要删除的数据的id
        // this.state.selectedRowKeys
        deleteRoles(this.state.selectedRowKeys)
          .then((res) => {
            message.success('Deleted success!');
            this.loadData();
            this.setState({ selectedRowKeys: [] });
          })
          .catch((err) => {
            message.error('Deleted failed...');
          });
      },
    });
  };

  handleBarEdit = () => {
    if (this.state.selectedRowKeys.length !== 1) {
      message.error('Please select only 1 item!');
      return;
    }
    const editRole = this.state.roleList.find(
      (item) => item.id === this.state.selectedRowKeys[0]
    );
    if (editRole) {
      this.handleEdit(editRole);
    }
  };

  handleEdit = (row) => {
    this.setState({ showEditRoleDialog: true, editRow: row });
  };

  // 搜索框
  handleSearch = (value) => {
    this.setState(
      (preState) => {
        preState.params.q = value;
        return { ...preState };
      },
      () => {
        this.loadData();
      }
    );
  };

  // 所有的数据变化都来调用loadData
  // http://localhost:3000/per/role?_page=1&_limit=6&q=&_sort=id&_order=desc
  loadData = () => {
    loadRoleList(this.state.params).then((res) => {
      this.setState({
        roleList: res.data,
        total: parseInt(res.headers['x-total-count']),
      });
    });
  };

  // 实现分页 的changePage
  changePage = (page, pageSize) => {
    this.setState(
      (preState) => {
        preState.params._page = page;
        preState.params._limit = pageSize;
        return { ...preState };
      },
      () => {
        this.loadData();
      }
    );
  };

  // edit Role
  saveRole = (role) => {
    saveRole(role)
      .then((res) => {
        this.closeEditDialog();
        this.loadData();
        message.success('Mofidied success!');
      })
      .catch((err) => {
        message.error('Modified failed, please try again...');
      });
  };

  componentDidMount() {
    this.loadData();
  }

  handleSetRolePer = () => {
    if (this.state.selectedRowKeys.length !== 1) {
      message.error('Please select 1 item...');
      return;
    }
    // roleId => selectedRowKeys[0]
    let setRole = this.state.roleList.find(
      (item) => item.id === this.state.selectedRowKeys[0]
    );
    this.setState({ showSetRoleDialog: true, setRolePer: setRole });
  };

  buttonStyle = { margin: '5px' };

  render() {
    let { selectedRowKeys } = this.state;
    let setRolePerCom = null;
    return (
      <div className="admin-usermgr">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/role_mgr">Role Management</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <hr />
        <Button
          onClick={this.handleAdd}
          style={this.buttonStyle}
          type="primary"
        >
          Add
        </Button>

        <Button
          style={this.buttonStyle}
          type="default"
          onClick={this.handleBarEdit}
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
          onClick={this.handleSetRolePer}
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
          dataSource={this.state.roleList}
          columns={this.state.columns}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys: selectedRowKeys });
              console.log(selectedRowKeys);
            },
          }}
          pagination={{
            total: this.state.total,
            pageSize: 6,
            defaultCurrent: 1,
            onChange: this.changePage,
          }}
        />
        <AddRole
          close={this.closeAddDialog}
          visible={this.state.showAddRoleDialog}
          addRole={this.addRole}
        />
        <EditRole
          visible={this.state.showEditRoleDialog}
          close={this.closeEditDialog}
          data={this.state.editRow}
          saveRole={this.saveRole}
        />
        <Modal
          visible={this.state.showSetRoleDialog}
          title="Set Up User Permission"
          okText="Set up"
          cancelText="Cancel"
          onOk={() => {
            setRolePerCom.handleSubmitSetRolePer();
          }}
          onCancel={() => this.setState({ showSetRoleDialog: false })}
        >
          {this.state.showSetRoleDialog ? (
            <SetRolePer
              ref={(setRP) => (setRolePerCom = setRP)}
              data={this.state.setRolePer}
              close={() => this.setState({ showSetRoleDialog: false })}
            />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default RoleMgr;
