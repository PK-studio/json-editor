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
      oldJSON: null
    }
    this.processedData = null;
    this.rowDataToEdition = null;
    this.updateData = this.updateData.bind(this);
    this.updateRowInfo = this.updateRowInfo.bind(this);
    this.statusPanel = this.statusPanel.bind(this);
  }
  
  updateData(dataObj){
    if(!dataObj){return null};
    this.setState({oldJSON: dataObj});
    this.processedData = dataWorker(dataObj);
  };

  updateRowInfo(info){
    this.rowDataToEdition = info;
    console.log(info)
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
            updater={this.updateData} 
        />
        <TextEditor 
            updater={{panel: this.statusPanel, rowInfo: this.updateRowInfo}}
            data={this.processedData}
        />
        {this.toggleWorkPanel()}
      </div>
    );
  }
}

export default Jsoneditor;
