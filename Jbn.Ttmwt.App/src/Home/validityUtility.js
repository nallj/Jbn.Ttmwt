
class validityUtility {
  
  constructor(subject, completionFn) {
    if (!subject.stateUtil) {
      throw 'Subject must have a State Utility named "stateUtil".';
    }

    this.stateUtil = subject.stateUtil;
    this.subject = subject;
    this.completionFn = completionFn;

    this.testDatepickerValidity = this.testDatepickerValidity.bind(this);
    this.testFieldValidityCommon = this.testFieldValidityCommon.bind(this);
    this.testFormCompletion = this.testFormCompletion.bind(this);
    this.testFormValidity = this.testFormValidity.bind(this);
    this.testPaceFieldValidity = this.testPaceFieldValidity.bind(this);
  }


  testDatepickerValidity(val) {
    this.testFieldValidityCommon('dateOfTest', val);
  }

  testFieldValidityCommon(fieldKey, val) {
    let formErrorVal = null;
    if (!val) {
      formErrorVal = 'This field cannot be empty.';
    }
    this.stateUtil.updateFormErrorValue(fieldKey, formErrorVal, this.testFormValidity);
  }

  testFormCompletion() {
    const state = this.subject.state;
    let summaryVal = '';

    if (!state.isFormInvalid) {
      let isComplete = true;

      for (const key in state.form) {
        if (state.ignoreCompletionFieldKeys.indexOf(key) != -1) {
          continue;
        }
        if (!state.form[key]) {
          isComplete = false;
          break;
        }
      }

      if (isComplete) {
        summaryVal = this.completionFn();
      }
    }
    this.stateUtil.updateFormValue('summary', summaryVal);
  }

  testFormValidity() {
    let isInvalid = false;
    for (const errorKey in this.subject.state.formErrors) {
      const error = this.subject.state.formErrors[errorKey];
      if (error) {
        isInvalid = true;
        break;
      }
    }
    this.stateUtil.updateStateValue('isFormInvalid', isInvalid, this.testFormCompletion);
  }

  testPaceFieldValidity(fieldKey, vmVal, val) {
    let formErrorVal = null;
    if (!vmVal) {
      formErrorVal = 'This field cannot be empty.';
    } else if (isNaN(val)) {
      formErrorVal = 'This field must be a number.';
    } else if (val === 0 || val < 0) {
      formErrorVal = 'This field must be greater than 0.';
    } else if (val > 9999.99) {
      formErrorVal = 'This value cannot be this large.';
    }

    this.stateUtil.updateFormErrorValue(fieldKey, formErrorVal, this.testFormValidity);
  }

}
export default validityUtility;