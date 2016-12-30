/**
 * Created by jerry on 2016/12/17.
 */
import React from 'react';
import Jquery from 'jquery';

import { Popover,Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let Item = Popover.Item;
let API = require("../../middleware/api");


class TopicFooterMore extends React.Component{
    constructor(){
        super();

        this.state = {
            popoverVisible: false,
            collectStatus: "heart-o",
            collectStatusText: "收藏"
        };

        this.handlePopoverVisibleChange = this.handlePopoverVisibleChange.bind( this );
        this.handlePopoverSelect = this.handlePopoverSelect.bind( this );
    }

    componentWillMount(){
        let collectStatus = this.props.collectStatus;
        if( collectStatus === "heart" ){
            this.setState({
                collectStatus: "heart",
                collectStatusText: "已收藏"
            })
        }
    }

    /*uploadStatus( type ){
        let url;
        switch( type ) {
            case "collect":
                url = API.URL_OF_COLLECT_TOPIC;
                break;

            case "cancelCollect":
                url = API.URL_OF_CANCEL_COLLECT_TOPIC;
                break;
        }
    }*/

    switchCollectStatus( status ){
        let noteId = this.props.noteId;
        let curUserId = ""+ this.props.curUserId;
        let topicMeta = {
            noteId: this.props.noteId,
            userId: this.props.curUserId
        };

        if( status === "heart-o" ){
            //收藏
            (function(){
                API.collectTopic(topicMeta,function(){
                    this.setState({
                        collectStatus: "heart",
                        collectStatusText: "已收藏"
                    })
                }.bind(this))
            }.bind(this))();

        }else if( status === "heart" ){
            //取消收藏
            (function(){
                API.cancelCollectTopic(topicMeta,function(){
                    this.setState({
                        collectStatus: "heart-o",
                        collectStatusText: "收藏"
                    })
                }.bind(this))
            }.bind(this))();
        }
    }

    deleteTopic(){
        let noteId = this.props.noteId;
        let deleteTopicFunc = this.props.deleteTopicFunc;

        deleteTopicFunc?deleteTopicFunc(noteId):"";
    }

    judgePopoverSelect( props ){
        let value = props.value;

        switch( value ){

            //收藏
            case "collect":
                this.switchCollectStatus( props.iconName );
                break;

            //删除
            case "delete":
                this.deleteTopic();
                break;
        }
    }

    handlePopoverSelect( obj ){
        this.setState({
            popoverVisible: false
        });

        this.judgePopoverSelect(obj.props);

    }

    handlePopoverVisibleChange( visible ){
        this.setState({
            popoverVisible: visible
        })
    }

    componentWillMount(){
        let collect = parseInt(this.props.collect);

        if( collect === 1 ){
            this.setState({
                collectStatus: "heart",
                collectStatusText: "已收藏"
            })
        }
    }

    render(){
        let userId = ""+ this.props.userId;
        let curUserId = ""+ this.props.curUserId;

        let popoverContent =[
            <Item
                key = "1"
                value = "collect"
                iconName = { this.state.collectStatus }
                className = "topicPopoverItem"
            >
                {
                    this.state.collectStatusText
                }
            </Item>
        ];

        curUserId === userId ?popoverContent.push(
            <Item key = "2" value="delete" iconName="delete" className="topicPopoverItem" >删除</Item>
        ):"";

        return(
            <Popover
                className = "customPopover"
                visible = { this.state.popoverVisible }
                popupAlign = {{
                    overflow : { adjustY: 0, adjustX: 0 },
                    offset: [ 15, -15 ]
                }}
                overlay = { popoverContent }
                onVisibleChange = { this.handlePopoverVisibleChange }
                onSelect = { this.handlePopoverSelect }
                placement = "topRight"
            >
                <Icon type = "ellipsis" />
            </Popover>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return{
        deleteTopicFunc: bindActionCreators(API.deleteTopic,dispatch)
    }
}
export default connect(null,mapDispatchToProps)(TopicFooterMore);