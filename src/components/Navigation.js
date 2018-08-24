import React, { Component } from 'react';
import './Navigation.css';
import testFile from '../content/test.json';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            originalData: null,
        };
        this.fileInput = React.createRef();
        this.loadData = this.loadData.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadTestingFile = this.loadTestingFile.bind(this);
    };

    uploadFile(event){
        let file = this.fileInput.current.files[0];
        if(file){
            let fileReader;
            fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onloadend = (e) => {
                let fileContnet = JSON.parse(fileReader.result);
                this.setState({originalData: fileContnet});
            };
        }
    }
    
    fileName(){
        if(this.fileInput.current != null){
            if(this.fileInput.current.files.length == 0){
                return "testing file"
            }else{
                return this.fileInput.current.files[0].name
            }
        }
        return "no file chosen"
    }

    loadData(){
        if(this.state.originalData == null) return;
        this.props.updater(this.state.originalData)
    }

    loadTestingFile(){
        this.props.updater(testFile)
    }

    render(){
        return(
            <div className="navigation">
                <label 
                    className="nav_test"
                    onClick={this.loadTestingFile}
                    >
                    Load testing file
                </label>            
                <form className="nav_el">
                    <label className="nav_input">
                        Choose file
                        <input 
                            type="file" 
                            ref={this.fileInput} 
                            accept=".json" 
                            onChange={this.uploadFile}
                        />
                    </label>
                </form>
                <p className="nav_fileName">{this.fileName()}</p>
                <label 
                    className="nav_el nav_input"
                    onClick={this.loadData}
                    >
                    Upload file data
                </label>
            </div>
        );
    };
};

export default Navigation;