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
        this.handleChange = this.handleChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.fileInput = React.createRef();
    };

    render(){
        console.log(this.state.jsonFile)
        return(
            <div className="navigation">
                <form>
                  <label>
                    <input 
                        type="file"
                        accept=".json" 
                        onChange={ (e) => {this.handleChange(e.target.files[0].mozFullPath)} }
                    />
                  </label>
                  <button 
                      className="nav_el" 
                      onClick={this.loadData}
                  >upload file</button>
                </form>
            </div>
        );
    };

    handleChange(chosenFile){
        this.setState({jsonFile: chosenFile})
    }
    loadData(event){
        event.preventDefault();
        fetch(this.state.jsonFile)
            .then(response => {
                console.log(response)
                console.log(this.state.jsonFile)
                response.json()
            })
            .then(data => {
                this.setState({data: data })
                console.log(this.state.data)
        })
            .catch(err => console.error(this.props.url, err.toString()))
    }
};

export default Navigation;