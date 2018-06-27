import React, { Component } from 'react';
import './Navigation.css';
// import jsonSrc from '../content/test.json';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            jsonFile: null
        };
        this.loadData = this.loadData.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    };

    uploadFile(event){
        let file = event.target.files[0];
        let fileReader; 
        fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            let loadContnet = fileReader.result;
            this.setState({data: loadContnet});
        };
        fileReader.readAsText(file);
    }

    loadData(){
        console.log(this.state.data);
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
                >upload file</button>
            </div>
        );
    };
};

export default Navigation;