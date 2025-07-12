import { Component } from "react";

class ApiResults extends Component {
  render() {
    return (
      <div>
        <table className={"default-table"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>[Item 1]</td>
              <td>[Description1]</td>
            </tr>
            <tr>
              <td>[Item 2]</td>
              <td>[Description2]</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApiResults;
