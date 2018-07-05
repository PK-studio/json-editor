import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            originalData: null,
        };
        this.loadData = this.loadData.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    };

    uploadFile(event){
        let file = event.target.files[0];
        let fileReader; 
        fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onloadend = (e) => {
            let fileContnet = JSON.parse(fileReader.result);
            this.setState({originalData: fileContnet});
        };
    }

    loadData(){
        let dataObj = new Object();
        dataObj.old = this.state.originalData;
        this.props.updater(dataObj)
    }

    render(){
        return(
            <div className="navigation">
                <form className="nav_el">
                  <label>
                    <input 
                        type="file"
                        accept=".json" 
                        onChange={this.uploadFile}
                    />
                  </label>
                </form>
                <button 
                    className="nav_el" 
                    onClick={this.loadData}
                >upload file data</button>
            </div>
        );
    };
};

export default Navigation;