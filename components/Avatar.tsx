import * as React from 'react';
import { Component } from 'react';
import Head from './AvatarParts/Head';
import Nose from './AvatarParts/Nose';
import Eye from './AvatarParts/Eye';
import Mouth from './AvatarParts/Mouth';
import Ear from './AvatarParts/Ear';
import Hair from './AvatarParts/Hair';
import Brow from './AvatarParts/Brow';
import Emotions from './AvatarParts/Emotions';
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
  mode: number;
  sizeX: number;
  rot: number;
}
//state expected for Avatar component
type AvatarState = {
  //should add rotation variable
};

//props expected for Avatar component
type AvatarProps = {
  avatar: {
    [key in partsKey]: {
      color: string;
      type: number;
      size: number;
      top: number;
      left: number;
      rot: number;
    };
  };
  sizeX: number;
  emotion: number;
};

//define strings that are keys for avatar object and partsModifier object
type partsKey =
  | 'hair'
  | 'head'
  | 'ear'
  | 'eyeL'
  | 'eyeR'
  | 'nose'
  | 'mouth'
  | 'browL'
  | 'browR';

type partsType = {
  [key in partsKey]: Array<
    Array<{
      size: number;
      top: number;
      left: number;
      rot: number;
      flip?: boolean;
    }>
  >;
};

//provides preset sizing and placement offsets that fit most faces
//TODO add variant for web
const partsModifier: partsType = {
  hair: [
    [{ size: 0, top: -5, left: 5, rot: 0 }],
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 5, top: -10, left: 10, rot: 0 }],
  ],
  head: [
    [{ size: 5, top: 0, left: -7, rot: 0 }],
    [{ size: 10, top: 5, left: -7, rot: 0 }],
    [{ size: 0, top: 0, left: -3, rot: 0 }],
    [{ size: -10, top: 7, left: -7, rot: 0 }],
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 0, top: 0, left: -1, rot: 0 }],
  ],
  ear: [
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 0, top: 0, left: 0, rot: 0 }],
  ],
  eyeL: [
    [
      { size: -2, top: 2, left: 3, rot: 0, flip: false },
      { size: -3, top: 3, left: 4, rot: 20, flip: false },
      { size: 3, top: 0, left: 1, rot: 0, flip: false },
      { size: 3, top: 0, left: 1, rot: -10, flip: false },
      { size: 2, top: 1, left: 2, rot: 0, flip: false },
      { size: 2, top: 1, left: 2, rot: 0, flip: false },
      { size: -3, top: 5, left: 5, rot: -10, flip: true },
      { size: -1, top: 1, left: 3, rot: 0, flip: false },
    ],
  ],
  eyeR: [
    [
      { size: -2, top: 2, left: 3, rot: 0, flip: false },
      { size: -3, top: 3, left: 4, rot: -20, flip: true },
      { size: 3, top: 0, left: 0, rot: 0, flip: false },
      { size: 3, top: 0, left: 0, rot: 0, flip: false },
      { size: 1, top: 1, left: 1, rot: 0, flip: false },
      { size: 2, top: 1, left: 0, rot: 0, flip: false },
      { size: -3, top: 5, left: 3, rot: 10, flip: false },
      { size: -1, top: 1, left: 2, rot: 0, flip: false },
    ],
  ],
  nose: [
    [{ size: 0, top: 0, left: 0, rot: 0 }],
    [{ size: 0, top: -5, left: 0, rot: 0 }],
    [{ size: 3, top: -5, left: -3, rot: 0 }],
    [{ size: 0, top: -3, left: 0, rot: 0 }],
    [{ size: 5, top: -5, left: -2, rot: 0 }],
    [{ size: 0, top: -3, left: 2, rot: 0 }],
    [{ size: 0, top: -5, left: 0, rot: 0 }],
    [{ size: 0, top: -2, left: 0, rot: 0 }],
  ],
  mouth: [
    [
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 2, left: 0, rot: 5 },
      { size: -1, top: 4, left: 0, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 3, left: 0, rot: 10 },
      { size: -2, top: 3, left: 0, rot: 0 },
      { size: -2, top: 5, left: 0, rot: -10 },
      { size: 0, top: 2, left: 0, rot: 0 },
      { size: -4, top: 4, left: 0, rot: -10 },
    ],
  ],
  browL: [
    [
      { size: 0, top: 0, left: 0, rot: 15 },
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 0 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: -2, top: 1, left: 1, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 0 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: -20 },
      { size: 0, top: -1, left: 0, rot: -20 },
      { size: 0, top: 0, left: 0, rot: -20 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: -20 },
      { size: 0, top: 0, left: 0, rot: -20 },
      { size: 0, top: 0, left: 0, rot: -20 },
    ],
  ],
  browR: [
    [
      { size: 0, top: 0, left: 0, rot: -15 },
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 0 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 0 },
      { size: 0, top: 0, left: 0, rot: 10 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: 20 },
      { size: 0, top: 0, left: 0, rot: 20 },
      { size: 0, top: 0, left: 0, rot: 0 },
    ],
    [
      { size: 0, top: 0, left: 0, rot: 20 },
      { size: 0, top: 0, left: 0, rot: 20 },
      { size: 0, top: 0, left: 0, rot: 20 },
    ],
  ],
};

//containers that position and size the parts
//TODO: add rotation support
let NoseC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.nose[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.nose[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.nose[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: rotate(
    ${(props) => props.rot + partsModifier.nose[props.type][props.mode].rot}deg
  );
`;
let BrowL = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.browL[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.browL[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.browL[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.browL[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: ${(props) =>
      partsModifier.browL[props.type][props.mode].flip
        ? 'scaleX(-1)'
        : 'scaleX(1)'}
    rotate(
      ${(props) =>
        props.rot + partsModifier.browL[props.type][props.mode].rot}deg
    );
`;
let BrowR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.browR[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.browR[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.browR[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.browR[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: scaleX(-1)
    rotate(
      ${(props) =>
        props.rot + partsModifier.browR[props.type][props.mode].rot}deg
    );
`;
let EyeL = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeL[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeL[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeL[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeL[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: ${(props) =>
      partsModifier.eyeL[props.type][props.mode].flip
        ? 'scaleX(-1)'
        : 'scaleX(1)'}
    rotate(
      ${(props) =>
        props.rot + partsModifier.eyeL[props.type][props.mode].rot}deg
    );
`;
let EyeR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.eyeR[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.eyeR[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.eyeR[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: ${(props) =>
      partsModifier.eyeR[props.type][props.mode].flip
        ? 'scaleX(-1)'
        : 'scaleX(1)'}
    rotate(
      ${(props) =>
        props.rot + partsModifier.eyeR[props.type][props.mode].rot}deg
    );
`;
let HeadC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.head[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.head[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.head[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: rotate(
    ${(props) => props.rot + partsModifier.head[props.type][props.mode].rot}deg
  );
`;
let MouthC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.mouth[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.mouth[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.mouth[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: rotate(
    ${(props) => props.rot + partsModifier.mouth[props.type][props.mode].rot}deg
  );
`;
let EarC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.ear[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.ear[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.ear[props.type][props.mode].top) * props.sizeX,
    )}px;
  transform: rotate(
    ${(props) => props.rot + partsModifier.ear[props.type][props.mode].rot}deg
  );
`;
let HairC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  width: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.size + partsModifier.hair[props.type][props.mode].size) *
        props.sizeX,
    )}px;
  left: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.left + partsModifier.hair[props.type][props.mode].left) *
        props.sizeX,
    )}px;
  top: ${(props) =>
    PixelRatio.roundToNearestPixel(
      (props.top + partsModifier.hair[props.type][props.mode].top) *
        props.sizeX,
    )}px;
  transform: rotate(
    ${(props) => props.rot + partsModifier.hair[props.type][props.mode].rot}deg
  );
`;
let AvatarC = styled.View<{ sizeX: number }>`
  top: ${(props) => PixelRatio.roundToNearestPixel(-50 * props.sizeX)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(-50 * props.sizeX)}px;
  flex: 0;
`;

//avatar class component
class Avatar extends Component<AvatarProps, AvatarState> {
  //avatar constructor
  constructor(props: AvatarProps) {
    super(props);
  }

  //JSX render code
  render() {
    let { avatar } = this.props;
    let { emotion } = this.props;
    return (
      <AvatarC sizeX={this.props.sizeX}>
        {/* head container (styled component) */}
        <HeadC
          //head container props
          type={avatar.head.type}
          mode={Emotions[emotion].head.mode}
          size={avatar.head.size + Emotions[emotion].head.size}
          top={avatar.head.top + Emotions[emotion].head.top}
          left={avatar.head.left + Emotions[emotion].head.left}
          rot={avatar.head.rot + Emotions[emotion].head.rot}
          sizeX={this.props.sizeX}
        >
          {/* container that makes a function run when it is tapped */}

          {/* head component */}
          <Head type={avatar.head.type} color={avatar.head.color} />
        </HeadC>
        <HairC
          type={avatar.hair.type}
          mode={Emotions[emotion].hair.mode}
          size={avatar.hair.size + Emotions[emotion].hair.size}
          top={avatar.hair.top + Emotions[emotion].hair.top}
          left={avatar.hair.left + Emotions[emotion].hair.left}
          rot={avatar.hair.rot + Emotions[emotion].hair.rot}
          sizeX={this.props.sizeX}
        >
          <Hair type={avatar.hair.type} color={avatar.hair.color} />
        </HairC>

        <EyeL
          type={avatar.eyeL.type}
          mode={Emotions[emotion].eyeL.mode}
          size={avatar.eyeL.size + Emotions[emotion].eyeL.size}
          top={avatar.eyeL.top + Emotions[emotion].eyeL.top}
          left={avatar.eyeL.left + Emotions[emotion].eyeL.left}
          rot={avatar.eyeL.rot + Emotions[emotion].eyeL.rot}
          sizeX={this.props.sizeX}
        >
          <Eye
            type={avatar.eyeL.type}
            mode={Emotions[emotion].eyeL.mode}
            color={avatar.eyeL.color}
          />
        </EyeL>
        <NoseC
          type={avatar.nose.type}
          mode={Emotions[emotion].nose.mode}
          size={avatar.nose.size + Emotions[emotion].nose.size}
          top={avatar.nose.top + Emotions[emotion].nose.top}
          left={avatar.nose.left + Emotions[emotion].nose.left}
          rot={avatar.nose.rot + Emotions[emotion].nose.rot}
          sizeX={this.props.sizeX}
        >
          <Nose type={avatar.nose.type} color={avatar.head.color} />
        </NoseC>
        <EyeR
          type={avatar.eyeR.type}
          mode={Emotions[emotion].eyeR.mode}
          size={avatar.eyeR.size + Emotions[emotion].eyeR.size}
          top={avatar.eyeR.top + Emotions[emotion].eyeR.top}
          left={avatar.eyeR.left + Emotions[emotion].eyeR.left}
          rot={avatar.eyeR.rot + Emotions[emotion].eyeR.rot}
          sizeX={this.props.sizeX}
        >
          <Eye
            type={avatar.eyeR.type}
            mode={Emotions[emotion].eyeR.mode}
            color={avatar.eyeR.color}
          />
        </EyeR>
        <BrowL
          type={avatar.browL.type}
          mode={Emotions[emotion].browL.mode}
          size={avatar.browL.size + Emotions[emotion].browL.size}
          top={avatar.browL.top + Emotions[emotion].browL.top}
          left={avatar.browL.left + Emotions[emotion].browL.left}
          rot={avatar.browL.rot + Emotions[emotion].browL.rot}
          sizeX={this.props.sizeX}
        >
          <Brow
            type={avatar.browL.type}
            mode={Emotions[emotion].browL.mode}
            color={avatar.browL.color}
          />
        </BrowL>
        <BrowR
          type={avatar.browR.type}
          mode={Emotions[emotion].browR.mode}
          size={avatar.browR.size + Emotions[emotion].browR.size}
          top={avatar.browR.top + Emotions[emotion].browR.top}
          left={avatar.browR.left + Emotions[emotion].browR.left}
          rot={avatar.browR.rot + Emotions[emotion].browR.rot}
          sizeX={this.props.sizeX}
        >
          <Brow
            type={avatar.browR.type}
            mode={Emotions[emotion].browR.mode}
            color={avatar.browR.color}
          />
        </BrowR>
        <MouthC
          type={avatar.mouth.type}
          mode={Emotions[emotion].mouth.mode}
          size={avatar.mouth.size + Emotions[emotion].mouth.size}
          top={avatar.mouth.top + Emotions[emotion].mouth.top}
          left={avatar.mouth.left + Emotions[emotion].mouth.left}
          rot={avatar.mouth.rot + Emotions[emotion].mouth.rot}
          sizeX={this.props.sizeX}
        >
          <Mouth
            type={avatar.mouth.type}
            mode={Emotions[emotion].mouth.mode}
            color={avatar.mouth.color}
          />
        </MouthC>
        <EarC
          type={avatar.ear.type}
          mode={Emotions[emotion].ear.mode}
          size={avatar.ear.size + Emotions[emotion].ear.size}
          top={avatar.ear.top + Emotions[emotion].ear.top}
          left={avatar.ear.left + Emotions[emotion].ear.left}
          rot={avatar.ear.rot + Emotions[emotion].ear.rot}
          sizeX={this.props.sizeX}
        >
          <Ear type={avatar.ear.type} color={avatar.head.color} />
        </EarC>
      </AvatarC>
    );
  }
}

export default Avatar;
