import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button } from '../../../../components';
import { useLocalStorage } from '@uidotdev/usehooks';
import { request } from '../../../../utils';
import { OrderRequestSent } from '../order-request-sent/orderRequestSent';
import { Basket, DeliveryTerms } from '../../../../models/models';

const authFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Введите имя')
		.matches(/^[А-Я][а-яё]*$/, 
		'Допускаются только буквы верхнего и нижнего регистра')
        .min(2, 'Неверно заполнено имя. Минимум 2 символа')
		.max(15, 'Неверно заполнено имя. Максимум 15 символов'),
	telephone: yup
		.string()
		.required('Введите свой номер телефона в формате +79992223311')
		.matches(
			/^\+\d{1,2}\d{10}$/,
			'Неверно заполнен номер телефона. Допускаются только цифры и знак +'
		)
		.min(11, 'Неверно заполнен номер телефона. Минимум 11 символов')
		.max(12, 'Неверно заполнен номер телефона. Максимум 12 символов'),
	address: yup
		.string()
		.required('Введите адрес доставки в пределах Инзенского района')
		.min(10, 'Неверно заполнен адрес. Допускается не менее 10 символов')
		.max(60, 'Неверно заполнен адрес. Допускается не более 30 символов'),
	comment: yup
		.string()
		.required('Введите комментарий к заказу')
		.min(10, 'Неверно заполнен комментарий. Допускается не менее 10 символов')
		.max(30, 'Неверно заполнен комментарий. Допускается не более 30 символов'),

});

type Props = {
    className?: string
}

const DeliveryFormContainer = ({ className }: Props) => {
    const [basket, setBasket] = useLocalStorage<Basket[]>('myBasket', []);
    const [numberOrder, setNumberOrder] = useState(0);


	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			telephone: '',
			address: '',
			comment: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	
	const onSubmit = ({ name, telephone, address, comment }: DeliveryTerms) => {

		request('/api/orders', 'POST', {deliveryTerms: { name, telephone, address, comment }, products: basket}).then(({data}) => {
			setNumberOrder(data)
			setTimeout(() => {
				reset({
                    name: '',
                    telephone: '',
                    address: '',
                    comment: '',
				})
			}, 3000);
		});
	};

	const formError = errors?.name?.message 
    || errors?.telephone?.message 
    || errors?.address?.message
    || errors?.comment?.message;

	return (
		<div className={className}>
			<div className='delivery-title'>Заполните форму для оформления доставки</div>
			<form onSubmit={handleSubmit(onSubmit)}>
                <div className='contacts'>
                    <input className='input-form'
                        type="text"
                        placeholder="Имя..."
                        {...register('name')}
                    />
                    <input className='input-form'
                        type="text"
                        placeholder="Номер телефона..."
                        {...register('telephone')}
                    />
                </div>
				<input className='address-form'
					type="text"
					placeholder="Адрес доставки..."
					{...register('address')}
				/>
				<textarea className='comment-form'
					rows={10}
					placeholder="Комментарий к заказу..."
					{...register('comment')}
				/>
				<div className='form-error-message'>{formError}</div>
                <Button children="Заказать" disabled={!!formError}/>
			</form>
            {numberOrder != 0 ? <OrderRequestSent numberOrder={numberOrder} setBasket={setBasket} /> : null}
		</div>
	);
};
export const DeliveryForm = styled(DeliveryFormContainer)`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	align-items: center;
	justify-content: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;

    .delivery-title {
        font-size: 20px;
        font-weight: 600;
        color: #000;
        padding-bottom: 5px;
        border-bottom: 1px solid #000;

    }

    & > form {
        width: 100%;
    }

    .contacts {
        display: flex;
        flex-wrap: nowrap;
		margin: 20px 0;
		font-size: 20px;
        gap: 20px;
    }

	.input-form {
		width: 50%;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #aba8a8;
	}

    .address-form {
        width: 100%;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #aba8a8;
    }

    .comment-form {
		margin: 20px 0;
        width: 100%;
		height: 52px;
		border-radius: 5px;
		border: 1px solid #aba8a8;
        resize: none;
    }
	.message {
		color: green;
		align-items: center;
		justify-content: center;
		font-size: 30px;
	}
    .form-error-message {
        text-align: center;
        font-size: 18px;
        color: red;
        margin-bottom: 10px;
    }
`;