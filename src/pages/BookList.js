import React from 'react'
import HomeLayout from '../layouts/HomeLayout'

class BookList extends React.Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    state={
        booklist:[]
    }
    componentWillMount(){
        fetch('http://localhost:3000/book')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    booklist:res
                })
            })
    }
    handleEdit(book){
        this.context.router.push('/book/edit/'+book.id)
    }
    handleDel(book){
        const confirmed = confirm(`你确定删除${book.name}吗？`)
        if(confirmed){
            fetch('http://localhost:3000/book'+book.id,{
                method:'delete'
            })
                .then(res => res.json())
                .then(res => {
                    userList:this.state.userList.filter(item => item.id !== user.id)
                })
                alert('删除图书成功')
                .catch(err => {
                    console.log(err)
                    alert('删除图书失败')
                })
        }
    }
    render(){
        const { booklist } = this.state
        return <HomeLayout title="图书列表">
                <table width='30%' style={{textAlign:'center'}}>
                    <thead>
                        <tr>
                            <td>图书编号</td>
                            <td>图书</td>
                            <td>价格</td>
                            <td>用户id</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        booklist&& booklist.map((book)=>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.price}</td>
                            <td>{book.owner_id}</td>
                            <td>
                                <a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>编辑</a>&nbsp;
                                <a href="javascript:void(0)" onClick={() => this.handleDel(book)}>删除</a>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </HomeLayout>
    }
}
export default BookList