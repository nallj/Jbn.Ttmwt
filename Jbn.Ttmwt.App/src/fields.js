import React, { Fragment } from 'react';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

export const AveragesRow = (props) => (
  <div className="form-group row">
    <label className="col-2 col-form-label col-form-label-sm">{props.leftLabel}</label>
    <div className="col-2 font-weight-bold">
      {isNaN(props.leftVal)
        ? 'Need trial data'
        : `${props.leftVal} ${props.metric}`}
    </div>

    <label className="col-2 offset-2 col-form-label col-form-label-sm">{props.rightLabel}</label>
    <div className="col-2 font-weight-bold">
      {isNaN(props.rightVal)
        ? 'Need trial data'
        : `${props.rightVal} ${props.metric}`}
    </div>
  </div>
);

export const ConditionalSummary = (props) => (
  props.summary
    ? <Fragment>
        <div className="row form-group">
          <label>
            Summary&nbsp;
            <small className="font-weight-light">Click to copy to clipboard.</small>
          </label>

          <p id="summary" className="form-control ptr-cursor inherit-height" onClick={props.handleSummaryClick} title="Click to copy text.">{props.summary}</p>
        </div>
        <button type="submit" className="btn btn-primary mb-5 ">Save Test Data</button>
      </Fragment>
    : <Fragment>
        <div className="row">
          <p className="font-italic font-weight-light">Key in all test fields to produce a test summary.</p>
        </div>
        <FieldErrorWarning isFormInvalid={props.isFormInvalid} />
      </Fragment>
);

const FieldErrorWarning = (props) => (
  props.isFormInvalid
    ? <div className="row">
        <p className="text-danger">All fields must be free of errors to generate a test summary.</p>
      </div>
    : ''
);

const InvalidSummary = (props) => (
  <div className="row">
    <p className="font-italic font-weight-light">Key in all test fields to produce a test summary.</p>
  </div>
);

export const FieldErrorCommon = (props) => (
  props.error
    ? <small className="text-danger col-10 offset-2">{props.error}</small>
    : ''
);

export const PaceField = (props) => (
  <Fragment>
    <label className={`col-2 col-form-label col-form-label-sm${props.isOffset ? ' offset-1' : ''}`}>
      {props.label}
    </label>
    <div className="col-3">
      <div className="input-group">
        <input className="form-control" id={props.fieldId} type="number" min="0" step="0.01" value={props.vm} onChange={props.onChangeFn} />

        <div className="input-group-append">
          <span className="input-group-text">sec</span>
        </div>
      </div>
      <PaceFieldError error={props.formError} />
    </div>
    
  </Fragment>
);

export const PaceFieldError = (props) => (
  props.error
    ? <small className="text-danger">{props.error}</small>
    : ''
);

export const TypeaheadField = (props) => (
  <div className="form-group row">
    <label className="col-2 col-form-label col-form-label-sm">{props.label}</label>
    <div className="col-10">
      <Typeahead
        allowNew
        onInputChange={props.onInputChangeFn}
        isInvalid={!!props.formError}
        onChange={props.onChangeFn}
        options={props.options}
      />
    </div>
    <FieldErrorCommon error={props.formError} />
  </div>
);