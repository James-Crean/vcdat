import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import './CachedFiles.scss'
import FileTab from './Tabs/FileTab.jsx'
// import Esgf from './Tabs/EsgfTab.jsx'
// import OpendapTab from './Tabs/OpendapTab.jsx'
import TabBar from '../../TabBar/TabBar.jsx'

class CachedFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_tab: 0,
            tabs: [
                {
                    id: "file",
                    display_name: "File",
                },
                {
                    id: "esgf",
                    display_name: "ESGF",
                    disabled: true,
                },
                {
                    id: "opendap",
                    display_name: "OpenDAP",
                    disabled: true,
                },
            ]
        }
        this.switchTab = this.switchTab.bind(this)
    }

    switchTab(index){
        this.setState({ selected_tab: index})
    }

    render() {
        return (
            <Modal className='cached-files' bsSize="large" show={this.props.show} onHide={this.props.onTryClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.selected_tab === 3 ? "Variable Info" : "Load Variable"}</Modal.Title>
                </Modal.Header>
                <TabBar tabs={this.state.tabs} selected_tab={this.state.selected_tab} switchTab={this.switchTab} />
                    {
                        this.state.selected_tab == 1 ? <div className="Dummy-esgf-component">ESGF</div> :
                        this.state.selected_tab == 2 ? <div className="Dummy-opendap-component">OpenDAP</div> :
                        <FileTab {...this.props} />
                    }
            </Modal>
        )
    }
}

CachedFiles.propTypes = {
    show: PropTypes.bool.isRequired,
    onTryClose: PropTypes.func.isRequired,
}

export default CachedFiles
