import React from 'react';

export const ConditinalParagraph = (props) => (
  props.show ?
    <p>No records exist yet!</p>
    : ''
);

export const RecordElements = (props) => props.records.map(x =>
  <div className="row" key={x.id}>
    <div className="col-9">
      <p onClick={props.onSummaryClick}>{x.summary}</p>
    </div>
    <div className="col-3">
      <button className="btn btn-danger" disabled={x.disabled} onClick={props.onButtonClick.bind(this, x.id)}>Delete Record</button>
    </div>
  </div>
);
