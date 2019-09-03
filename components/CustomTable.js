import { Table, Input, InputNumber, Popconfirm, Form, Icon } from 'antd';
import { connect } from 'react-redux';
import { deleteUser, updateUser } from '../actions/tableSettingsAction';

const EditableContext = React.createContext();

class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '40%',
        editable: true,
      },
      {
        title: 'Edit',
        dataIndex: 'Edit',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              <Icon style={{ margin: 'auto 10px', fontSize: 20, color: '#A6E6A2' }} type="edit" />
            </a>
          );
        },
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (text, record) => (
          <span>
            <Popconfirm title="Are sure to delete?" onConfirm={() => this.delete(record.key)}>
              <Icon style={{ margin: 'auto 10px', fontSize: 20, color: '#E56839' }} type="delete" />
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  delete = (userId) => {
    this.props.handleDeleteUser(userId);
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const users = [...this.props.users];
      const index = users.findIndex(item => key === item.key);
      if (index > -1) {
        const item = users[index];
        users.splice(index, 1, {
          ...item,
          ...row,
        });
        this.props.handleUpdateUser(users);
      } else {
        users.push(row);
        this.props.handleUpdateUser(users);
      }
      this.setState({
        editingKey: ''
      });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.props.users}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

const mapStateToProps = state => ({
  users: state.tableSettings.userData
});

const mapDispatchToProps = dispatch => ({
  handleUpdateUser: users => {
    dispatch(updateUser(users));
  },
  handleDeleteUser: userId => {
    dispatch(deleteUser(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);
