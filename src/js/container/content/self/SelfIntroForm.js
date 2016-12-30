/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import { List,InputItem } from 'antd-mobile';

class SelfIntroForm extends React.Component{
    render(){
        let selfIntro = this.props.selfIntro;
        return(
            <div>
                <List>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userUsername }
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userNickname }
                    >
                        昵称
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userEmail }
                    >
                        邮箱
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userPhone }
                    >
                        电话
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userSchool }
                    >
                        学校
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userDepartment }
                    >
                        学院
                    </InputItem>
                    <InputItem
                        type = "text"
                        editable = { false }
                        value = { selfIntro.userProfession }
                    >
                        专业
                    </InputItem>
                </List>
            </div>
        )
    }
}

export default SelfIntroForm;