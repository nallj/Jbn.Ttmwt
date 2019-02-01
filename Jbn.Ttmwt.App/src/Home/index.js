import React, { Component } from 'react';

//import { Typeahead } from './typeahead';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class Home extends Component {

  constructor() {
    super();
    this.state = {
      mockProctors: [
        'John Doe',
        'Joe Schmo'
      ],
      selectedProctor: null,
      initDate: new Date()
    };
  }

  doSomething(target) {
    console.log('change', target);
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-2">Home</h2>
        <p>This is my home screen!</p>

        <div>
          <Typeahead
            allowNew={true}
            isInvalid={true}
            onChange={this.doSomething}
            options={this.state.mockProctors}
            selected={this.state.selectedProctor}
            ref={(typeahead) => this.typeahead = typeahead}
            onInputChange={(val) => { this.state.selectedProctor = val; console.log(this.state.selectedProctor) }}
          />
        </div>
        
        <div>
          <DatePicker
            selected={this.state.initDate}
            onChange={(val) => console.log(val)}
          />
        </div>

      </div>
    );
  }

}