
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    hasError: NameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    enteredValueIsValid: enteredNameIsValid,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');
  

  const validateEmail = (enteredEmail) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(enteredEmail);
  };

  const {
    enteredValue: enteredEmail,
    hasError: EnteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    enteredValueIsValid: enteredEmailIsValid,
    reset: resetEmailInput
  } = useInput(validateEmail);



  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }


  const formSumbitHandler = (event) => {
    event.preventDefault();

    emailBlurHandler(event);
    nameBlurHandler(event);
    if (!formIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    resetEmailInput();
    resetNameInput();
  };

  const nameInputClasses = !NameInputHasError
    ? "form-control"
    : "form-control invalid";
  const emailInputClasses = !EnteredEmailHasError
    ? "form-control"
    : "form-control invalid";
  return (
    <form onSubmit={formSumbitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {NameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {EnteredEmailHasError && (
          <p className="error-text">
            Email address not valid ( eg. abc@def.ghi)
          </p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
