import React from "react";

const today = new Date().toISOString().split("T")[0];

interface cssClasses {
    inputClassName:string;
    labelClassName:string;
    sectionClassName:string;
}

function genInput(inputClassName:string, type: string, name:string, placeholder:string, setDefDate:boolean):JSX.Element {
    if (type === 'date') {
        if (setDefDate) {
            return (<input className={`input ${inputClassName}`}
                           name={name}
                           id={name}
                           type={type}
                           placeholder={placeholder}
                           max={today}
                           defaultValue={today}
                           required/>
            )
        } else {
            return (<input className={`input ${inputClassName}`}
                           name={name}
                           id={name}
                           type={type}
                           placeholder={placeholder}
                           max={today}
                           required/>
            )
        }
    } else {
        return (<input className={`input ${inputClassName}`}
                       name={name}
                       id={name}
                       type={type}
                       placeholder={placeholder}
                       required/>)
    }
}

function createFormInput(classes: cssClasses,
                         name: string,
                         type: string,
                         text: string,
                         placeholder: string = '',
                         setDefDate: boolean = false): JSX.Element {
    return (<div className={`inputSection ${classes.sectionClassName}`}>
        <label className={`label ${classes.labelClassName}`} htmlFor={name}>
            {text}
        </label>
        {genInput(classes.inputClassName,type, name, placeholder, setDefDate)}
    </div>)
}

export default createFormInput;
