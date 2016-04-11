import React, { Component } from 'react';
import { render } from 'react-dom';

class Icon extends Component {
    render() {
        const {
            width: w,
            height: h,
        } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                preserveAspectRatio="xMidYMid meet"
                viewBox={[0,0,w,h].join(' ')}
                width={w} height={h}>
                <rect x="0" y="0" width="100%" height="100%" fill="#000"/>
            </svg>
        );
    }
}

const icons = document.getElementById('js-icons');
render(<Icon width="32" height="32"/>, icons);
