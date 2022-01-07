import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

    //初始化状态
    state = {
        users: [],
        isFirst: true, //是否为第一次打开
        isLoading: false, //是否加载中
        err: '', //错误信息
    }

    componentDidMount() {
        this.token = PubSub.subscribe('MY TOPIC', (_, stateObj) => {
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (
            <div>
                <div className="row">
                    {
                        isFirst ? <h2>Welcome</h2> :
                            isLoading ? <h2>Loading...</h2> :
                                err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                                    users.map((userObj) => {
                                        return (
                                            <div key={userObj.id} className="card">
                                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                                    <img alt="icon" src={userObj.avatar_url} style={{ width: '100px' }} />
                                                </a>
                                                <p className="card-text">{userObj.login}</p>
                                            </div>
                                        )
                                    })
                    }
                </div>
            </div>
        )
    }
}
