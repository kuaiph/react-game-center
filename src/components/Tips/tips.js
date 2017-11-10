import React, { Component } from 'react';

class Tips extends Component{
    render(){
        const tips = this.props.tips;
        if(tips==='error'){
            return (
                <div className="login-tips">
                    <span>帐号或密码错误</span>
                </div> 
            )
        }else if(tips==='success'){
            return (
                <div className="login-tips">
                    <span>登录成功！</span>
                </div> 
            )
        }else{
            return null;
        }
    }
}

export default Tips;