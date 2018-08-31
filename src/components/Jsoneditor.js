import React, { Component } from 'react';
import InfoPanel from './InfoPanel';
import Navigation from './Navigation';
import Body from './Body';
import dataWorker from './Jsoneditor_DataWorker';
import saveJson from './Jsoneditor_saveJson';
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
    this.downloadJson = this.downloadJson.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.statusPanel = this.statusPanel.bind(this);
  }
  
  uploadDataFromJson(dataObj){
    if(!dataObj){return null};
    this.setState({
      oldJSON: dataObj, 
      jsonInArrey: dataWorker(dataObj)}
    );
  };

  downloadJson(){
    console.log("download")
    const jsonInArrey = this.props.jsonInArrey;
    if(!jsonInArrey) return;
    const newJson = saveJson(jsonInArrey);
    // const dataStr = "data:text/json;charset=utf-8," + JSON.stringify(newJson);
    // const fileName =  "new_file.json";
    // const dlAnchorElem = document.getElementById('downloadAnchorElem');
    // dlAnchorElem.setAttribute("href",     dataStr );
    // dlAnchorElem.setAttribute("download", fileName);
    // dlAnchorElem.click();
  }

  updateRow(data){
    this.rowDataToEdition = data;
    let rowNumber = data.positionInArray;
    let rowNewValue = data.value;
    const arreyReplacer = this.state.jsonInArrey;
    arreyReplacer[rowNumber].value = rowNewValue;
    this.setState({jsonInArrey: arreyReplacer});
  }

  statusPanel(){
    this.setState((prevState) => {
      return {workPanelIsOpen: !prevState.workPanelIsOpen};
    })
  };

  toggleWorkPanel(){
    if(this.state.workPanelIsOpen){
      return <WorkPanel
                updater={{panel: this.statusPanel, updateRow: this.updateRow}} 
                rowData={this.rowDataToEdition}
              />
    };
    return null
  };

  render() {
    return (
      <div className="topDiv">
        <InfoPanel />
        <Navigation 
            updater={this.uploadDataFromJson}
            downloadJson={this.downloadJson}
        />
        <Body
            updater={{panel: this.statusPanel, updateRow: this.updateRow}}
            data={this.state.jsonInArrey}
        />
        {this.toggleWorkPanel()}
      </div>
    );
  }
}

export default Jsoneditor;
