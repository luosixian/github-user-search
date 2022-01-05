import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {

    //初始化状态
    state = {
        users: [],
        isFirst: true, //是否为第一次打开
        isLoading: false, //是否加载中
        err: '', //错误信息
    }

    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }

    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateAppState} />
                <List {...this.state} />
            </div>
        )
    }
}

