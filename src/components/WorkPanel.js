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
        this.props.updater.rowInfo(null);
    }

    render(){
        return (
            <div className="overlayer" onClick={this.closePanel}>
                <div className="panel">
                    <p>{this.props.rowData.value}</p>
                </div>
            </div>
        );
    };
};

export default WorkPanel;