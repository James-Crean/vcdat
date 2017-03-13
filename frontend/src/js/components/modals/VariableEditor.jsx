import {Nav, NavItem, Modal} from 'react-bootstrap'
import React, { Component } from 'react';
import FileExplorer from '../variables/FileExplorer.jsx';

export default class VariableEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            variable: props.variable,
            variableName: props.variableName,
        };
        if (this.state.variableName === undefined) {
            this.state.variableName = 'New Variable';
        }

        if (this.state.variable) {
            this.state.currentTab = "derived";
        } else {
            this.state.currentTab = "filesystem";
        }
    }
    handleSelect(newKey) {
        this.setState({currentTab: newKey});
    }
    render() {
        let widget = null;
        switch (this.state.currentTab) {
            case "filesystem":
                widget = (<FileExplorer />);
                break;
            case "derived":
            case "esgf":
            case "opendap":
                widget = (<p>Coming Soon</p>);
                break;
        }
        return (
            <Modal show={this.props.showing}>
                <Modal.Header>
                    <Modal.Title>{this.state.variableName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Nav bsStyle="tabs" activeKey={this.state.currentTab} onSelect={(k) => this.handleSelect(k)}>
                        <NavItem eventKey="filesystem">File System</NavItem>
                        <NavItem eventKey="derived">Derive</NavItem>
                        <NavItem eventKey="esgf">ESGF</NavItem>
                        <NavItem eventKey="opendap">OPeNDAP</NavItem>
                    </Nav>
                    <div>
                        {widget}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}
