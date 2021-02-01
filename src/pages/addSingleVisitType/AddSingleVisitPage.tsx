import React, {useEffect, useState} from "react";
import './AddSingleVisitPage.scss';
import '../../scss/form.scss';
import '../../scss/button.scss';
import useForm from "../../hooks/useForm";


import {Redirect, useHistory} from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import SingleVisitType from "../../models/singleVisitType";
import saveSingleVisitType from "../../api/singleVisit/saveSingleVisitType";
import getSingleVisitType from "../../api/singleVisit/getSingleVisitType";

function AddSingleVisitPage(): JSX.Element {
    const [loading, setLoading] = useState(false)
    let history = useHistory()
    let params = new URLSearchParams(history.location.search)
    let modifyId = params.get('modify');


    const [typeInfo, setTypeInfo] = useState<SingleVisitType | undefined>(undefined);

   useEffect(() => {
       if (modifyId) {
           setLoading(true);
           getSingleVisitType(modifyId)
               .then(data => {
                   setTypeInfo(data);
                   setLoading(false);
               })
               .catch(err => {
                   setLoading(false);
                   alert(err);
               })
       }
   }, [modifyId])





    const [redirect, setRedirect] = useState(false)


    const handleCallback = () => {
        let form = document.getElementById('addSingleVisitForm') as HTMLFormElement;
        visitModel = inputs as SingleVisitType;
        if (!visitModel.cost && typeInfo) {
            visitModel.cost = typeInfo.cost;
        }
        if (!visitModel.visitName && typeInfo) {
            visitModel.visitName = typeInfo.visitName;
        }
        if (!visitModel._id && typeInfo) {
            visitModel._id = typeInfo._id;
        }
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

    let {inputs, handleSubmit, handleInputChange} = useForm(handleCallback)
    let visitModel = inputs as SingleVisitType;


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
                       defaultValue={typeInfo ? typeInfo.visitName : ''}
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
                       defaultValue={typeInfo ? typeInfo.cost : ''}
                       onChange={handleInputChange}
                />
            </div>
            <button className={'button addSingleVisitButton'}>
                {modifyId ? "Обновить посещение" : "Создать посещение"}
            </button>
        </form>
    </div>)
}

export default AddSingleVisitPage;

