import React, { Component } from 'react'
import PubSub from 'pubsub-js'
//import axios from 'axios'

export default class Search extends Component {

    search = async () => {
        // 获取用户输入
        // 发送网络请求
        const { keyNode: { value: keyWord } } = this
        //发送请求前更新List状态
        //this.props.updateAppState({ isFirst: false, isLoading: true })
        PubSub.publish('MY TOPIC', { isFirst: false, isLoading: true });

        //使用axios发送请求
        /* axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                //请求成功后更新List状态
                //this.props.updateAppState({ isLoading: false, users: response.data.items })
                PubSub.publish('MY TOPIC', { isLoading: false, users: response.data.items });
            },
            error => {
                //请求成功后更新List状态
                //this.props.updateAppState({ isLoading: false, err: error.message })
                PubSub.publish('MY TOPIC', { isLoading: false, err: error.message });
            }
        ) */

        //使用fetch发送ajax对象 --- 未优化
        /* fetch(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                console.log('联系服务器成功');
                return response.json();
            },
            error => {
                console.log('联系服务器失败', error);
                return new Promise(() => { });
            }
        ).then(
            response => { console.log('获取数据成功', response); },
            error => { console.log('获取数据失败', error); }
        ) */

        //使用fetch发送ajax对象 --- 优化
        /* fetch(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                console.log('联系服务器成功');
                return response.json();
            },
        ).then(
            response => { console.log('获取数据成功', response); },
        ).catch(
            error => { console.log('请求出错', error); }
        ) */

        //使用fetch发送ajax对象 --- 再优化
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyWord}`);
            const data = await response.json();
            //console.log(data);
            PubSub.publish('MY TOPIC', { isLoading: false, users: data.items });
        } catch (error) {
            console.log('请求出错', error);
            PubSub.publish('MY TOPIC', { isLoading: false, err: error.message });
        }
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
