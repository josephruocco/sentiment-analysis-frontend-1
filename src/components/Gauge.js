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
				text: "Unlikely",
				position: "INSIDE",
				color: "#555",
			},
			{
				text: "Unlikely",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "Low",
				position: "INSIDE",
				color: "#555",
				fontSize: "19px"
			},
			{
				text: "Maybe",
				position: "INSIDE",
				color: "#555"
			},
			{
				text: "High",
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
