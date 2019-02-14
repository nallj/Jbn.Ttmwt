
class stateUtility {

  constructor(subject) {
    this.subject = subject;
  }


  updateFormErrorValue(key, val, postSetFn) {
    const formObj = Object.assign({}, this.subject.state.formErrors, { [key]: val });
    this.updateStateValue('formErrors', formObj, postSetFn);
  }

  /**
   * Use when updating a singular form value on the state.
   * @param {string} key - Name of the form value.
   * @param {string} val - Value being assigned.
   * @param {function} postSetFn - Optional functionality to be performed after setState.
   */
  updateFormValue(key, val, postSetFn) {
    const formObj = Object.assign({}, this.subject.state.form, { [key]: val });
    this.updateStateValue('form', formObj, postSetFn);
  }

  /**
   * Use when updating multiple form values on the state.
   * @param {object} map - Name to value map.
   * @param {function} postSetFn - Optional functionality to be performed after setState.
   */
  updateMultipleFormValue(map, postSetFn) {
    const formObj = Object.assign({}, this.subject.state.form, map);
    this.updateStateValue('form', formObj, postSetFn);
  }

  updateMultipleTypeaheadOptions(map, postSetFn) {
    const formObj = Object.assign({}, this.subject.state.typeaheadOptions, map);
    this.updateStateValue('typeaheadOptions', formObj, postSetFn);
  }

  updateSaving(val, postSetFn) {
    this.updateStateValue('saving', val, postSetFn);
  }

  updateStateValue(key, val, postSetFn) {
    this.subject.setState({ [key]: val }, postSetFn);
  }

  updateVmValue(key, val) {
    const vmObj = Object.assign({}, this.subject.state.vm, { [key]: val });
    this.updateStateValue('vm', vmObj);
  }
  
}
export default stateUtility;