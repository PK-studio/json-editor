import React, { Component } from 'react';

class WorkPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueToEdit: null
        }
        this.openWorkPanel = this.openWorkPanel.bind(this);
    };

    openWorkPanel(value, fun){
        fun("test - fake value");
        this.setState({valueToEdit: value})
        // can't update state
        // WorkPanelSupp is not the component whcich we mount before
        // ? should I try SubPub 
    }
    
    render(){
        console.log("WorkPanel render")
        console.log(this.state.valueToEdit)
        return(
            <div><p>WorkPanel will be rendered here</p></div>
        );
    };

    componentWillUnMount(){};
};

export default WorkPanel;