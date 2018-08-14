import React, { Component } from 'react';
import TitleArea from './TitleArea';
import Navigation from './Navigation';
import TextEditor from './TextEditor';
import dataWorker from './DataWorker';
import WorkPanel from './WorkPanel';
import './Jsoneditor.css';

class Jsoneditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      workPanelIsOpen: false,
      oldJSON: null,
      jsonInArrey: null
    }
    this.rowDataToEdition = null;
    this.uploadDataFromJson = this.uploadDataFromJson.bind(this);
    this.updateRowInfo = this.updateRowInfo.bind(this);
    this.statusPanel = this.statusPanel.bind(this);
  }
  
  uploadDataFromJson(dataObj){
    if(!dataObj){return null};
    this.setState({
      oldJSON: dataObj, 
      jsonInArrey: dataWorker(dataObj)}
    );
  };

  updateRowInfo(info){
    this.rowDataToEdition = info;
    let rowNumber = info.positionInArray
    let rowNewValue = info.value
    const arreyReplacer = this.state.jsonInArrey
    arreyReplacer[rowNumber].value = rowNewValue
    this.setState({jsonInArrey: arreyReplacer})
  }

  statusPanel(){
    this.setState((prevState) => {
      return {workPanelIsOpen: !prevState.workPanelIsOpen};
    })
  };

  toggleWorkPanel(){
    if(this.state.workPanelIsOpen){
      return <WorkPanel
                updater={{panel: this.statusPanel, rowInfo: this.updateRowInfo}} 
                rowData={this.rowDataToEdition}
              />
    };
    return null
  };

  render() {
    return (
      <div className="topDiv">
        <TitleArea />
        <Navigation 
            updater={this.uploadDataFromJson} 
        />
        <TextEditor
            updater={{panel: this.statusPanel, rowInfo: this.updateRowInfo}}
            data={this.state.jsonInArrey}
        />
        {this.toggleWorkPanel()}
      </div>
    );
  }
}

export default Jsoneditor;
