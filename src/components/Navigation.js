import React, { Component } from 'react';
import './Navigation.css';
// import jsonSrc from '../content/test.json';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            jsonFile: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.upLoadData = this.upLoadData.bind(this);
        this.fileInput = React.createRef();
    };

    render(){
        console.log(this.state.jsonFile)
        return(
            <div className="navigation">
                <form onSubmit={this.upLoadData}>
                    <input 
                        type="file"
                        accept=".json" 
                        onChange={ (e) => {this.handleChange(e.target.files)} }
                    />
                    <button 
                        className="nav_el" 
                        type="submit" 
                        value="submit"
                    >upload file</button>
                </form>
            </div>
        );
    };

    handleChange(file){
        let fReader = new FileReader();
        let myFile = file[0];
        fReader.onload= () => {
            let data = JSON.parse(myFile);
            this.setState({jsonFile: data});
        }
        fReader.readAsText(file);
    }
    upLoadData(event){
    }
};

export default Navigation;