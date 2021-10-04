import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import Avatar from './Avatar';
import Emotions from './AvatarParts/Emotions';

const Container = styled.View`
  top: 5%;
  height: 80%;
  width: 90%;
  position: absolute;
  background: #e5e5e5;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-direction: column;
`;
const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
const Close = styled.TouchableOpacity`
  background: #e5e5e5;
  border-radius: 25px;
`;
const Date = styled.Text`
  color: #666666;
  font-size: 25px;
  font-family: Comfortaa_300Light;
  margin-left: auto;
  margin-right: auto;
`;
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

type Props = { avatar: any; day: Array<any>; setPop: Function };
const CalendarPopup = (props: Props) => {
  return (
    <Container>
      <Header>
        <Close
          onPress={() => {
            props.setPop(false);
          }}
        >
          <AntDesign name="leftcircle" size={35} color="#c4c4c4" />
        </Close>
        <Date>{props.day[0].date}</Date>
      </Header>
      <>
        {props.day.map((log) => {
          return (
            <Header>
              <Emotion style={{ backgroundColor: Emotions[log.emotion].color }}>
                <Avatar
                  avatar={props.avatar}
                  sizeX={0.75}
                  emotion={log.emotion}
                />
              </Emotion>
              <Date>{log.time}</Date>
              <Date>{log.intensity * 10} /10</Date>
            </Header>
          );
        })}
      </>
    </Container>
  );
};

export default CalendarPopup;
