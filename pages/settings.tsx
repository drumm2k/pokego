import { yupResolver } from '@hookform/resolvers';
import { Title } from 'components/Title';
import { Button, FormField, Input, Label, Select } from 'components/UI';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';

export default function Settings() {
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((form) => {
    console.log(form);
  });

  return (
    <>
      <Title>Настройки</Title>
      <Form onSubmit={onSubmit}>
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
          <Label>
            Отображать мой профиль
            <Select value="profile_visibility" ref={register({ required: true })}>
              <option value="profile_visibility_all">Для всех</option>
              <option value="profile_visibility_friends">Для друзей</option>
              <option value="profile_visibility_hide">Скрыть</option>
            </Select>
          </Label>
        </FormField>
        <ul>
          <li>Отображать меня на карте: для всех, для друзей, скрыть</li>
          <li>Разрешить посылать запросы на трейд: всем, друзьям, запретить</li>
          <li>Подписка на рассылку</li>
          <li>Сменить код тренера</li>
          <li>Сменить команду</li>
          <li>Сменить никнейм</li>
          <li>Сменить позицию на карте</li>
          <li>Сменить e-mail</li>
          <li>Сменить пароль</li>
          <li>Удалить аккаунт</li>
        </ul>
        <Button bg="accent" color="white">
          Сохранить
        </Button>
      </Form>
    </>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните почту')
    .email('Заполните почту')
    .trim()
    .lowercase(),
  password: yup.string().required('Заполните пароль'),
});

type FormData = {
  email: string;
  profileVisibility: string;
};

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
