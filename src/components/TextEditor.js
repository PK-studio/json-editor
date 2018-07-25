import React, { Component } from 'react';
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
        this.rowsToRender = this.rowsToRender.bind(this);
    };

    rowsToRender(data){
        let listOfRows = data.map((row, index) =>{
            return (<Rows 
                        key={index} 
                        dataToDisplay={row} 
                        positionInArray={index} 
                        updater={this.props.updater}
                    />)
        });
        return listOfRows;
    }

    render(){
        console.log("TextEditor renders rows")
        if(!this.props.data){
            alert("Data is empty, load JSON file");
            return null;
        }
        return(
            <div onClick={this.hideWorkPanel}>
                {this.rowsToRender(this.props.data)}
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
    allowEdit(){
        if(this.props.dataToDisplay.key.indexOf("ref") !== -1){
            return null;
        };
        return <span style={editIconStyle} className="icon" onClick={this.goToEdition}></span>;
    }
    goToEdition(event){
        event.preventDefault();
        const info = {
            positionInArray: this.props.positionInArray,
            key: this.props.dataToDisplay.key,
            orginal: this.props.dataToDisplay.orginal,
            value: this.props.dataToDisplay.value
        }
        this.props.updater.rowInfo(info);
        this.props.updater.panel();
    }
}

export default TextEditor;