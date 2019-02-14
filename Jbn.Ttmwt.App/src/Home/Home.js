import React, { Component, Fragment } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { AveragesRow, ConditionalSummary, FieldErrorCommon, PaceField, TypeaheadField } from './fields';
import { handleCopyClick } from '../shared';
import stateUtility from './stateUtility';
import validityUtility from './validityUtility';

class Home extends Component {
  
  constructor(props) {
    super(props);
    
    this.typeaheadRefs = {
      device: undefined,
      patient: undefined,
      proctor: undefined
    };

    this.apiClient = props.apiClient;
    this.state = {
      form: {
        proctor: '',
        patient: '',
        dateOfTest: new Date(),
        device: '',
        comfPace1: NaN,
        comfPace2: NaN,
        comfPaceAvgTime: NaN,
        comfPaceAvgSpeed: NaN,
        maxPace1: NaN,
        maxPace2: NaN,
        maxPaceAvgTime: NaN,
        maxPaceAvgSpeed: NaN,
        remarks: '',
        summary: ''
      },
      formErrors: {
        proctor: null,
        patient: null,
        dateOfTest: null,
        device: null,
        comfPace1: null,
        comfPace2: null,
        maxPace1: null,
        maxPace2: null
      },
      isFormInvalid: false,
      ignoreCompletionFieldKeys: ['comfPaceAvgTime', 'comfPaceAvgSpeed', 'maxPaceAvgTime', 'maxPaceAvgSpeed', 'remarks', 'summary'],
      saving: false,
      typeaheadOptions: {
        devices: [],
        patients: [],
        proctors: []
      },
      vm: {
        comfPace1: '',
        comfPace2: '',
        maxPace1: '',
        maxPace2: ''
      }
    };

    this.generateSummary = this.generateSummary.bind(this);
    this.handleError = this.props.events.error;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRemarksChange = this.handleRemarksChange.bind(this);

    this.stateUtil = new stateUtility(this);
    this.validUtil = new validityUtility(this, this.generateSummary);
  }


  addNewTypeaheadOptions(form, postSetFn) {
    const newOptions = Object.assign({}, this.state.typeaheadOptions);
    
    this.addOptionIfNotPresent(form, newOptions, 'device', 'devices');
    this.addOptionIfNotPresent(form, newOptions, 'patient', 'patients');
    this.addOptionIfNotPresent(form, newOptions, 'proctor', 'proctors');
    
    this.stateUtil.updateMultipleTypeaheadOptions(newOptions, postSetFn);
  }

  addOptionIfNotPresent(form, options, fromKey, toKey) {
    const formValue = form[fromKey];
    const exisiting = options[toKey];
    
    if (!exisiting.find(x => x == formValue)) {
      exisiting.push(formValue);
    }
  }
  
  clearForm(postSetFn) {
    const newForm = {
      proctor: '',
      patient: '',
      dateOfTest: new Date(),
      device: '',
      comfPace1: NaN,
      comfPace2: NaN,
      comfPaceAvgTime: NaN,
      comfPaceAvgSpeed: NaN,
      maxPace1: NaN,
      maxPace2: NaN,
      maxPaceAvgTime: NaN,
      maxPaceAvgSpeed: NaN,
      remarks: '',
      summary: ''
    };
    this.clearTypeaheads();
    this.setState({ form: newForm }, postSetFn);
  }

  clearTypeaheads() {
    this.typeaheadRefs.device.getInstance().clear();
    this.typeaheadRefs.patient.getInstance().clear();
    this.typeaheadRefs.proctor.getInstance().clear();
  }

  clearVm(postSetFn) {
    const newVm = {
      comfPace1: '',
      comfPace2: '',
      maxPace1: '',
      maxPace2: ''
    };
    this.setState({ vm: newVm }, postSetFn);
  }

  componentDidMount() {
    const p0 = this.apiClient.getExistingDevices();
    const p1 = this.apiClient.getExistingPatients();
    const p2 = this.apiClient.getExistingProctors();

    Promise
      .all([p0, p1, p2])
      .then(r => {
        const updates = {
          devices: r[0],
          patients: r[1],
          proctors: r[2]
        };
        this.stateUtil.updateMultipleTypeaheadOptions(updates);
      })
      .catch(this.handleError);
  }
  
  generateSummary() {
    const f = this.state.form;
    return `On the date of ${f.dateOfTest.toDateString()} the Timed Ten Meter Walk Test was administered by ${f.proctor} to the patient ${f.patient}${f.device == 'N/A' ? '' : ` with the assistance of a ${f.device}`}.  Two trials were attempted each at a comfortable walking pace and at the maximum walking pace.  In the "comfortable pace" trials the patient clocked in at ${f.comfPace1} sec and ${f.comfPace2} sec.  This averages up to ${f.comfPaceAvgTime} sec, or a speed of ${f.comfPaceAvgSpeed} m/s.  In the "maximum pace" trials the patient clocked in at ${f.maxPace1} sec and ${f.maxPace2} sec.  This averages up to ${f.maxPaceAvgTime} sec, or a speed of ${f.maxPaceAvgSpeed} m/s.${f.remarks ? `  Additional Remarks: ${f.remarks}` : ''}`;
  }

  handleAverageUpdateCommon(varPrefix) {
    const trial1 = this.state.form[varPrefix + 'Pace1'];
    const trial2 = this.state.form[varPrefix + 'Pace2'];

    if (!isNaN(trial1) && !isNaN(trial2)) {
      const avgTime = (trial1 + trial2) / 2;
      const avgSpeed = avgTime / 8;
      
      const updates = {
        [varPrefix + 'PaceAvgTime']: avgTime,
        [varPrefix + 'PaceAvgSpeed']: avgSpeed
      };
      this.stateUtil.updateMultipleFormValue(updates);

    } else {
      const updates = {
        [varPrefix + 'PaceAvgTime']: NaN,
        [varPrefix + 'PaceAvgSpeed']: NaN
      };
      this.stateUtil.updateMultipleFormValue(updates);
    }
  }

  handleComfortAverageUpdate() {
    this.handleAverageUpdateCommon('comf');
  }

  handleComfortPaceChange(event) {
    this.handleNumberInputChangeCommon(event, this.handleComfortAverageUpdate);
  }

  handleDateChange(val) {
    this.validUtil.testDatepickerValidity(val, this.generateSummary);
    this.stateUtil.updateFormValue('dateOfTest', val);
  }

  handleDeviceChange(val) {
    this.stateUtil.updateFormValue('device', val);
  }
  
  handleNumberInputChangeCommon(event, postSetFn) {

    const vmValue = event.target.value;
    const value = parseFloat(vmValue);

    const fieldKey = event.target.id;
    this.stateUtil.updateVmValue(fieldKey, vmValue);
    
    this.stateUtil.updateFormValue(fieldKey, value, postSetFn);
    this.validUtil.testPaceFieldValidity(fieldKey, vmValue, value, this.generateSummary);
  }

  handleMaxAverageUpdate() {
    this.handleAverageUpdateCommon('max');
  }

  handleMaxPaceChange(event) {
    this.handleNumberInputChangeCommon(event, this.handleMaxAverageUpdate);
  }

  handleRemarksChange(event) {
    const postUpdateFn = () =>
      this.validUtil.testFormValidity(this.generateSummary);
    this.stateUtil.updateFormValue('remarks', event.target.value, postUpdateFn);
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = this.state.form;
    const saveTest = () => this.apiClient.postTest(form)
      .then(x => this.addNewTypeaheadOptions(form, this.resetForm))
      .catch(this.handleError);

    // Update state then save the form.
    this.stateUtil.updateSaving(true, saveTest);
  }

  handleTypeaheadChangeCommon(fieldKey, target) {
    let value;
    if (Array.isArray(target)) {

      // If it's an empty array, allow the input change function to make the change.
      if (target.length == 0) {
        return;
      }

      const field = target[0];
      if (typeof field == 'string') {
        value = field;
        this.stateUtil.updateFormValue(fieldKey, field);
      } else {
        value = field.label;
        this.stateUtil.updateFormValue(fieldKey, field.label);
      }
    } else {
      value = target;
      this.stateUtil.updateFormValue(fieldKey, target);
    }
    this.validUtil.testFieldValidityCommon(fieldKey, value, this.generateSummary);
  }

  handleTypeaheadInputChangeCommon(fieldKey, val) {
    this.validUtil.testFieldValidityCommon(fieldKey, val, this.generateSummary);
    this.stateUtil.updateFormValue(fieldKey, val);
  }

  resetForm() {
    const stopSaving = () => this.setState({ saving: false });
    const clearVm = this.clearVm.bind(this, stopSaving);
    this.clearForm(clearVm);
  }

  setTypeaheadRef(key, typeahead) {
    this.typeaheadRefs[key] = typeahead;
  }


  render() {
    return (

      <div className={'container' + (this.state.typeaheadOptions.devices.devices ? '' : ' sadness')}>
        <h2 className="mt-4 mb-3">Test Form</h2>

        <form onSubmit={this.handleSubmit} autoComplete="off">

          <TypeaheadField
            fieldKey="proctor"
            formError={this.state.formErrors.proctor}
            label="Proctor"
            onChangeFn={this.handleTypeaheadChangeCommon.bind(this, 'proctor')}
            onInputChangeFn={this.handleTypeaheadInputChangeCommon.bind(this, 'proctor')}
            options={this.state.typeaheadOptions.proctors}
            refSetter={this.setTypeaheadRef.bind(this, 'proctor')}
          />

          <TypeaheadField
            fieldKey="patient"
            formError={this.state.formErrors.patient}
            label="Patient"
            onChangeFn={this.handleTypeaheadChangeCommon.bind(this, 'patient')}
            onInputChangeFn={this.handleTypeaheadInputChangeCommon.bind(this, 'patient')}
            options={this.state.typeaheadOptions.patients}
            refSetter={this.setTypeaheadRef.bind(this, 'patient')}
          />
          
          <div className="form-group row">
            <label className="col-2 col-form-label col-form-label-sm">Date of Test</label>
            <div className="col-10">
              <DatePicker
                selected={this.state.form.dateOfTest}
                onChange={this.handleDateChange}
                className={`form-control${!!this.state.formErrors.dateOfTest ? '  is-invalid' : ''}`}
              />
            </div>
            <FieldErrorCommon error={this.state.formErrors.dateOfTest} />
          </div>
          
          <TypeaheadField
            fieldKey="device"
            formError={this.state.formErrors.device}
            label="Device"
            onChangeFn={this.handleTypeaheadChangeCommon.bind(this, 'device')}
            onInputChangeFn={this.handleTypeaheadInputChangeCommon.bind(this, 'device')}
            options={this.state.typeaheadOptions.devices}
            refSetter={this.setTypeaheadRef.bind(this, 'device')}
          />
          
          <div className="form-group row">
            <PaceField
              fieldId="comfPace1"
              formError={this.state.formErrors.comfPace1}
              label="Comfortable Pace 1"
              onChangeFn={this.handleComfortPaceChange.bind(this)}
              vm={this.state.vm.comfPace1}
            />

            <PaceField
              fieldId="maxPace1"
              formError={this.state.formErrors.maxPace1}
              isOffset
              label="Max Pace 1"
              onChangeFn={this.handleMaxPaceChange.bind(this)}
              vm={this.state.vm.maxPace1}
            />
          </div>

          <div className="form-group row">
            <PaceField
              fieldId="comfPace2"
              formError={this.state.formErrors.comfPace2}
              label="Comfortable Pace 2"
              onChangeFn={this.handleComfortPaceChange.bind(this)}
              vm={this.state.vm.comfPace2}
            />

            <PaceField
              fieldId="maxPace2"
              formError={this.state.formErrors.maxPace2}
              isOffset
              label="Max Pace 2"
              onChangeFn={this.handleMaxPaceChange.bind(this)}
              vm={this.state.vm.maxPace2}
            />
          </div>

          <AveragesRow
            leftLabel="Comfortable Average Time"
            leftVal={this.state.form.comfPaceAvgTime}
            metric="sec"
            rightLabel="Max Average Time"
            rightVal={this.state.form.maxPaceAvgTime}
          />

          <AveragesRow
            leftLabel="Comfortable Average Speed"
            leftVal={this.state.form.comfPaceAvgSpeed}
            metric="m/s"
            rightLabel="Max Average Speed"
            rightVal={this.state.form.maxPaceAvgSpeed}
          />

          <div className="row form-group">
            <label>
              Remarks&nbsp;
              <small className="font-weight-light">Optional</small>
            </label>
            <textarea id="remarks" className="form-control" rows="5" value={this.state.form.remarks} onChange={this.handleRemarksChange} />
          </div>

          <ConditionalSummary
            handleSummaryClick={handleCopyClick}
            isFormInvalid={this.state.isFormInvalid}
            summary={this.state.form.summary}
            disabled={this.state.saving}
          />
          
        </form>
      </div>
    );
  }

}
export default Home;