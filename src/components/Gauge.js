import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default class Gauge extends Component {
	
    render() {
		var num = (this.props.value * 100).toFixed(1);
		return (
			<div style={{
				width: "20em",
				height: "19em"
			}}>
			<ReactSpeedometer
				dimensionUnit="em"
				fluidWidth={true}
				needleHeightRatio={0.7}
				value={this.props.value * 1000}
				currentValueText={`${this.props.title}: ${num}%`}
				customSegmentLabels={[
			{
				text: "Very Low",
				position: "INSIDE",
				color: "#555",
			},
			{
				text: "Low",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "Ok",
				position: "INSIDE",
				color: "#555",
				fontSize: "19px"
			},
			{
				text: "High",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "Very High",
				position: "INSIDE",
				color: "#555"
			}
				]}
				ringWidth={47}
				needleTransitionDuration={3333}
				needleTransition="easeElastic"
				needleColor={"#90f2ff"}
				textColor={"#000000"}
			/>
			</div>
		);
    }
}
