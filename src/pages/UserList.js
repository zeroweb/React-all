import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

class UserList extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor (props) {
        super(props);
        this.state = {
            userList: []
        };
    }
    componentWillMount () {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                });
            });
    }
    handleEdit (user) {
        this.context.router.push('/user/edit/' + user.id);
    }

    handleDel (user) {
        const confirmed = confirm(`你确定删除${user.name}吗？`)
        if(confirmed){
            fetch('http://localhost:3000/user/' + user.id,{
                method:'delete'
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        userList:this.state.userList.filter(item => item.id !== user.id)
                    })
                    alert('删除用户成功')
                })
                .catch(err => {
                    console.log(err)
                    alert('删除用户失败')
                })
        }
    }

    render () {
        const {userList} = this.state;
        return <HomeLayout title="用户列表">
                <table width='30%' style={{textAlign:'center'}}>
                    <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        userList.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.gender==='male' ? '男' : '女'}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>&nbsp;
                                        <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
        </HomeLayout>
    }
}

export default UserList;