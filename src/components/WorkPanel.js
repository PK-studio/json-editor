import React, { Component } from 'react';
import './WorkPanel.css';

class WorkPanel extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.closePanel = this.closePanel.bind(this);
    };
    
    closePanel(event){
        event.preventDefault();
        this.props.updater.panel();
    }

    render(){
        return(
            <div className="overlayer" onClick={this.closePanel}>
                <div className="panel">
                    <p>WorkPanel will be rendered here</p>
                </div>
            </div>
        );
    };
};

export default WorkPanel;