/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

class Image extends React.Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind( this );
    }

    handleClick(){
        this.props.clickImage(this.props.dataID);
    }

    getClassNameType(type ){
        let classNameType = "";
        switch( type ){
            //一张图片
            case "1" :
                classNameType = "topicImageColumn1";
                break;

            //两张图片
            case "2" :
                classNameType = "topicImageColumn2";
                break;

            //多张图片以及默认
            case "3" :
            default :
                classNameType = "topicImageColumn3";
        }

        return classNameType;
    }

    getClassName( type, propsClassName ){
        let verifyPropsClassName = propsClassName? "" + propsClassName : "";
        let classNameType = this.getClassNameType( type );
        let mergeClassName = "topicImage " + classNameType + " " + verifyPropsClassName;

        return mergeClassName;
    }

    render(){
        let url = "url("+this.props.url+")";

        let className = this.getClassName( this.props.type,this.props.className );
        return(
            <li
                className = { className }
                style = {{ backgroundImage:url }}
                data-id = { this.props.dataID}
                onClick= { this.handleClick }
            >
            </li>
        )
    }
}

export default Image;