/**
 * Created by jerry on 2016/12/19.
 */
import React from 'react';

import {
    List,
    InputItem,
    TextareaItem,
    ImagePicker,
    Button,
    Modal,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';

import Row from '../../../../component/Row';

let API = require("../../../../middleware/api");

class QuestioningForm extends React.Component{
    constructor(){
        super();
        this.state = {
            files: [],
            url: [],
            topicTitle:"",
            topicContent:""
        };

        this.handleImageChange = this.handleImageChange.bind( this );
        this.removeURL = this.removeURL.bind( this );
        this.addURL = this.addURL.bind( this );
        this.handleImageClick = this.handleImageClick.bind( this );
        this.handleTopicTitleChange = this.handleTopicTitleChange.bind(this);
        this.handleTopicContentChange = this.handleTopicContentChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleImageClick(index,fx){
        let urlArr = this.state.url;
        $.photoBrowser({
            items: urlArr,
            initIndex: index
        }).open();
    }

    addURL( url ){
        let urlArr = this.state.url;
        urlArr.push(url);

        this.setState({
            url:urlArr
        });
    }

    removeURL ( index ){
        let urlArr = this.state.url;
        urlArr.splice(index,1);

        this.setState({
            url: urlArr
        });
    }

    handleImageChange(files, type, index) {
        this.setState({
            files,
        });

        //this.judgeType( files[files.length-1].url,type,index );
        switch( type ){
            case "add":
                this.addURL( files[files.length-1].url );
                break;

            case "remove":
                this.removeURL( index );
                break;
        }
    }

    handleTopicTitleChange( topicTitle ){
        this.setState({
            topicTitle
        })
    }

    handleTopicContentChange( topicContent ){
        this.setState({
            topicContent
        })
    }

    handleSubmitClick(){
        let topicTitle = this.state.topicTitle;
        let userId = this.props.userId;
        let topicContent = this.state.topicContent;
        let topicImageURL = this.state.url;
        let afterCreateTime = this.props.afterTopicCreateTime;

        if( topicTitle === "" ){
            Modal.alert(
                "错误提示",
                "标题不能为空",
                [
                    {
                        text:"确定"
                    }
                ]
            );
            return;
        }

        let jsonData = {
            noteImages: topicImageURL,
            userId: userId,
            noteTitle: topicTitle,
            noteContent: topicContent,
            labelId:"2"
        };

        let jsonDataOfGetTopic = {
            userId:userId,
            limit:10,
            offset:0,
            afterCreateTime:afterCreateTime
        };

        let uploadTopicFunc = this.props.uploadTopicFunc;

        console.log(this.state.files);

        uploadTopicFunc?uploadTopicFunc(jsonData,jsonDataOfGetTopic,function(){
            this.props.router.go(-1);
        }.bind(this)):"";
    }

    render(){
        return(
            <DocumentTitle title = "提问">
                <Row>
                    <List>
                        <InputItem
                            type = "text"
                            placeholder = "请输入标题"
                            value = { this.state.topicTitle }
                            onChange = { this.handleTopicTitleChange }
                            extra = "必填"
                        >
                            标题
                        </InputItem>
                        <TextareaItem
                            title = "文本"
                            rows = { 4 }
                            placeholder = "请输入文本内容"
                            value = { this.state.topicContent }
                            onChange = { this.handleTopicContentChange }
                        />
                        <ImagePicker
                            files={ this.state.files }
                            onChange={ this.handleImageChange }
                            onImageClick={ this.handleImageClick }
                            selectable={ this.state.files.length < 5}
                        />
                    </List>
                    <WhiteSpace />
                    <WingBlank size="sm">
                        <Button type="primary" onClick = { this.handleSubmitClick }>提交</Button>
                    </WingBlank>
                    <WhiteSpace />
                </Row>
            </DocumentTitle>
        )
    }
}

QuestioningForm.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps( state ){
    let firstTopic = state.content.topicList[0];
    return{
        userId:state.userInfo.userId,
        afterTopicCreateTime: firstTopic?firstTopic.noteCreateTime:null
    }
}


function mapDispatchToProps( dispatch ){
    return{
        uploadTopicFunc: bindActionCreators( API.uploadTopic,dispatch)
    }
}


export default connect( mapStateToProps,mapDispatchToProps )( withRouter(QuestioningForm) );