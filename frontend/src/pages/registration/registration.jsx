import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { styled } from "styled-components";
import { AuthFormError, Button, Input, Title } from "../../components";
import { Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import { useResetForm } from "../../hooks";
import { request } from "../../utils";


const regFormSchema = yup.object().shape({
    login: yup.string()
        .required('Заполните логин')
        .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
        .min(3, 'Неверно заполнен логин. Минимум 3 символа')
        .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
    password: yup.string()
        .required('Заполните пароль')
        .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки #, %')
        .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
        .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
    passcheck: yup.string()
        .required('Повторите пароль')
        .oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
        

});

const RegistrationContainer = ({className}) => {
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
            passcheck: '',
        },
        resolver: yupResolver(regFormSchema),
    });

    useResetForm(reset);

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({login, password}) => {
        request('/api/register', 'POST', {login, password}).then(({error, user}) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return
            }

            dispatch(setUser(user));
            sessionStorage.setItem('userData', JSON.stringify(user));

        });
    };
    const formError =  errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />
    };

    return (
        <div className={className}>
            <Title title="Регистрация" size="30px" margin="0 0 20px 0"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Логин..." {...register('login', {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder="Пароль..." {...register('password', {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder="Проверка пароля..." {...register('passcheck', {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" disabled={!!formError}>Зарегистрироваться</Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
    display: flex;
    text-alight: center;
    align-items: center;
    flex-direction: column;
    & > form {
        padding: 20px;
        display: flex;
        flex-direction: column;
        max-width: 300px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
`;