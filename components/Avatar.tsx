import * as React from 'react';
import { Component } from 'react';
import Head from './AvatarParts/Head';
import Nose from './AvatarParts/Nose';
import Eye from './AvatarParts/Eye';
import Mouth from './AvatarParts/Mouth';
import Ear from './AvatarParts/Ear';
import Hair from './AvatarParts/Hair';
import styled from 'styled-components/native';
import { PixelRatio, Pressable } from 'react-native';

//This is way too many comments.
//I just wanted to show you the basic structure of a React State component in typescript
//Thank you for being awesome!

//type definitions
//props that are expected to be passed to a styled component
interface StyledProps {
  size: number;
  left: number;
  top: number;
  type: number;
}
//state expected for Avatar component
type AvatarState = {
  //should make avatar props instead of state
  //should add rotation variable
  avatar: {
    [key in partsKey]: {
      color?: string;
      type: number;
      size: number;
      top: number;
      left: number;
    };
  };
};

//props expected for Avatar component
type AvatarProps = {};

//define strings that are keys for avatar object and partsModifier object
type partsKey = 'hair' | 'head' | 'ear' | 'eyeL' | 'eyeR' | 'nose' | 'mouth';

type partsType = {
  [key in partsKey]: Array<{ size: number; top: number; left: number }>;
};

//provides preset sizing and placement offsets that fit most faces
//TODO add variant for web
const partsModifier: partsType = {
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
  eyeL: [
    { size: 0, top: 0, left: 0 },
    { size: 0, top: 0, left: 0 },
    { size: -5, top: 4, left: 3 },
    { size: 0, top: 0, left: 0 },
    { size: -7, top: 5, left: 4 },
    { size: -5, top: 3, left: 4 },
    { size: -10, top: 8, left: 6 },
    { size: -10, top: 5, left: 6 },
  ],
  eyeR: [
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
  ],
};

//size multiplier
//TODO: make this props instead of random variable
let sizeM = 3;

//containers that position and size the parts
//TODO: add rotation support
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
      (props.size + partsModifier.eyeL[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeL[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeL[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeL[props.type].top) * sizeM,
    )}px;
`;
let EyeR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type].size) * sizeM,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type].size) * sizeM,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeR[props.type].left) * sizeM,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeR[props.type].top) * sizeM,
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
class Avatar extends Component<AvatarProps, AvatarState> {
  //avatar constructor
  constructor(props: AvatarProps) {
    super(props);
    //define state
    this.state = {
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
  }

  //example avatar editing function (called when tapping a component)
  //functionName(parameterName: parameterType):returnType
  onPressFunction(part: partsKey): null {
    //make a copy of avatar
    let avatar = this.state.avatar;
    //set the avatar part to it + 1 mod by the length of the parts so it doesn't run out
    avatar[part].type = (avatar[part].type + 1) % partsModifier[part].length;
    //set state of avatar to avatar copy
    this.setState({ avatar: avatar });
    //return nothing
    return null;
  }

  //JSX render code
  render() {
    let { avatar } = this.state;
    return (
      <>
        <AvatarC>
          {/* head container (styled component) */}
          <HeadC
            //head container props
            size={avatar.head.size}
            top={avatar.head.top}
            left={avatar.head.left}
            type={avatar.head.type}
          >
            {/* container that makes a function run when it is tapped */}
            <Pressable
              // function to run when it is pressed
              onPress={() => {
                this.onPressFunction('head');
              }}
            >
              {/* head component */}
              <Head type={avatar.head.type} color={avatar.head.color} />
            </Pressable>
          </HeadC>
          <HairC
            size={avatar.hair.size}
            top={avatar.hair.top}
            left={avatar.hair.left}
            type={avatar.hair.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('hair');
              }}
            >
              <Hair type={avatar.hair.type} color={avatar.hair.color} />
            </Pressable>
          </HairC>
          <NoseC
            size={avatar.nose.size}
            top={avatar.nose.top}
            left={avatar.nose.left}
            type={avatar.nose.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('nose');
              }}
            >
              <Nose type={avatar.nose.type} />
            </Pressable>
          </NoseC>
          <EyeL
            size={avatar.eyeL.size}
            top={avatar.eyeL.top}
            left={avatar.eyeL.left}
            type={avatar.eyeL.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('eyeL');
              }}
            >
              <Eye type={avatar.eyeL.type} />
            </Pressable>
          </EyeL>
          <EyeR
            size={avatar.eyeR.size}
            top={avatar.eyeR.top}
            left={avatar.eyeR.left}
            type={avatar.eyeR.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('eyeR');
              }}
            >
              <Eye type={avatar.eyeR.type} />
            </Pressable>
          </EyeR>
          <MouthC
            size={avatar.mouth.size}
            top={avatar.mouth.top}
            left={avatar.mouth.left}
            type={avatar.mouth.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('mouth');
              }}
            >
              <Mouth type={avatar.mouth.type} />
            </Pressable>
          </MouthC>
          <EarC
            size={avatar.ear.size}
            top={avatar.ear.top}
            left={avatar.ear.left}
            type={avatar.ear.type}
          >
            <Pressable
              onPress={() => {
                this.onPressFunction('ear');
              }}
            >
              <Ear type={avatar.ear.type} />
            </Pressable>
          </EarC>
        </AvatarC>
      </>
    );
  }
}

export default Avatar;
