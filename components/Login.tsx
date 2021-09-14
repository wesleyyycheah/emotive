import * as React from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import splash from '../assets/logo.png';
import axios from 'axios';
import { API } from '@env';
import * as Crypto from 'expo-crypto';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const SignUp = styled.KeyboardAvoidingView<{ signUp: boolean }>`
  position: absolute;
  bottom: 0;
  height: ${(props) => (props.signUp ? '75%' : '10%')};
  width: 100%;
  color: #ffffff;
  background-color: #de3163;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  overflow: hidden;
`;
const LogIn = styled.KeyboardAvoidingView`
  background-color: #ffffff;
`;
const Logo = styled.Image`
  position: absolute;
  top: 5%;
  resize-mode: contain;
  width: 75%;
`;
const Field = styled.TextInput<{ signUp: boolean }>`
  background-color: ${(props) => (props.signUp ? '#FFFFFF' : '#DCDADA')};
  color: #959595;
  border-radius: 25px;
  width: 350px;
  margin-top: 50px;
  padding: 10px;
  padding-left: 15px;
  font-family: Comfortaa_300Light;
  font-size: 24px;
`;
const Submit = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #ff6085;
  border-radius: 25px;
  margin-top: 50px;
  padding: 10px;
  font-family: Comfortaa_300Light;
  font-size: 24px;
  width: 250px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;
const BText = styled.Text`
  color: #ffffff;
  font-family: Comfortaa_300Light;
  font-size: 24px;
`;
const Toggle = styled.Pressable`
  align-items: center;
  margin-bottom: 15px;
`;
type LoginProps = {
  setUser: Function;
  navigation: any;
};
const Login = (props: LoginProps) => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  const logInUser = async () => {
    await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pass,
    ).then(async (hash: string) => {
      await axios
        .request<any>({
          method: 'post',
          url: API + 'login',
          data: {
            email: email,
            passwordHash: hash,
          },
        })
        .then((response) => {
          props.setUser(response.data);
          props.navigation.navigate('AvatarCreator');
        });
    });
  };

  const signUpUser = async () => {
    await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      pass,
    ).then(async (hash: string) => {
      await axios
        .request<any>({
          method: 'post',
          url: API + 'user/create/',
          data: {
            firstName: first,
            lastName: last,
            email: email,
            passwordHash: hash,
          },
        })
        .then(logInUser);
    });
  };

  return (
    <Container>
      <LogIn behavior="padding" keyboardVerticalOffset={50}>
        <Field
          signUp={false}
          autoCompleteType="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
        />
        <Field
          signUp={false}
          autoCompleteType="password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          placeholder="password"
        />
        <Submit activeOpacity={0.6} onPress={logInUser}>
          <BText> login</BText>
        </Submit>
      </LogIn>
      <SignUp signUp={signUp} behavior="padding" keyboardVerticalOffset={50}>
        {!signUp ? (
          <Toggle
            onPress={() => {
              setSignUp(true);
            }}
          >
            <AntDesign name="up" size={24} color="white" />
            <BText>Sign Up</BText>
          </Toggle>
        ) : (
          <></>
        )}
        <ScrollView>
          <Field
            signUp={true}
            autoCompleteType="name"
            value={first}
            onChangeText={(text) => setFirst(text)}
            placeholder="first name"
          />
          <Field
            signUp={true}
            autoCompleteType="name"
            value={last}
            onChangeText={(text) => setLast(text)}
            placeholder="last name"
          />
          <Field
            signUp={true}
            autoCompleteType="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
          />
          <Field
            signUp={true}
            autoCompleteType="password"
            value={pass}
            onChangeText={(text) => setPass(text)}
            placeholder="password"
          />
          <Submit activeOpacity={0.6} onPress={signUpUser}>
            <BText>Create Account</BText>
          </Submit>
        </ScrollView>
        {signUp ? (
          <Toggle
            onPress={() => {
              setSignUp(false);
            }}
          >
            <BText>Log In</BText>
            <AntDesign name="down" size={24} color="white" />
          </Toggle>
        ) : (
          <></>
        )}
      </SignUp>
      <Logo source={splash} />
    </Container>
  );
};

export default Login;
