import * as React from 'react';
import Head from './AvatarParts/Head';
import { Component } from 'react';
import Nose from './AvatarParts/Nose';
import Eye from './AvatarParts/Eye';
import Mouth from './AvatarParts/Mouth';
import Ear from './AvatarParts/Ear';
import styled from 'styled-components/native';
import Hair from './AvatarParts/Hair';
import { PixelRatio } from 'react-native';
import { Button } from 'react-native';

interface StyledProps {
  size: number;
  left: number;
  top: number;
  type: number;
}

//provides preset sizing and placement offsets that fit most faces
const partsModifier = {
  hair: [
    { size: 0, top: -5, left: 5 },
    { size: 0, top: 0, left: 0 },
    { size: 5, top: -10, left: 10 },
  ],
  head: [
    { size: 5, top: 0, left: -7 },
    { size: 10, top: 5, left: -7 },
    { size: 0, top: 0, left: -3 },
    { size: -10, top: 7, left: -7 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: -1 },
  ],
  ear: [
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
  ],
  eye: [
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: -5, top: 4, left: 3 },
    { size: 0, top: 0, left: 0 },
    { size: -7, top: 5, left: 4 },
    { size: -5, top: 3, left: 4 },
    { size: -10, top: 8, left: 6 },
    { size: -10, top: 5, left: 6 },
  ],
  nose: [
    { size: 0, top: 0, left: 0 },
    { size: 0, top: -5, left: 0 },
    { size: 3, top: -5, left: -3 },
    { size: 0, top: -3, left: 0 },
    { size: 5, top: -5, left: -2 },
    { size: 0, top: -3, left: 2 },
    { size: 0, top: -5, left: 0 },
    { size: 0, top: -2, left: 0 },
  ],
  mouth: [
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
  ],
};

//size multiplier
let sizeM = 3;

//containers that position and size the parts
let NoseC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.nose[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.nose[props.type].top) * sizeM,
    )}px;
`;
let EyeL = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eye[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eye[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eye[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eye[props.type].top) * sizeM,
    )}px;
`;
let EyeR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eye[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eye[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eye[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eye[props.type].top) * sizeM,
    )}px;
`;
let HeadC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.head[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.head[props.type].top) * sizeM,
    )}px;
`;
let MouthC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.mouth[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.mouth[props.type].top) * sizeM,
    )}px;
`;
let EarC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.ear[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.ear[props.type].top) * sizeM,
    )}px;
`;
let HairC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.hair[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.hair[props.type].top) * sizeM,
    )}px;
`;
let AvatarC = styled.View`
  top: ${PixelRatio.roundToNearestPixel(-50 * sizeM)}px;
  left: ${PixelRatio.roundToNearestPixel(-50 * sizeM)}px;
`;

//avatar class component
class Avatar extends Component {
  //avatar state object
  state = {
    avatar: {
      hair: { color: '#291600', type: 1, size: 85, top: -17, left: 5 },
      head: { color: '#e6c9a1', type: 5, size: 100, top: 0, left: 0 },
      ear: { type: 1, size: 30, top: 35, left: 60 },
      eyeL: { type: 0, size: 20, top: 35, left: 15 },
      eyeR: { type: 0, size: 20, top: 35, left: 37 },
      nose: { type: 0, size: 20, top: 50, left: 25 },
      mouth: { type: 0, size: 20, top: 65, left: 30 },
    },
  };
  //example avatar editing function
  handleButton = () => {
    let avatar = this.state.avatar;
    avatar.eyeL.type = 1;
    this.setState({ avatar: avatar });
  };
  //JSX render code
  render() {
    let { avatar } = this.state;
    return (
      <>
        <AvatarC>
          <HeadC
            size={avatar.head.size}
            top={avatar.head.top}
            left={avatar.head.left}
            type={avatar.head.type}
          >
            <Head type={avatar.head.type} color={avatar.head.color} />
          </HeadC>
          <HairC
            size={avatar.hair.size}
            top={avatar.hair.top}
            left={avatar.hair.left}
            type={avatar.hair.type}
          >
            <Hair type={avatar.hair.type} color={avatar.hair.color} />
          </HairC>
          <NoseC
            size={avatar.nose.size}
            top={avatar.nose.top}
            left={avatar.nose.left}
            type={avatar.nose.type}
          >
            <Nose type={avatar.nose.type} />
          </NoseC>
          <EyeL
            size={avatar.eyeL.size}
            top={avatar.eyeL.top}
            left={avatar.eyeL.left}
            type={avatar.eyeL.type}
          >
            <Eye type={avatar.eyeL.type} />
          </EyeL>
          <EyeR
            size={avatar.eyeR.size}
            top={avatar.eyeR.top}
            left={avatar.eyeR.left}
            type={avatar.eyeR.type}
          >
            <Eye type={avatar.eyeR.type} />
          </EyeR>
          <MouthC
            size={avatar.mouth.size}
            top={avatar.mouth.top}
            left={avatar.mouth.left}
            type={avatar.mouth.type}
          >
            <Mouth type={avatar.mouth.type} />
          </MouthC>
          <EarC
            size={avatar.ear.size}
            top={avatar.ear.top}
            left={avatar.ear.left}
            type={avatar.ear.type}
          >
            <Ear type={avatar.ear.type} />
          </EarC>
        </AvatarC>
      </>
    );
  }
}

export default Avatar;
