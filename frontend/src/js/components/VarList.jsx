import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddEditRemoveNav from './AddEditRemoveNav/AddEditRemoveNav.jsx'
import CachedFiles from './modals/CachedFiles/CachedFiles.jsx'
import { DragSource } from 'react-dnd'
import DragAndDropTypes from '../constants/DragAndDropTypes.js'
import EditVariable from "./modals/EditVariable.jsx"
import { toast } from "react-toastify"

var varSource = {
    beginDrag: function (props) {
        return {
            'variable': props.variable,
        };
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}


function VariableItem(props) {
    return props.connectDragSource(
        <li className={props.active ? "active" : ""} onClick={() => {props.selectVariable(props.variable)}}>
            <a>{props.variable}</a>
        </li>
    );
}

const DraggableVariable = DragSource(DragAndDropTypes.VAR, varSource, collect)(VariableItem);

class VarList extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFile: false,
            showEdit: false
        }
        this.editVariable = this.editVariable.bind(this)
        this.removeVariable = this.removeVariable.bind(this)
    }
    
    editVariable() {
        if(this.state.active_variable){
            this.setState({ showFile: false, showEdit: true })
        }
        else{
            toast.info("A variable must be selected to edit", { position: toast.POSITION.BOTTOM_CENTER })
        }
    }

    removeVariable() {
        if(this.state.active_variable){
            this.props.removeVariable(this.state.active_variable)
        }
        else{
            toast.info("A variable must be selected to delete", { position: toast.POSITION.BOTTOM_CENTER })
        }
    }

    render() {
        return (
            <div className='left-side-list scroll-area-list-parent var-list-container'>
                <AddEditRemoveNav 
                    title='Variables'
                    addAction={()=>this.setState({ showFile: true, showEdit: false })} 
                    editAction={()=>this.editVariable()}
                    removeAction={()=>this.removeVariable()}
                    addText="Load a variable"
                    editText="Edit a loaded variable"
                    removeText="Remove a loaded variable"
                />
                <div className='scroll-area'>
                    <ul id='var-list' className='no-bullets left-list'>
                        {Object.keys(this.props.variables).map((value, index) => {
                            return(
                                <DraggableVariable 
                                    key={index}
                                    variable={value}
                                    active={value === this.state.active_variable}
                                    selectVariable={(v) => {
                                        this.setState({active_variable: v}) 
                                    }}
                                />
                            ) 
                        })}
                    </ul>
                </div>
                <CachedFiles
                    show={this.state.showFile}
                    onTryClose={()=>this.setState({ showFile: false })}
                    curVariables={this.props.variables}
                    loadVariables={this.props.loadVariables}
                    cachedFiles={this.props.cachedFiles}
                />
                {
                    this.state.showEdit &&
                    <EditVariable 
                        show={this.state.showEdit}
                        onTryClose={()=>this.setState({ showEdit: false })}
                        active_variable={this.state.active_variable}
                    />
                }
            </div>
        )
    }
}

VarList.propTypes = {
    cachedFiles: PropTypes.object,
    loadVariables: PropTypes.func,
    variables: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    removeVariable: PropTypes.func,
}

export default VarList;
