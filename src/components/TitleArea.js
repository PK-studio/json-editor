import React, { Component } from 'react';
import './TitleArea.css';
import iconBackground from '../imgs/info-icon.png';

const iconStyle = {
    display: "block",
    width: "30px",
    height: "30px",
    backgroundImage: "url("+iconBackground+")",
    backgroundSize: "cover"
}

class TitleArea extends Component {
    constructor(props){
        super(props)
        this.state = {
            labelValue: false
        }
        this.showLabel = this.showLabel.bind(this);
        this.hideLabel = this.hideLabel.bind(this);
    };

    render(){
        return(
            <div>
                <div className="title_area">
                    <h2>Json Editor</h2>
                    <a className="info">
                        <span 
                            className="icon" style={iconStyle}
                            onMouseOver={this.showLabel}
                            onMouseOut={this.hideLabel}
                        ></span>
                    </a>
                    <Label labelValue={this.state.labelValue}/>
                </div>               
            </div>
        );
    };

    showLabel(event){
        event.preventDefault();
        this.setState({labelValue: true})
    }

    hideLabel(event){
        event.preventDefault();
        this.setState({labelValue: false})
    }
};

class Label extends Component{
    render(){
        if(this.props.labelValue === false){
            return null
        }
        return(
            <span className="infoLabel">Info</span>
        )
    }
}

export default TitleArea;