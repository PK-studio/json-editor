import React, { Component } from 'react';
import dataWorker from './TextEditor_dataWorker';
import WorkPanel from './WorkPanel';
import './TextEditor.css';
// media assets:
import eyeIconBackground_black from '../imgs/eye.png';
import eyeIconBackground_orange from '../imgs/eye-orange.png';
import editIcon from '../imgs/edit.png';

const eyeIconStyle_black = {
    backgroundImage: "url("+eyeIconBackground_black+")"
}
const eyeIconStyle_orange = {
    backgroundImage: "url("+eyeIconBackground_orange+")"
}
const editIconStyle = {
    backgroundImage: "url("+editIcon+")"
}
const referencesColor = {
    backgroundColor: "#a9abef"
}

class TextEditor extends Component {
    constructor(props){
        super(props)
        this.dataArrayFromUploadedFile = null;
        this.rowsToRender = this.rowsToRender.bind(this);
    };
    componentWillReceiveProps(nextProps) {
        let processedUploadedJSONFile =  dataWorker(nextProps.data)
        this.dataArrayFromUploadedFile = processedUploadedJSONFile
        return null;
    }
    rowsToRender(arrayOfObjects){
        let listOfRows = arrayOfObjects.map((row, index) =>{
            return (<Rows key={index} dataToDisplay={row} updater={{panel: this.props.updater.panel}}/>)
        });
        return listOfRows;
    }
    render(){
        if(!this.dataArrayFromUploadedFile){
            alert("Data is empty, load JSON file");
            return null;
        }
        return(
            <div onClick={this.hideWorkPanel}>
                {this.rowsToRender(this.dataArrayFromUploadedFile)}
            </div>
        );
    };
};

class Rows extends Component {
    constructor(props){
        super(props);
        this.state = {
            showRef: false,
            value: null
        };
        this.toggleRef = this.toggleRef.bind(this);
        this.goToEdition = this.goToEdition.bind(this);
    };
    static getDerivedStateFromProps(props, state) {
        if(state.value !== props.dataToDisplay.value){
            state.value = props.dataToDisplay.value
        ;}
        return null
    }
    colorReferencesRows(){
        if(this.props.dataToDisplay.key.indexOf("ref") !== -1){
            return referencesColor;
        };
        return null
    }
    toggleRef(){
        this.setState(prevState => ({
            showRef: !prevState.showRef
        }));
    }
    chooseIcon(){
        if(!this.state.showRef){
            return eyeIconStyle_black;
        }else{
            return eyeIconStyle_orange;
        }
    }
    toggleContent(){
        if(!this.state.showRef){
            return <div dangerouslySetInnerHTML={{__html: this.props.dataToDisplay.orginal}}></div>
        }else{
            return <div><p className="clearFormatting">{this.props.dataToDisplay.key}</p></div>
        };
    }
    goToEdition(){
        this.props.updater.panel();
    }
    allowEdit(){
        if(this.props.dataToDisplay.key.indexOf("ref") !== -1){
            return null;
        };
        return <span style={editIconStyle} className="icon" onClick={this.goToEdition}></span>;
    }
    render(){
        return(
            <div className="TextEditor_row" style={this.colorReferencesRows()}>
                <div className="first" onClick={this.toggleRef}>
                    <span style={this.chooseIcon()} className="icon"></span>
                </div>
                <div className="second">{this.toggleContent()}</div>
                <div className="third" dangerouslySetInnerHTML={{__html: this.state.value}}></div>
                <div className="fourth">{this.allowEdit()}</div>
            </div>
        )
    }
}

export default TextEditor;