import React, {useState} from "react";
import './AddSubPage.scss';
import '../../scss/form.scss';
import '../../scss/button.scss';
import useForm from "../../hooks/useForm";
import SubType from "../../models/subType";
import saveSubType from "../../api/sub/saveSubType";
import {Redirect} from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";

function AddSubPage(): JSX.Element {

    const [isInf, setIsInf] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleCheck = () => {
        if (!isInf) {
            const countInput = document.getElementById('visitsCount') as HTMLInputElement;
            countInput.value='';
        }
        setIsInf(!isInf);
    }

    const handleCallback = () => {
        setLoading(true)

        subModel.isInfinite = isInf;
        let form = document.getElementById('addSubForm') as HTMLFormElement;

        saveSubType(subModel)
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
    let subModel = inputs as SubType

    if (loading) {
        return (<div className={'loadIndicator'}>
            <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
        </div>)
    }

    if (redirect) {
        return (<Redirect to={'/settings'}/>)
    }

    return (<div className={'addSubWrapper'}>
        <form id={'addSubForm'} className={'form addSubForm'} onSubmit={handleSubmit}>
            <div className={`inputSection inputSectionAddSub`}>
                <label htmlFor="subName" className={'label'}>
                    Название абонемента
                </label>
                <input type={'text'}
                       id={'subName'}
                       name={'subName'}
                       className={'input'}
                       placeholder={'Имя абонемента'}
                       required
                       onChange={handleInputChange}
                />
            </div>
            <div className={`inputSection inputSectionAddSub`}>
                <label htmlFor="visitsCount" className={'label'}>
                    Количество посещений
                </label>
                {isInf?
                    <input type={'number'}
                           id={'visitsCount'}
                           name={'visitsCount'}
                           className={'input'}
                           disabled
                           placeholder={'Без лимита посещений'}
                           onChange={handleInputChange}
                    />
                    :
                    <input type={'number'}
                           id={'visitsCount'}
                           name={'visitsCount'}
                           className={'input'}
                           min={1}
                           placeholder={'4'}
                           required
                           onChange={handleInputChange}
                    />
                }
            </div>
            <div className={'inputSectionCheckBox checkBoxAddSub'}>
                <input type="checkbox"
                       name={'isInfinite'}
                       id={'isInfinite'}
                       onChange={handleCheck}
                       checked={isInf}
                />
                <label htmlFor="subName" className={'checkBoxLabel'}>
                    Безлимитные посещения
                </label>
            </div>
            <div className={`inputSection inputSectionAddSub`}>
                <label htmlFor="daysCount" className={'label'}>
                    Количество дней для посещений
                </label>
                <input type={'number'}
                       id={'daysCount'}
                       name={'daysCount'}
                       className={'input'}
                       min={1}
                       placeholder={'30'}
                       required
                       onChange={handleInputChange}
                />
            </div>
            <div className={`inputSection inputSectionAddSub`}>
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
            <button className={'button addSubButton'}>
                Создать абонемент
            </button>
        </form>
    </div>)
}

export default AddSubPage;

