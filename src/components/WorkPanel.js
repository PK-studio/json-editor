import React, { Component } from 'react';
import './WorkPanel.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class WorkPanel extends Component {
    constructor(props){
        super(props);
        this.content = "";
        this.closePanel = this.closePanel.bind(this);
        this.updateContent = this.updateContent.bind(this);
    };

    closePanel(event){
        event.preventDefault();
        let tagClass = event.target.getAttribute("class");
        if(tagClass === "overlayer"){
            this.props.updater.panel();
        }
    }

    updateContent(newContent){
        this.content = newContent;
    }

    render(){
        return (
            <div className="overlayer" onClick={this.closePanel}>
                <div className="panel">
                    <ControlledEditor rowData={this.props.rowData} updater={{rowInfo: this.props.updater.rowInfo}}/>
                </div>
            </div>
        );
    };
};

export default WorkPanel;

class ControlledEditor extends Component {
    constructor(props) {
      super(props);
      const blocksFromHtml = htmlToDraft(this.props.rowData.value);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      this.state = {
        editorState: EditorState.createWithContent(contentState)
      };
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState
        });
        let newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        let newRowData = this.props.rowData;
        newRowData.value = newContent
        this.props.updater.rowInfo(newRowData)
    };
  
    render() {
        console.log(this.props)
      const { editorState } = this.state;
      return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>        
      )
    }
}