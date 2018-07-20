import React, { Component } from 'react';

class New extends Component {
    constructor(props){
        super(props)
    };

    getDerivedStateFromProps(props, state){};
        // 'static getDerivedStateFromProps' method calls immediately after mount component

    componentWillReceiveProps(nextProps) {
        // this will be called when it receive props,
        // Calling this.setState generally doesn’t trigger componentWillReceiveProps
    }

    componentDidMount(){};

    render(){
        return(
            <div></div>
        );
    };

    componentWillUnMount(){};
};

export default New;