import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import Title from '../components/Title';
import { Button, Checkbox, Input, Label, Radio } from '../components/UI';

const Form = styled.form`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s8};
  max-width: 500px;
  margin: ${(p) => p.theme.spacing.s12} auto;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow300};
  padding: ${(p) => p.theme.spacing.s16} ${(p) => p.theme.spacing.s20};

  p {
    font-size: ${(p) => p.theme.font.size.sm};
    color: ${(p) => p.theme.color.warning};
  }
`;

const FormField = styled.section`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s2};
  width: 100%;
`;

export const SIGNUP = gql`
  mutation signUp(
    $userName: String!
    $email: String!
    $password: String!
    $subscription: Boolean!
    $team: String!
    $level: Int!
    $code: String!
    $telegram: String!
  ) {
    signUp(
      input: {
        userName: $userName
        email: $email
        password: $password
        subscription: $subscription
        trainer: { team: $team, level: $level, code: $code }
        social: { telegram: $telegram }
      }
    )
  }
`;

const schema = yup.object().shape({
  userName: yup
    .string()
    .required('Заполните имя')
    .min(2, 'Минимум 2 символа')
    .max(30, 'Максимальная длина имени 30 символов')
    .trim()
    .matches(/^\S+$/, 'Имя не должно содержать пробелов')
    .matches(/^[a-zA-Z0-9]*$/, 'Только буквы и цифры'),
  email: yup
    .string()
    .required('Заполните почту')
    .email('Заполните почту')
    .trim()
    .lowercase(),
  password: yup
    .string()
    .required('Заполните пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-z]/, 'Минимум один символ в нижнем регистре (a-z)')
    .matches(/[A-Z]/, 'Минимум один символ в верхнем регистре (A-Z)')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])/,
      'Минимум одна цифра или спец символ (0-9, !@#$%^&*)'
    ),
  team: yup
    .string()
    .required('Выберите вашу команду')
    .matches(/(valor|mystic|instinct)/),
  level: yup
    .number()
    .typeError('Укажите свой уровень')
    .required('Укажите свой уровень')
    .positive('Уровень должен быть положительным числом')
    .integer('Уровень - целое число')
    .min(1, 'Минимальный уровень 1')
    .max(40, 'Максимальный уровень 40'),
  code: yup.string().matches(/[\d*]{12}/, {
    message: 'Код тренера должен состоять из 12 цифр',
    excludeEmptyString: true,
  }),
  telegram: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, {
      message: 'Только буквы и цифры',
      excludeEmptyString: true,
    })
    .trim()
    .lowercase(),
  subscription: yup.boolean(),
});

function SignUp() {
  const [message, setMessage] = useState('');

  const [signUp, { loading, error }] = useMutation(SIGNUP, {
    onCompleted() {
      setMessage(`Письмо для подтверждения аккаунта отправлено на ваш адрес.`);
    },
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (form) => {
    signUp({
      variables: {
        userName: form.userName,
        email: form.email,
        password: form.password,
        team: form.team,
        level: form.level,
        code: form.code,
        telegram: form.telegram,
        subscription: form.subscription,
      },
    });
  };

  return (
    <>
      <Title>Регистрация</Title>
      {!message && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <Label htmlFor="userName" bold>
              Имя (как в игре)
            </Label>
            <Input
              type="text"
              id="userName"
              name="userName"
              ref={register({ required: true })}
            />
            <p>{errors.userName?.message}</p>
          </FormField>
          <FormField>
            <Label htmlFor="email" bold>
              Почта
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              ref={register({ required: true })}
            />
            <p>{errors.email?.message}</p>
          </FormField>
          <FormField>
            <Label htmlFor="password" bold>
              Пароль
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              autocomplete="new-password"
              ref={register({ required: true })}
            />
            <p>{errors.password?.message}</p>
          </FormField>

          <FormField>
            <Label htmlFor="team" bold>
              Команда
            </Label>
            <Label>
              <Radio
                id="teamValor"
                name="team"
                value="valor"
                ref={register({ required: true })}
              />
              Valor
            </Label>
            <Label>
              <Radio
                id="teamMystic"
                name="team"
                value="mystic"
                ref={register({ required: true })}
              />
              Mystic
            </Label>
            <Label>
              <Radio
                id="teamInstinct"
                name="team"
                value="instinct"
                ref={register({ required: true })}
              />
              Instinct
            </Label>
            <p>{errors.team?.message}</p>
          </FormField>
          <FormField>
            <Label htmlFor="level" bold>
              Уровень
            </Label>
            <Input
              type="number"
              inputmode="numeric"
              pattern="\d*"
              id="level"
              name="level"
              step="1"
              ref={register({ required: true, min: 1, max: 40 })}
            />
            <p>{errors.level?.message}</p>
          </FormField>
          <FormField>
            <Label htmlFor="code" bold>
              Код тренера
            </Label>
            <Input
              type="text"
              pattern="[\d*]{12}"
              placeholder="xxxx xxxx xxxx"
              id="code"
              name="code"
              ref={register}
            />
            <p>{errors.code?.message}</p>
          </FormField>
          <FormField>
            <Label htmlFor="telegram" bold>
              Telegram
            </Label>
            <Input type="text" id="telegram" name="telegram" ref={register} />
            <p>{errors.telegram?.message}</p>
          </FormField>
          <FormField>
            <Label>
              <Checkbox
                defaultChecked
                id="subscription"
                name="subscription"
                ref={register}
              />
              Подписаться на новости
            </Label>
          </FormField>

          {error && <p>{error.message}</p>}

          <Button bg="accent" color="white">
            {loading ? <>Загрузка</> : <>Зарегистрироваться</>}
          </Button>
        </Form>
      )}
      {message && <div>{message}</div>}
    </>
  );
}

export default SignUp;
