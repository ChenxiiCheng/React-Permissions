import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Breadcrumb,
  Button,
  Input,
  Table,
  message,
  Popconfirm,
  Modal,
} from 'antd';
import {
  LoadPerAsync,
  AddPerAsync,
  EditPerAsync,
  DeletePerAsync,
} from '../../../action/perAction';
import AddPer from './addPer';
import EditPer from './editPer';

/**
 * 数据从redux了拿，和rolemgr处理方式不同，rolemgr里没用redux，用了状态提升
 */
class PerMgr extends Component {
  state = {
    showEditPerDialog: false,
    showAddPerDialog: false,
    editPer: null,
    params: {
      _limit: 6,
      _page: 1,
      q: ' ',
      _sort: 'id',
      _order: 'desc',
    },
    selectedRowKeys: [],
    columns: [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'No',
      },
      {
        key: 'type',
        dataIndex: 'type',
        title: 'Permission Type',
      },
      {
        key: 'des',
        dataIndex: 'des',
        title: 'Permission Desc',
      },
      {
        key: 'status',
        dataIndex: 'status',
        title: 'Permission Status',
      },
      {
        key: 'code',
        dataIndex: 'code',
        title: 'Permission Code',
      },
      {
        key: 'url',
        dataIndex: 'url',
        title: 'URL',
      },
      {
        key: 'pId',
        dataIndex: 'pId',
        title: 'Parent Permission',
      },
      {
        key: 'order',
        dataIndex: 'order',
        title: 'Order',
      },
      {
        key: 'subon',
        dataIndex: 'subon',
        title: 'Created Time',
      },
      {
        key: 'del',
        dataIndex: 'del',
        title: 'Edit',
        render: (del, row) => {
          return (
            <div>
              <Button
                onClick={() => this.showEditPer(row)}
                type="primary"
                style={{ marginRight: '8px' }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are u sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={() => {
                  this.deletePerIds([row.id]);
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

  componentDidMount() {
    this.loadData();
  }

  // 公共加载数据方法
  loadData = () => {
    this.props.loadDataAsync(this.state.params);
  };

  deletePerIds = (ids) => {
    this.props
      .submitDeletePer(ids)
      .then((res) => {
        message.success('Deleted success!');
        let arr = this.state.selectedRowKeys;
        let newArr = arr.filter((item) => !ids.includes(item));
        this.setState({ selectedRowKeys: newArr });
        this.loadData();
      })
      .catch((err) => {
        message.error('Deleted failed...');
      });
  };

  showEditPer = (per) => {
    this.setState({ showEditPerDialog: true, editPer: per });
  };

  handleAdd = () => {
    this.setState({ showAddPerDialog: true });
  };

  handleDelete = () => {
    // 批量删除
    if (this.state.selectedRowKeys.length <= 0) {
      message.error('Please select item!');
      return;
    }
    Modal.confirm({
      title: 'Are u sure to delete?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        this.deletePerIds(this.state.selectedRowKeys);
      },
    });
  };

  handleEdit = () => {};

  // 搜索框
  handleSearch = (value) => {
    this.setState(
      (preState) => {
        let newState = { ...preState };
        newState.params.q = value;
      },
      () => {
        this.loadData();
      }
    );
  };

  changePage = (page, pageSize) => {
    this.setState(
      (preState) => {
        let params = { ...preState.params };
        params._page = page;
        params._limit = pageSize;
        return Object.assign({}, preState, { params });
      },
      () => {
        this.loadData();
      }
    );
  };

  closeAddPerDialog = () => {
    this.setState({ showAddPerDialog: false });
  };

  closeEditDialog = () => {
    this.setState({ showEditPerDialog: false });
  };

  handleBarEdit = () => {
    // 判断当前选中的条数
    if (this.state.selectedRowKeys.length !== 1) {
      message.error('Please select only 1 item!');
      return;
    }
    let editPerId = this.state.selectedRowKeys[0];
    let editRow = this.props.perList.find((item) => item.id === editPerId);
    this.showEditPer(editRow);
  };

  buttonStyle = { margin: '5px' };

  render() {
    const { selectedRowKeys } = this.state;
    return (
      <div className="admin-permgr">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/home/per_mgr">Permission Management</Link>
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
        <Input.Search
          placeholder="Search"
          onSearch={this.handleSearch}
          enterButton
          style={{ margin: '5px', width: '320px' }}
        />
        <Table
          bordered
          style={{ backgroundColor: '#fff' }}
          dataSource={this.props.perList}
          columns={this.state.columns}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys: selectedRowKeys });
            },
          }}
          pagination={{
            total: this.props.total,
            pageSize: 6,
            defaultCurrent: 1,
            onChange: this.changePage,
          }}
        />
        <AddPer
          visible={this.state.showAddPerDialog}
          close={this.closeAddPerDialog}
          addPer={this.props.addPer}
        />
        <EditPer
          visible={this.state.showEditPerDialog}
          close={this.closeEditDialog}
          data={this.state.editPer}
          submitEditPer={this.props.submitEditPer}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.perList.total,
    perList: state.perList.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadDataAsync: (params) => {
      dispatch(LoadPerAsync(params));
    },
    addPer: (per) => {
      return dispatch(AddPerAsync(per));
    },
    submitEditPer: (per) => {
      return dispatch(EditPerAsync(per));
    },
    submitDeletePer: (ids) => {
      // 行内删除
      return dispatch(DeletePerAsync(ids));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PerMgr);
