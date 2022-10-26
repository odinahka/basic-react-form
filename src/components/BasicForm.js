import useInput from "../hooks/use-input";

const validateEmail = (enteredEmail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(enteredEmail);
};

const BasicForm = (props) => {
  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    enteredValue: enteredFirstName,
    enteredValueIsValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    valueBlurHandler: firstNameBlurHandler,
    valueChangeHandler: firstNameChangeHandler,
    reset: resetFirstName,
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredLastName,
    enteredValueIsValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    valueBlurHandler: lastNameBlurHandler,
    valueChangeHandler: lastNameChangeHandler,
    reset: resetLastName,
  } = useInput(value => value.trim() !== '');

  const formSubmitHandler = (event) =>{
    firstNameBlurHandler(event);
    lastNameBlurHandler(event);
    emailBlurHandler(event);
    if(!formIsValid){
      return;
    }
    resetLastName();
    resetEmail();
    resetFirstName();
  }


  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }


  const firstNameInputClasses = !enteredFirstNameHasError
  ? "form-control"
  : "form-control invalid";

  const lastNameInputClasses = !enteredLastNameHasError
  ? "form-control"
  : "form-control invalid";

const emailInputClasses = !enteredEmailHasError
  ? "form-control"
  : "form-control invalid";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input value={enteredFirstName} type="text" id="name" onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
          {enteredFirstNameHasError && <p className="error-text">First Name must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input value={enteredLastName} type="text" id="name"  onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler}/>
          {enteredLastNameHasError && <p className="error-text">Last Name must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input value={enteredEmail} type="email" id="email" onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
        {enteredEmailHasError && <p className="error-text">Email address not valid ( eg. abc@def.ghi)</p>}
      </div>
      <div className="form-actions">
        <button type="submit" disabled= {!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
