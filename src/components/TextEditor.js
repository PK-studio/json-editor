import React, { Component } from 'react';
import dataWorker from './TextEditor_dataWorker';
import './TextEditor.css';
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
        this.state = {
            showRef: false
        };
        this.toggleRef = this.toggleRef.bind(this);
    }
    toggleRef(event){
        event.preventDefoult;
        this.setState({showRef: !this.state.showRef});
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
            return <div dangerouslySetInnerHTML={{__html: this.props.dataToDisplay.orginal}}></div>;
        }else{
            return <div><p className="clearFormatting">{this.props.dataToDisplay.key}</p></div>;
        };
    }
    colorReferencesRows(){
        if(this.props.dataToDisplay.key.indexOf("ref") !== -1){
            return referencesColor;
        };
        return null
    }
    switchOnEditing(){
        if(this.props.dataToDisplay.key.indexOf("ref") !== -1){
            return null;
        };
        return <span style={editIconStyle} className="icon"></span>;
    }
    render(){
        return(
            <div className="TextEditor_row" style={this.colorReferencesRows()}>
                <div className="first" onClick={this.toggleRef}><span style={this.chooseIcon()} className="icon"></span></div>
                <div className="second">{this.toggleContent()}</div>
                <div className="third" dangerouslySetInnerHTML={{__html: this.props.dataToDisplay.value}}></div>
                <div className="fourth">{this.switchOnEditing()}</div>
            </div>
        )
    }
}

export default TextEditor;