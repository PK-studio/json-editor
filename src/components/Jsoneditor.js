import React, { Component } from 'react';
import TitleArea from './TitleArea';
import Navigation from './Navigation';
import TextEditor from './TextEditor';
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
    this.updateData = this.updateData.bind(this);
    this.getDataArray = this.getDataArray.bind(this);
    this.statusPanel = this.statusPanel.bind(this);
  }
  
  updateData(dataObj){
    if(!dataObj){return null};
    this.setState({oldJSON: dataObj});
  };

  getDataArray(dataArray){
    if(!dataArray){return null};
    this.processedData = dataArray;
  };

  statusPanel(){
    this.setState((prevState) => {
      return {workPanelIsOpen: !prevState.workPanelIsOpen};
    })
  };

  toggleWorkPanel(openIt){
    if(openIt){
      return <WorkPanel updater={{panel: this.statusPanel}}/>
    };
    return null
  };

  render() {
    return (
      <div className="topDiv">
        <TitleArea />
        <Navigation updater={this.updateData} />
        <TextEditor data={this.state.oldJSON} updater={{array: this.getDataArray, panel: this.statusPanel}} />
        {this.toggleWorkPanel(this.state.workPanelIsOpen)}
      </div>
    );
  }
}

export default Jsoneditor;
