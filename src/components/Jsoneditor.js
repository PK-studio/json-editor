import React, { Component } from 'react';
import TitleArea from './TitleArea';
import Navigation from './Navigation';
import TextEditor from './TextEditor';
import WorkPanel from './WorkPanel';

class Jsoneditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      oldContent: null,
      newContent: null
    }
    this.updateData = this.updateData.bind(this);
  }
  
  updateData(dataObj){
    if(!dataObj){
      return null
    };
    let oldData = dataObj.old || this.state.oldContent;
    let newData = dataObj.new || this.state.newContent;
    this.setState({
      oldContent: oldData,
      newContent: newData
    })
  }

  render() {
    return (
      <div>
        <TitleArea />
        <Navigation updater={this.updateData} />
        <TextEditor data={this.state.oldContent} updater={this.updateData} />
        <WorkPanel />
      </div>
    );
  }
}

export default Jsoneditor;
