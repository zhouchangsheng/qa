/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react';
import { Card,WhiteSpace } from 'antd-mobile';

import Row from '../../component/Row';
import  DocumentTitle from 'react-document-title';


class MainPage extends React.Component{
    render(){
        return (
            <DocumentTitle title="校园问答社区">
                <Row>
                    <Card full>
                        <Card.Header
                            title = "孙浩"
                            extra = "java后端"
                        />
                        <Card.Body>
                            负责java后端编写，restful API设计，后台优化
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="sm"/>
                    <Card full>
                        <Card.Header
                            title = "金鹏飞"
                            extra = "数据库"
                        />
                        <Card.Body>
                            ER图分析，利用Rose建UML类图，数据库设计
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="sm"/>
                    <Card full>
                        <Card.Header
                            title = "周长升"
                            extra = "web前端"
                        />
                        <Card.Body>
                            前端编写，使用React 、React-Router、React-Redux 负责与后端数据交互格式，与后端讨功能需求
                        </Card.Body>
                    </Card>
                </Row>
            </DocumentTitle>
        )
    }
}

export default MainPage;

