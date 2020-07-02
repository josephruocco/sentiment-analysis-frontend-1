import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default class Gauge extends Component {
    render() {
	return (
		<div
	    style={{
		width: "500px",
		height: "300px",
		display: "inline-block",
	    }}
		>
		<ReactSpeedometer
            fluidWidth={true}
            needleHeightRatio={0.7}
            value={this.props.value * 1000}
            currentValueText={`${this.props.title}: ${this.props.value * 100}%`}
            needleTransitionDuration={3333}
            needleTransition="easeElastic"
            needleColor={"#90f2ff"}
            textColor={"#d8dee9"}
		/>
		</div>
	);
    }
}
