import React from 'react';
import classes from './Input.css'
const Input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input   onChange={props.onChangeHandler} className={classes.InputElement} value={props.value} {...props.elementConfig}/>;
            break
        case 'select':
            inputElement = <select  onChange={props.onChangeHandler} className={classes.InputElement} value={props.value}>
                {props.elementConfig.options.map(option =>(
                    <option key={option.value}  value={option.value}>{option.displayName }</option>
                ))}
            </select>;
            break
            case 'textarea':
                inputElement = <textarea   onChange={props.onChangeHandler} className={classes.InputElement} value={props.value} {...props.elementConfig}/>
                break
        default:
             inputElement = <input   onChange={props.onChangeHandler} className={classes.InputElement} value={props.value} {...props.elementConfig}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label} htmlFor="">{props.label}</label>
            {inputElement}
        </div>
        )

};

export default Input;