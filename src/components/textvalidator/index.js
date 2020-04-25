import React, { Fragment } from 'react';
import { ValidatorComponent } from 'react-form-validator-core';

class TextValidator extends ValidatorComponent {
  errorText() {
    const { isValid } = this.state;
    if (isValid) {
      return null;
    }
    return (
      <div
        style={{
          color: 'red',
          width: '180px',
          fontSize: '15px',
          textAlign: 'center',
          position: 'absolute',
          left: '100%',
          top: '5px',
          paddingLeft: '4px',
        }}
      >
        {this.getErrorMessage()}
      </div>
    );
  }
  render() {
    const {
      errorMessages,
      validators,
      requiredError,
      validatorListener,
      ...rest
    } = this.props;
    return (
      <Fragment>
        <input
          {...rest}
          ref={(r) => {
            this.input = r;
          }}
        />
        {this.errorText()}
      </Fragment>
    );
  }
}
export default TextValidator;
