import React, {useState} from "react";
import './AddSingleVisitPage.scss';
import '../../scss/form.scss';
import '../../scss/button.scss';
import useForm from "../../hooks/useForm";


import {Redirect} from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import SingleVisitType from "../../models/singleVisitType";
import saveSingleVisitType from "../../api/singleVisit/saveSingleVisitType";

function AddSingleVisitPage(): JSX.Element {

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleCallback = () => {
        setLoading(true)


        let form = document.getElementById('addSingleVisitForm') as HTMLFormElement;

        saveSingleVisitType(visitModel)
            .then(() => {
                setLoading(false)
                setRedirect(true)
                form.reset();
            })
            .catch(err => {
                setLoading(false)
                alert(err)
            })
    }

    const {inputs, handleSubmit, handleInputChange} = useForm(handleCallback)
    let visitModel = inputs as SingleVisitType

    if (loading) {
        return (<div className={'loadIndicator'}>
            <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
        </div>)
    }

    if (redirect) {
        return (<Redirect to={'/settings'}/>)
    }

    return (<div className={'addSingleVisitWrapper'}>
        <form id={'addSingleVisitForm'} className={'form addSingleVisitForm'} onSubmit={handleSubmit}>
            <div className={`inputSection inputSectionAddSingleVisit`}>
                <label htmlFor="visitName" className={'label'}>
                    Название посещения
                </label>
                <input type={'text'}
                       id={'visitName'}
                       name={'visitName'}
                       className={'input'}
                       placeholder={'Введите название посещения'}
                       required
                       onChange={handleInputChange}
                />
            </div>
            <div className={`inputSection inputSectionAddSingleVisit`}>
                <label htmlFor="cost" className={'label'}>
                    Стоимость в рублях
                </label>
                <input type={'number'}
                       id={'cost'}
                       name={'cost'}
                       className={'input'}
                       min={1}
                       placeholder={'1000'}
                       required
                       onChange={handleInputChange}
                />
            </div>
            <button className={'button addSingleVisitButton'}>
                Создать посещение
            </button>
        </form>
    </div>)
}

export default AddSingleVisitPage;

