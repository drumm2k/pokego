import { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

import Title from '../components/Title';
import { Button, Input, Label, Radio } from '../components/UI';

const Form = styled.form`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s8};
  max-width: 500px;
  margin: ${(p) => p.theme.spacing.s12} auto;
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow300};
  padding: ${(p) => p.theme.spacing.s16} ${(p) => p.theme.spacing.s20};
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
    $team: String!
    $level: Int!
    $code: String!
  ) {
    signUp(
      input: {
        userName: $userName
        email: $email
        password: $password
        trainer: { team: $team, level: $level, code: $code }
      }
    ) {
      userName
    }
  }
`;

function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState('');
  const [level, setLevel] = useState('');
  const [code, setCode] = useState('');

  function completed() {
    console.log('completed');
  }

  const [signUp, { data, loading, error: apiError }] = useMutation(SIGNUP, {
    onCompleted: completed,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'team':
        setTeam(value);
        break;
      case 'level':
        setLevel(parseInt(value, 10));
        break;
      case 'code':
        setCode(value);
        break;
      default:
        break;
    }
  };

  function signUpHandler(event) {
    event.preventDefault();

    console.log(`${userName} ${email} ${password} ${team} ${level} ${code}`);

    // Add validation later ============================
    signUp({
      variables: {
        userName,
        email,
        password,
        team,
        level,
        code,
      },
    });
  }

  return (
    <>
      <Title color="#666">Регистрация</Title>
      {apiError && <div>{JSON.stringify(apiError)}</div>}
      {data && <div>{JSON.stringify(data.signUp)}</div>}

      <Form onSubmit={signUpHandler}>
        <FormField>
          <Label htmlFor="userName" bold>
            Имя (как в игре)
          </Label>
          <Input
            type="text"
            id="userName"
            name="userName"
            onChange={handleInputChange}
            value={userName}
          />
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
            onChange={handleInputChange}
            value={email}
          />
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
            onChange={handleInputChange}
            value={password}
          />
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
              onChange={handleInputChange}
            />
            Valor
          </Label>
          <Label>
            <Radio
              id="teamMystic"
              name="team"
              value="mystic"
              onChange={handleInputChange}
            />
            Mystic
          </Label>
          <Label>
            <Radio
              id="teamInstinct"
              name="team"
              value="instinct"
              onChange={handleInputChange}
            />
            Instinct
          </Label>
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
            min="1"
            max="40"
            onChange={handleInputChange}
            value={level}
          />
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
            onChange={handleInputChange}
            value={code}
          />
        </FormField>

        <Button bg="accent">Зарегистрироваться</Button>
      </Form>
    </>
  );
}

export default SignUp;
