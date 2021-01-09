import {useState} from "react";

function useForm(callback: Function) {
    const [inputs, setInputs] = useState({});

    const handleSubmit = (event: Event) => {
        if (event) {
            event.preventDefault()
        }
        callback();
    }

    const handleInputChange = (event: Event) => {
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
