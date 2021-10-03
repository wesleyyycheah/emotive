import * as React from 'react';
import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import splash from '../assets/logo.png';
import axios from 'axios';
import { API } from '@env';
import * as Crypto from 'expo-crypto';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;
const SignUp = styled.View<{ signUp: boolean }>`
  position: absolute;
  bottom: 0;
  height: ${(props) => (props.signUp ? '650px' : '90px')};
  width: 100%;
  color: #ffffff;
  background-color: #de3163;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 5px;
  overflow: hidden;
`;
const LogIn = styled.View`
  background-color: #ffffff;
`;
const Logo = styled.Image`
  resize-mode: contain;
  width: 75%;
  height: 20%;
  margin: 0;
  margin-top: 20%;
`;
const Field = styled.TextInput<{
  signUp: boolean;
}>`
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
  margin-bottom: 25px;
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

  const lastNameRef = useRef<TextInput>(null);
  const passSURef = useRef<TextInput>(null);
  const emailSURef = useRef<TextInput>(null);

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
      <Logo source={splash} />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <Field
          signUp={false}
          autoCompleteType="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
          autoCapitalize="none"
        />
        <Field
          signUp={false}
          autoCompleteType="password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          placeholder="password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Submit activeOpacity={0.6} onPress={logInUser}>
          <BText> login</BText>
        </Submit>
      </KeyboardAwareScrollView>
      <SignUp signUp={signUp}>
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
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <Field
            signUp={true}
            autoCompleteType="name"
            value={first}
            onChangeText={(text) => setFirst(text)}
            placeholder="first name"
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameRef.current?.focus();
            }}
          />
          <Field
            signUp={true}
            autoCompleteType="name"
            value={last}
            onChangeText={(text) => setLast(text)}
            placeholder="last name"
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailSURef.current?.focus();
            }}
          />
          <Field
            signUp={true}
            autoCompleteType="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
            autoCapitalize="none"
            ref={emailSURef}
            returnKeyType="next"
            onSubmitEditing={() => {
              passSURef.current?.focus();
            }}
          />
          <Field
            signUp={true}
            autoCompleteType="password"
            value={pass}
            onChangeText={(text) => setPass(text)}
            placeholder="password"
            secureTextEntry={true}
            autoCapitalize="none"
            ref={passSURef}
          />
          <Submit activeOpacity={0.6} onPress={signUpUser}>
            <BText>Create Account</BText>
          </Submit>
        </KeyboardAwareScrollView>
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
    </Container>
  );
};

export default Login;
