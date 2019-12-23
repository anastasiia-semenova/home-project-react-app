import React from "react";
import LineChart from "./LineChart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feeds: null, startIndex: null, endIndex: null };
  }

  getDataFromAPI = () => {
    return fetch("http://localhost:8080/stocks/getAllCompanies").then(response => response.json());
  };

  componentDidMount() {
    this.getDataFromAPI()
      .then(data => {
        console.log(data);
        this.setState({ feeds: data });
      })
      .catch(error => {
        console.error("cannot get data from API");
      });
  }

  selectStartDate = startIndex => {
    this.setState({ startIndex: startIndex });
  };

  selectEndDate = endIndex => {
    this.setState({ endIndex: endIndex });
  };

  render() {
    return (
      <div className="App">
        <h2>Comparison chart</h2>
        {this.state.feeds && (
          <div>
            <label htmlFor="startDate">Start Date</label>
            <select id="startDate" onChange={e => this.selectStartDate(e.target.value)}>
              <option value="">All dates</option>
              {this.state.feeds.dates.map((date, index) => (
                <option key={date} value={index} disabled={ this.state.endIndex && index >= this.state.endIndex && 'true'}>
                  {date}
                </option>
              ))}
            </select>
            <label htmlFor="endDate">End Date</label>
            <select id="endDate" onChange={e => this.selectEndDate(e.target.value)}>
              <option value="">All dates</option>
              {this.state.feeds.dates.map((date, index) => (
                <option key={date} value={index} disabled={index <= this.state.startIndex && 'true'}>
                  {date}
                </option>
              ))}
            </select>
            <LineChart feeds={this.state.feeds} startIndex={this.state.startIndex} endIndex={this.state.endIndex} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
