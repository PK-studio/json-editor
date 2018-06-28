import React, { Component } from 'react';
import TitleArea from './TitleArea';
import Navigation from './Navigation';
import TextEditor from './TextEditor';

const PubSub = {
  list: {},
  subscribe: function(listName, fn){
      this.list[listName] = this.list[listName] || [];
      this.list[listName].push(fn);
  },
  unscubscribe: function(listName, fn){
      if(this.list[listName]){
          for(var i = 0; i < this.list[listName].length; i++){
             if(this.list[listName][i] === fn){
                 this.list[listName].split(i, 1);
                 break;
             } 
          }
      }
  },
  publish: function(listName, data){
      if (this.list[listName]) {
          this.list[listName].forEach(function(fn){
              fn(data)
          });
      };
  },
  show: function(){
    console.log(this.list);
  }
}

class Jsoneditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      oldContent: null,
      newContent: null
    }
  }
  
  updateData(dataObj){
    if(!dataObj){
      return null
    }
    let oldData = dataObj.oldContent || this.state.oldContent
    let newData = dataObj.newContent || this.state.newContent
    this.setState({
      oldContent: oldData,
      newContent: newData
    })
    console.log("updateData: ", this.state.oldContent, this.state.newContent)
  }

  render() {
    return (
      <div>
        <TitleArea />
        <Navigation updater={this.updateData}/>
        <TextEditor />
      </div>
    );
  }
}

export default Jsoneditor;
