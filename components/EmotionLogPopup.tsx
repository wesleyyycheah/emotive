import * as React from 'react';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Avatar from './Avatar';
import Emotions from './AvatarParts/Emotions';
import Slider from '@react-native-community/slider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
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
const Close = styled.TouchableOpacity`
  background: #e5e5e5;
  border-radius: 25px;
`;
const Emotion = styled.TouchableOpacity`
  height: 90px;
  width: 90px;
  margin-right: 5px;
  margin-bottom: 15px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
const EmotionContainer = styled.View`
  top: 2%;
  justify-content: center;
  align-items: center;
`;
const EmotionText = styled.Text`
  font-size: 30px;
  font-family: Comfortaa_300Light;
  padding-bottom: 30px;
  padding-top: 10px;
  text-align: center;
`;
const EmotionJournal = styled.TextInput`
  border-radius: 25px;
  width: 300px;
  height: 200px;
  padding: 15px;
  font-family: Comfortaa_300Light;
  font-size: 20px;
  background-color: #f3f3f3;
`;
const JournalText = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const Submit = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #ff6085;
  border-radius: 25px;
  margin-bottom: 25px;
  margin-top: 10px;
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
const SliderText = styled.Text`
  font-size: 20px;
  font-family: Comfortaa_300Light;
  padding: 5px;
`;

type Props = { setEmotionPopup: Function; avatar: any; emotion: number };
const EmotionLogPopup = (props: Props) => {
  const [sliderValue, setSliderValue] = useState(1);

  return (
    <Container>
      <Header>
        <Close
          onPress={() => {
            props.setEmotionPopup(false);
          }}
        >
          <AntDesign name="leftcircle" size={35} color="#c4c4c4" />
        </Close>
      </Header>
      <KeyboardAwareScrollView>
        <EmotionContainer>
          <Emotion style={{ backgroundColor: Emotions[props.emotion].color }}>
            <Avatar avatar={props.avatar} sizeX={1} emotion={props.emotion} />
          </Emotion>
          <EmotionText>How strongly are you feeling this way?</EmotionText>
          <SliderText>{sliderValue}</SliderText>
          <Slider
            style={{ width: 225, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={sliderValue}
            minimumTrackTintColor="#444444"
            maximumTrackTintColor="#F3F3f3"
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          />
          <JournalText>
            <EmotionJournal multiline placeholder="Add notes..." />
          </JournalText>
          <Submit>
            <BText>Log emotion</BText>
          </Submit>
        </EmotionContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default EmotionLogPopup;
