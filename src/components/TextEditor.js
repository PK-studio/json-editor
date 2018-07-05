import React, { Component } from 'react';
import dataWorker from './TextEditor_dataWorker';

class TextEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            processedData: null
        }
        this.returnData = this.returnData.bind(this);
    };

    returnData(loopedData){
        this.setState({processedData: loopedData})
    }

    render(){
        if(!this.props.data){
            console.log("Data is empty, choose json file to start work on it");
            return null;
        }
        let dataToFurtherEdit =  dataWorker(this.props.data)
        console.log(dataToFurtherEdit)
        // <TextEditor_dataWorker dataSender={this.returnData} data={this.props.data}/>
        // console.log("textEditor", this.state.processedData)
        // this.state.processedData.forEach(function(element) {
        //     console.log(element)
        // }, this);
        return(
            <div>
                
            </div>
        );
    };
};

export default TextEditor;