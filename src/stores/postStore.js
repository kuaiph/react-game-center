import { observable, action, toJS } from 'mobx';
import axios from 'axios';
import commonStore from './commonStore';

class PostStore {
    @observable content = ''; // 存放待发送的动态内容

    @observable postList = null;

    @observable currPostId = '';

    @observable postNavFlag = 0; // 0:postList 1:postAdd 2:postDetails

    @action setPostContent(content) {
        this.content = content;
    }

    @action addPost(token) {
        let userId = toJS(commonStore.user.user_id),
            username = toJS(commonStore.user.name)
        const post = {
            user_id: userId,
            name: username,
            content: this.content
        }
        console.log(userId, username)
        console.log(post)
        return axios({
            method: 'POST',
            url: '/api/users/posts/' + post.user_id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                user_id: post.user_id,
                name: post.name,
                content: post.content
            }
        })
            .then(res => {
                console.log(res)
                if (res.data.data === 1) {

                } else if (res.data.data === 2) {

                } else {

                }
            })
            .catch(err => console.log(err))
    }

    @action changePostFlag(num){
        console.log(num+'???')
        this.postNavFlag = num;
    }

    @action deletePost(token) {
        console.log(this.currPostId)
        return axios({
            method: 'DELETE',
            url: '/api/users/posts/' + this.currPostId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                post_id: this.currPostId
            }
        })
        .then(res => {
            console.log(res)
            return res.data;
        })
    }

    @action saveCurrPostId(post_id){
        this.currPostId = post_id;
    }

    @action getPostList(token) {
        let user_id = toJS(commonStore.user.user_id);
        console.log(user_id)
        return axios({
            method: 'GET',
            url: '/api/users/posts/' + user_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 200 && res.data.length > 0) {
                    console.log(res.data)

                    res.data.forEach(data => {
                        if (data.content.indexOf('\n')) {
                            data.content = data.content.replace(/\n/g, '<br/>')
                        }
                    })
                    console.log('返回列表数据成功.')
                    this.postList = res.data;
                    return res.data;
                } else {
                    console.log('返回数据失败????')
                }

            })
            .catch(err => console.log(err))
    }

    @action getPostData() {
        return toJS(this.postList)
    }
}

export default new PostStore();