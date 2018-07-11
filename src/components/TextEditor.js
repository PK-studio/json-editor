import React, { Component } from 'react';
import dataWorker from './TextEditor_dataWorker';
import './TextEditor.css';
import eyeIconBackground from '../imgs/eye.png';

const eyeIconStyle = {
    backgroundImage: "url("+eyeIconBackground+")",
}

class TextEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            processedJSON: null
        }
        this.rowsToRender = this.rowsToRender.bind(this)
    };

    componentWillReceiveProps(nextProps) {
        let dataToFurtherEdit =  dataWorker(nextProps.data)
        this.setState({processedJSON: dataToFurtherEdit})
    }

    rowsToRender(arrayOfRows){
        if(!arrayOfRows) return null;
        let listOfRows = arrayOfRows.map((row, index) =>{
            return (<Rows key={index} dataToDisplay={row} />)
        });
        return listOfRows;
    }

    render(){
        if(!this.state.processedJSON){
            alert("Data is empty, load JSON file");
            return null;
        }
        return(
            <div>
                {this.rowsToRender(this.state.processedJSON)}
            </div>
        );
    };
};

class Rows extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.dataToDisplay)
        return(
            <div className="TextEditor_row">
                <div className="left"><span style={eyeIconStyle} className="eyeIcon"></span></div>
                <div className="mid">{this.props.dataToDisplay.orginal}</div>
                <div className="right">{this.props.dataToDisplay.value}</div>
            </div>
        )
    }
}

export default TextEditor;