import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../pages/UserEditor';

class UserEdit extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor (props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentWillMount() {
        const userId = this.context.router.params.id
        fetch('http://localhost:3000/user/' + userId)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    user:res
                })
            })
    }

    render () {
        const { user } = this.state
        return <HomeLayout title="编辑用户">
            {
                user ? <UserEditor editTarget={user}/> : '加载中...'
            }
        </HomeLayout>
    }
}

export default UserEdit