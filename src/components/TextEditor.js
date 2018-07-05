import React, { Component } from 'react';
import dataWorker from './TextEditor_dataWorker';

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
        let listOfRows = arrayOfRows.map((row, index) =>
            <Rows key={index} dataToDisplay={row} />
        );
        return listOfRows;
    }

    render(){
        if(!this.state.processedJSON){
            console.log("Data is empty, choose json file to start work on it");
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
            <div></div>
        )
    }
}

export default TextEditor;