import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

    search = () => {
        // 获取用户输入
        // 发送网络请求
        const { keyNode: { value: keyWord } } = this
        //发送请求前更新状态
        this.props.updateAppState({ isFirst: false, isLoading: true })
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                //请求成功后更新状态
                this.props.updateAppState({ isLoading: false, users: response.data.items })
            },
            error => {
                //请求成功后更新状态
                this.props.updateAppState({ isLoading: false, err: error.message })
            }
        )
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={c => this.keyNode = c} type="text" placeholder="enter the name" />&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
