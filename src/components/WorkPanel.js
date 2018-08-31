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
                    <div className="panel_padding">
                        <ControlledEditor rowData={this.props.rowData} updater={{updateRow: this.props.updater.updateRow}}/>
                    </div>
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
      this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onEditorStateChange(editorState){
        const newRowData = this.props.rowData;
        newRowData.value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.updater.updateRow(newRowData)

        this.setState({
            editorState
        });
    };
  
    render() {
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
        </div>        
      )
    }
}