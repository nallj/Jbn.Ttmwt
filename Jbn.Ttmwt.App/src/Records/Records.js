import React, { Component } from 'react';

import { handleCopyClick } from '../shared';
import { ConditinalParagraph, RecordElements } from './elements';

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

        <RecordElements records={this.state.records} onButtonClick={this.handleDelete} onSummaryClick={handleCopyClick} />
      </div>
    );
  }

}
export default Records;