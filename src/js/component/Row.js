/**
 * Created by jerry on 2016/12/14.
 */
import React from 'react'

class Row extends React.Component{
    render(){
        return(
            <div
                style={ this.props.styleCss }
                onClick = { this.props.onClick }
                className = { this.props.className }
            >
                {
                    this.props.children
                }
            </div>

        )
    }
}

export default Row;