import React from 'react';
import InlineCss from 'react-inline-css';
import styles from './styles';
import {Input} from 'formsy-react-components';
import ColorPicker from 'react-color';

export default React.createClass({

  propTypes: {
    inputName: React.PropTypes.string.isRequired,
    initialColor: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      initialColor: '#fff'
    };
  },

  getInitialState() {
    return {
      showSelector: false,
      color: this.props.initialColor
    }
  },

  updateInput(color) {
    const colorVal = '#' + color.hex;
    this.setState({showSelector: false, color: colorVal});
    this.refs.input.setValue(colorVal);
  },

  updateColorFromInput(name, value) {
    this.setState({color: value});
  },

  toggleColorSelector() {
    this.setState({showSelector: !this.state.showSelector});
  },

  componentDidMount() {
    this.refs.input.setValue(this.state.color);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <Input
          name={this.props.inputName}
          label="Color"
          defaultValue={this.state.color}
          ref="input"
          onChange={this.updateColorFromInput} />
        <span 
          className="colorBox" 
          onClick={this.toggleColorSelector}
          style={{backgroundColor: this.state.color}} />
        {this.state.showSelector && (
          <ColorPicker 
            type="swatches" 
            color={this.state.color}
            onChange={this.updateInput} />
        )}
      </InlineCss>
    );
  }

});