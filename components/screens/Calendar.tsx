import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import format from 'date-fns/format';
import moment from 'moment';
import axios from 'axios';
import { API } from '@env';
import Emotions from '../AvatarParts/Emotions';
import { AntDesign } from '@expo/vector-icons';
import CalendarPopup from '../CalendarPopup';
const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Cal = styled.View`
  height: auto;
  width: 350px;
  height: 420px
  padding: 25px;
  background-color: #6495ed;
  border-radius: 25px;
  align-items: center;
`;
const Days = styled.View`
  flex-direction: row;
`;
const Day = styled.Text`
  color: #fff;
  margin: 17px;
  font-size: 18px;
  font-family: Comfortaa_500Medium;
`;
const Dates = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 340px;
`;
const Dat = styled.TouchableOpacity<{ color?: string; today: boolean }>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  height: 25px;
  width: 25px;
  margin: 11.5px;
  border: ${(props) => (props.today ? '4px #2B2B2B' : '2px #fff')}
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
const Blank = styled.View`
  height: 20px;
  width: 20px;
  margin: 14px;
  padding-top: 0px;
  border-radius: 10px;
`;
const Month = styled.Text`
  color: #fff;
  font-size: 30px;
  font-family: Comfortaa_300Light;
  padding-left: 5px;
  padding-right: 5px;
`;
const Year = styled.Text`
  color: #6495ed;
  font-size: 40px;
  font-family: Comfortaa_500Medium;
  margin-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;
const Left = styled.Pressable<{}>`
  transform: rotate(0deg);
  position: absolute;
  left: 0;
`;
const Right = styled.Pressable<{}>`
  transform: rotate(180deg);
  position: absolute;
  right: 0;
`;
type CompProps = { userID: string; avatar: any };
type EmoStamp = { emotion: number; intensity: number; timestamp: string };
const Calendar = (props: CompProps) => {
  const [days, setDays] = useState<JSX.Element[]>([]);
  const [month, setMonth] = useState(0);
  const [pop, setPop] = useState(false);
  const [day, setDay] = useState<any>([]);
  const d = moment().subtract(month, 'months').toDate();
  useEffect(() => {
    popCal();
  }, [month]);
  useEffect(() => {
    setPop(true);
  }, [day]);
  const popCal = async () => {
    let emo: { [key: number]: Array<any> } = {};
    const d = moment().subtract(month, 'months').toDate();
    const first = startOfMonth(d).getDay();
    const nDays = getDaysInMonth(d);
    await axios
      .request<any>({
        method: 'post',
        url: API + 'user/emotions/get',
        data: {
          _id: props.userID,
          startDate: startOfMonth(d),
          endDate: endOfMonth(d),
        },
      })
      .then((response) => {
        response.data.forEach((element: EmoStamp) => {
          const date = new Date(element.timestamp);
          if (emo[date.getDate()]) {
            emo[date.getDate()].push({
              emotion: element.emotion,
              intensity: element.intensity,
              time: format(new Date(element.timestamp), 'h:mm aaa'),
              date: format(new Date(element.timestamp), 'MMMM do, yyyy'),
            });
          } else {
            emo[date.getDate()] = [
              {
                emotion: element.emotion,
                intensity: element.intensity,
                time: format(new Date(element.timestamp), 'h:mm aaa'),
                date: format(new Date(element.timestamp), 'MMMM do, yyyy'),
              },
            ];
          }
        });
        let days = [];
        const t = moment().toDate().getDate();
        for (let i = 0; i < nDays + first; i++) {
          if (i < first) {
            days.push(<Blank key={'blank' + i} />);
          } else if (emo[i - first + 1]) {
            days.push(
              <Dat
                key={i - first + 1}
                color={Emotions[emo[i - first + 1][0].emotion].color}
                today={month === 0 && t === i - first + 1}
                onPress={() => {
                  setDay(emo[i - first + 1]);
                }}
              ></Dat>,
            );
          } else {
            days.push(
              <Dat
                key={i - first + 1}
                today={month === 0 && t === i - first + 1}
              ></Dat>,
            );
          }
        }
        setDays(days);
      });
  };
  return (
    <Container>
      <Year>{d.getFullYear()}</Year>
      <Cal>
        <Header>
          <Left
            onPress={() => {
              setMonth(month + 1);
            }}
          >
            <AntDesign name="caretleft" size={30} color="#fff" />
          </Left>

          <Month>{d.toLocaleString('default', { month: 'long' })}</Month>
          {month !== 0 ? (
            <Right
              onPress={() => {
                setMonth(month - 1);
              }}
            >
              <AntDesign name="caretleft" size={30} color="#fff" />
            </Right>
          ) : (
            <></>
          )}
        </Header>
        <Dates>
          <Days>
            <Day>S</Day>
            <Day>M</Day>
            <Day>T</Day>
            <Day>W</Day>
            <Day>T</Day>
            <Day>F</Day>
            <Day>S</Day>
          </Days>
        </Dates>
        <Dates>{days}</Dates>
      </Cal>
      {pop && day.length !== 0 ? (
        <CalendarPopup avatar={props.avatar} setPop={setPop} day={day} />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Calendar;
