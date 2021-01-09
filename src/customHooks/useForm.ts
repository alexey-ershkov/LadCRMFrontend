import {ChangeEvent, FormEvent, useState} from "react";

function useForm(callback: Function) {
    const [inputs, setInputs] = useState({});

    const handleSubmit = (event: FormEvent) => {
        if (event) {
            event.preventDefault()
        }
        setInputs({})
        callback();
    }

    const handleInputChange = (event: ChangeEvent) => {
        if (event.target) {
            const {name, value} = event.target as HTMLInputElement;
            setInputs(inputs => ({...inputs, [name]: value}));
        }
    }

    return {
        inputs,
        handleSubmit,
        handleInputChange
    };
}

export default useForm;
