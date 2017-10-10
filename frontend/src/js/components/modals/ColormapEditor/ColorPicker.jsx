import React, { Component } from 'react';

import reactCSS from 'reactcss'
import {CustomPicker} from 'react-color';
var { Saturation, Hue} = require('react-color/lib/components/common');

import CustomHuePointer from './CustomHuePointer.jsx'
import BasicColorSwatch from './BasicColorSwatch.jsx'
import CustomColorSwatch from './CustomColorSwatch.jsx'
import InputFields from './InputFields.jsx'


class ColorPicker extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const styles = reactCSS({
            'default': {
                colorPreview: {
                  width: '35px',
                  height: '35px',
                  borderRadius: '2px',
                  background: this.props.color.hex
                },
                swatch: {
                  padding: '2px',
                  background: '#fff',
                  borderRadius: '1px',
                  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                  display: 'inline-block',
                  cursor: 'pointer',
                },
                saturation:{
                    width: "200px",
                    height: "200px",
                    position: "relative",
                    float: "right",
                },
                hue:{
                    width: "25px",
                    height: "200px",
                    marginLeft: "15px",
                    position: "relative",
                    float: "right",
                },
            }
        });
        return(
            <div>
                <div className="clearfix">
                    <BasicColorSwatch 
                        {...this.props.color}
                        onChange={ this.props.onChange }
                    />
                    <div style={ styles.swatch }>
                        <div style={ styles.colorPreview } />
                    </div>
                    <div style={styles.hue}>
                        <Hue
                            {...this.props.color}
                            onChange={ this.props.onChange }
                            direction={"vertical"}
                            pointer={ CustomHuePointer }
                        />
                    </div>
                    <div style={styles.saturation}>
                        <Saturation
                            {...this.props.color}
                            onChange={ this.props.onChange }
                        />
                    </div>
                    <CustomColorSwatch
                        {...this.props.color}
                        onChange={ this.props.onChange }
                    />
                </div>
                <div className="clearfix">
                    <InputFields
                        {...this.props.color}
                        onChange={ this.props.onChange }
                    />
                </div>
            </div>
        )
    }
}

ColorPicker.PropTypes = {
    color: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
}

export default CustomPicker(ColorPicker);