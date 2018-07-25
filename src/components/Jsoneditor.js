import React, { Component } from 'react';
import TitleArea from './TitleArea';
import Navigation from './Navigation';
import TextEditor from './TextEditor';
import WorkPanel from './WorkPanel';

class Jsoneditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      oldJSON: null
    }
    this.processedData = null;
    this.getDataArray = this.getDataArray.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  
  updateData(dataObj){
    if(!dataObj){return null};
    this.setState({oldJSON: dataObj})
  };

  getDataArray(dataArray){
    if(!dataArray){return null};
    this.processedData = dataArray;
  }

  render() {
    return (
      <div>
        <TitleArea />
        <Navigation updater={this.updateData} />
        <TextEditor data={this.state.oldJSON} updater={this.getDataArray} />
        <WorkPanel />
      </div>
    );
  }
}

export default Jsoneditor;
