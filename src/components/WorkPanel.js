import React, { Component } from 'react';
import './WorkPanel.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class WorkPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: "Loading data..."
        };
        this.closePanel = this.closePanel.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this)
    };
    
    componentDidMount() {
        this.setState({inputValue: this.props.rowData.value});
    }

    closePanel(event){
        event.preventDefault();
        let tagClass = event.target.getAttribute("class");
        if(tagClass === "overlayer"){
            this.props.updater.panel();
            this.props.updater.rowInfo(null);
        }
    }

    updateInputValue(event){
        event.preventDefault();
        let newValue = event.target.value;
        this.setState({inputValue: newValue});
    }

    render(){
        return (
            <div className="overlayer" onClick={this.closePanel}>
                <div className="panel">
                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />
                    {/* <textarea
                        value={this.state.inputValue}
                        onChange={this.updateInputValue}
                    >
                    </textarea> */}
                    <p>{this.props.rowData.value}</p>
                </div>
            </div>
        );
    };
};

export default WorkPanel;