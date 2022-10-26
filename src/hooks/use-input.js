import {useReducer} from 'react';

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT'){
      return { value: action.value, isTouched: state.isTouched}  
    }
    if(action.type === 'BLUR'){
      return {isTouched: true, value: state.value}
    }
    if(action.type === 'RESET'){
        return initialInputState;
    }
    

    return initialInputState;
};

const useInput = (validateValue) => {
    // const [enteredValue, setEnteredValue] = useState('');
    // const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);

   const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)
    
//   const enteredValueIsValid = validateValue(enteredValue);
//   const hasError = !enteredValueIsValid && enteredValueIsTouched;


  const enteredValueIsValid = validateValue(inputState.value);
  const hasError = !enteredValueIsValid && inputState.isTouched;


  const valueChangeHandler = event => {
      dispatch({type: 'INPUT', value: event.target.value});
    //setEnteredValue(event.target.value);
    
  };
  const valueBlurHandler = event => {
      dispatch({type: 'BLUR'});
    //setEnteredValueIsTouched(true);

  }

  const reset = () => {
      dispatch({type: 'RESET'});
      //setEnteredValue('');
      //setEnteredValueIsTouched(false);
  }

  return {
      enteredValue: inputState.value, hasError, valueChangeHandler, valueBlurHandler, enteredValueIsValid, reset
  }

};

export default useInput;