import React, { Component } from 'react';

const ConditinalParagraph = (props) => (
  props.show ?
    <p>No records exist yet!</p>
    : ''
);

const RecordElements = (props) => props.records.map(x =>
  <div className="row">
    <div className="col-9">
      <p onClick={props.onSummaryClick}>{x.summary}</p>
    </div>
    <div className="col-3">
      <button className="btn btn-danger" disabled={x.disabled} onClick={props.onButtonClick.bind(this, x.id)}>Delete Record</button>
    </div>
  </div>
);

class Records extends Component {

  constructor(props) {
    super(props);
    
    this.apiClient = props.apiClient;
    this.state = {
      records: []
    };

    this.handleError = this.props.events.error;
    this.handleDelete = this.handleDelete.bind(this);
  }


  componentDidMount() {
    const getRecords = this.apiClient.getRecords()
      .then(x => this.setState({ records: x }))
      .catch(this.handleError);
  }

  disableRecord(id, postSetFn) {
    const targetRecordIndex = this.getRecordIndex(id);
    const records = this.state.records;
    records[targetRecordIndex].disabled = true;
    this.setState({ records: records }, postSetFn);
  }

  getRecordIndex(id) {
    const records = this.state.records;
    const targetRecordIndex = records
      .findIndex(x => x.id == id);
    if (targetRecordIndex == -1) {
      throw "Target records doesn't exist.";
    }
    return targetRecordIndex;
  }

  handleDelete(id) {
    const deleteCall = () => this.apiClient.deleteRecord(id)
      .then(() => this.removeRecord(id))
      .catch(this.handleError);
    this.disableRecord(id, deleteCall);
  }

  handleRecordClick(event) {
    const range = document.createRange();
    const selection = window.getSelection();
    
    range.selectNodeContents(event.target);

    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }

  removeRecord(id) {
    const targetRecordIndex = this.getRecordIndex(id);
    const records = this.state.records;

    records.splice(targetRecordIndex, 1);
    this.setState({ records: records });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-4 mb-3">Records</h2>

        <ConditinalParagraph show={!this.state.records.length} />

        <RecordElements records={this.state.records} onButtonClick={this.handleDelete} onSummaryClick={this.handleRecordClick} />
      </div>
    );
  }

}
export default Records;