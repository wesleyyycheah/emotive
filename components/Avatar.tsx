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
  sizeX: number;
}
//state expected for Avatar component
type AvatarState = {
  //should add rotation variable
};

//props expected for Avatar component
type AvatarProps = {
  avatar: {
    [key in partsKey]: {
      color?: string;
      type: number;
      size: number;
      top: number;
      left: number;
    };
  };
  sizeX: number;
  onPressFunction: Function;
};

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

//containers that position and size the parts
//TODO: add rotation support
let NoseC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.nose[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.nose[props.type].top) * props.sizeX,
    )}px;
`;
let EyeL = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeL[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeL[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeL[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeL[props.type].top) * props.sizeX,
    )}px;
`;
let EyeR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeR[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeR[props.type].top) * props.sizeX,
    )}px;
`;
let HeadC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.head[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.head[props.type].top) * props.sizeX,
    )}px;
`;
let MouthC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.mouth[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.mouth[props.type].top) * props.sizeX,
    )}px;
`;
let EarC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.ear[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.ear[props.type].top) * props.sizeX,
    )}px;
`;
let HairC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type].size) * props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type].size) * props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.hair[props.type].left) * props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.hair[props.type].top) * props.sizeX,
    )}px;
`;
let AvatarC = styled.View<{ sizeX: number }>`
  top: ${(props) => PixelRatio.roundToNearestPixel(-50 * props.sizeX)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(-50 * props.sizeX)}px;
`;

//avatar class component
class Avatar extends Component<AvatarProps, AvatarState> {
  //avatar constructor
  constructor(props: AvatarProps) {
    super(props);
  }

  //JSX render code
  render() {
    let { avatar, onPressFunction } = this.props;
    return (
      <>
        <AvatarC sizeX={this.props.sizeX}>
          {/* head container (styled component) */}
          <HeadC
            //head container props
            size={avatar.head.size}
            top={avatar.head.top}
            left={avatar.head.left}
            type={avatar.head.type}
            sizeX={this.props.sizeX}
          >
            {/* container that makes a function run when it is tapped */}
            <Pressable
              // function to run when it is pressed
              onPress={() => {
                onPressFunction('head');
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
            sizeX={this.props.sizeX}
          >
            <Pressable
              onPress={() => {
                onPressFunction('hair');
              }}
            >
              <Hair type={avatar.hair.type} color={avatar.hair.color} />
            </Pressable>
          </HairC>
          <NoseC
            size={avatar.nose.size}
            sizeX={this.props.sizeX}
            top={avatar.nose.top}
            left={avatar.nose.left}
            type={avatar.nose.type}
          >
            <Pressable
              onPress={() => {
                onPressFunction('nose');
              }}
            >
              <Nose type={avatar.nose.type} />
            </Pressable>
          </NoseC>
          <EyeL
            size={avatar.eyeL.size}
            sizeX={this.props.sizeX}
            top={avatar.eyeL.top}
            left={avatar.eyeL.left}
            type={avatar.eyeL.type}
          >
            <Pressable
              onPress={() => {
                onPressFunction('eyeL');
              }}
            >
              <Eye type={avatar.eyeL.type} />
            </Pressable>
          </EyeL>
          <EyeR
            size={avatar.eyeR.size}
            sizeX={this.props.sizeX}
            top={avatar.eyeR.top}
            left={avatar.eyeR.left}
            type={avatar.eyeR.type}
          >
            <Pressable
              onPress={() => {
                onPressFunction('eyeR');
              }}
            >
              <Eye type={avatar.eyeR.type} />
            </Pressable>
          </EyeR>
          <MouthC
            size={avatar.mouth.size}
            sizeX={this.props.sizeX}
            top={avatar.mouth.top}
            left={avatar.mouth.left}
            type={avatar.mouth.type}
          >
            <Pressable
              onPress={() => {
                onPressFunction('mouth');
              }}
            >
              <Mouth type={avatar.mouth.type} />
            </Pressable>
          </MouthC>
          <EarC
            size={avatar.ear.size}
            sizeX={this.props.sizeX}
            top={avatar.ear.top}
            left={avatar.ear.left}
            type={avatar.ear.type}
          >
            <Pressable
              onPress={() => {
                onPressFunction('ear');
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
