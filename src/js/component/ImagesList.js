/**
 * Created by jerry on 2016/12/16.
 */
import React from 'react';

import Image from './Image';

class ImagesList extends React.Component{
    constructor(){
        super();

        this.clickImageFeedbackShow = this.clickImageFeedbackShow.bind( this );
    }

    componentDidMount(){
        var column3Width = $(".topicImageColumn3").width();
        if(column3Width){
            $(".topicImageColumn3").css("height", column3Width + "px");
        }

        var column2Width = $(".topicImageColumn2").width();
        if(column2Width){
            $(".topicImageColumn2").css("height", column2Width + "px");
        }

        var column1Width = $(".topicImageColumn1").width();
        if(column1Width){
            $(".topicImageColumn1").css("height", column1Width + "px");
        }
    }

    clickImageFeedbackShow( id ){
        let imagesURLArr = this.props.imagesURLArr;
        let items = [];

        if( typeof imagesURLArr ==="string" ){
            items = imagesURLArr.split(";");
        }else if( imagesURLArr instanceof Array ){
            items = imagesURLArr;
        }

        $.photoBrowser({
            items: items,
            initIndex: id
        }).open();

    }

    transferArrToItems( arr ){
        let items = [];
        for(let i = 0, arrLength = arr.length; i < arrLength; i++ ){
            items.push({
                image: arr[i]
            })
        }

        return items;
    }

    pushImageArr( arr,type ){
        let imageArr = [];
        for( let i = 0,imageArrLength = arr.length ; i < imageArrLength ; i++ ){
            imageArr.push(<Image
                url = { arr[i] }
                type = { type }
                key = { i }
                dataID = { i }
                clickImage = { this.clickImageFeedbackShow }
            />);
        }

        return imageArr;
    }

    estimateImage( arr ){
        let imageArr = [];
        if(typeof arr === "string"){
            //清除图片地址字符串最后一个分号分隔符
            if( /;$/g.test(arr)){
                arr = arr.replace(/;$/gm,"");
            }

            let splitArr = arr.split(";");

            //清除空字符串
            if( splitArr[0] === "" ){
                splitArr = [];
            }

            imageArr = this.getImageArr( splitArr );
        }else if( arr instanceof  Array ){
            imageArr = this.getImageArr( arr );
        }

        return imageArr;
    }

    getImageArr( arr ){
        let arrLength = arr.length;
        let imageArr = [];

        if( arrLength === 1 ){
            imageArr = this.pushImageArr( arr,"1" );
        }else if( arrLength === 2 ){
            imageArr = this.pushImageArr( arr,"2" );
        }else if( arrLength >2 ){
            imageArr = this.pushImageArr( arr,"3" );
        }

        return imageArr;
    }
    render(){
        let images = this.estimateImage( this.props.imagesURLArr );
        return(
            <ul className = "topicImageList">
                {
                    images
                }
            </ul>
        )
    }
}

export default ImagesList;