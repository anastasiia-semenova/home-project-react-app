import React from "react";
import Chart from "chart.js";

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.slice(this.props.feeds.dates);
    this.myChart.data.datasets = this.getDataSets();
    this.myChart.update();
  }

  getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  getDataSets = () => {
    const { feeds } = this.props;
    const sets = Object.keys(feeds.prices).map(key => {
      const colour = this.getRandomColor();
      return {
        label: key,
        data: this.slice(feeds.prices[key]),
        fill: "none",
        backgroundColor: colour,
        pointRadius: 2,
        borderColor: colour,
        borderWidth: 1,
        lineTension: 0
      };
    });
    console.log(sets);
    return sets;
  };

  slice = array => {
    const { startIndex, endIndex, feeds } = this.props;
    const endElement = parseInt(endIndex || feeds.dates.length) + 1;
    return array.slice(startIndex || 0, endElement || feeds.dates.length)
  };

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "week"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.feeds.dates,
        datasets: this.getDataSets()
      }
    });
  }

  render() {
    return (
      <div className="lineChart">
        <p>Chart</p>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}
