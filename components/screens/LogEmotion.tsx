import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import Avatar from '../Avatar';
import Emotions from '../AvatarParts/Emotions';

const Emotion = styled.TouchableOpacity`
  height: 70px;
  width: 70px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

const ScreenContainer = styled.View`
  align-items: center;
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

const ButtonPosition = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
  padding-bottom: 100px;
`;

const DateSize = styled.Text`
  font-size: 20px;
`;

const DateView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px
  flex: 1;
`;

const HeaderContainer = styled.View`
  padding: 30px;
  align-items: center;
  justify-content: center;
  flex: 10;
`;

const HeaderText = styled.Text`
  font-size: 35px;
`;
type avatarKey =
  | 'hair'
  | 'head'
  | 'ear'
  | 'eyeL'
  | 'eyeR'
  | 'nose'
  | 'mouth'
  | 'browL'
  | 'browR';
type AvatarType = {
  [key in avatarKey]: {
    color: string;
    type: number;
    size: number;
    top: number;
    left: number;
    rot: number;
  };
};
type Props = {
  userID: string;
  avatar: AvatarType;
};
const LogEmotion = (props: Props) => {
  const { avatar, userID } = props;
  return (
    <ScreenContainer>
      <View>
        <DateView>
          <DateSize>September 29, 2021</DateSize>
        </DateView>
        <HeaderContainer>
          <HeaderText>How are you feeling today?</HeaderText>
          <ScrollView>
            <ButtonPosition>
              {Emotions.map((emotion, index) => {
                return (
                  <Emotion style={{ backgroundColor: emotion.color }}>
                    <Avatar avatar={avatar} sizeX={0.7} emotion={index} />
                  </Emotion>
                );
              })}
            </ButtonPosition>
          </ScrollView>
        </HeaderContainer>
      </View>
    </ScreenContainer>
  );
};

export default LogEmotion;

// background-color: ${(props) => props.color};
