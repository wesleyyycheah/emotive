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
}

let sizeM = 3;

let NoseC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let EyeL = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let EyeR = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let HeadC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let MouthC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let EarC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let HairC = styled.View<StyledProps>`
  position: absolute;
  height: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  width: ${(props) => PixelRatio.roundToNearestPixel(props.size * sizeM)}px;
  left: ${(props) => PixelRatio.roundToNearestPixel(props.left * sizeM)}px;
  top: ${(props) => PixelRatio.roundToNearestPixel(props.top * sizeM)}px;
`;
let AvatarC = styled.View`
  top: ${PixelRatio.roundToNearestPixel(-50 * sizeM)}px;
  left: ${PixelRatio.roundToNearestPixel(-50 * sizeM)}px;
`;

class Avatar extends Component {
  state = {
    avatar: {
      hair: { type: 0, size: 85, top: -17, left: 5 },
      head: { type: 0, size: 100, top: 0, left: 0 },
      ear: { type: 0, size: 30, top: 35, left: 60 },
      eyeL: { type: 0, size: 20, top: 35, left: 15 },
      eyeR: { type: 0, size: 20, top: 35, left: 37 },
      nose: { type: 0, size: 20, top: 50, left: 25 },
      mouth: { type: 0, size: 20, top: 65, left: 30 },
    },
  };
  handleButton = () => {
    let avatar = this.state.avatar;
    avatar.eyeL.type = 1;
    this.setState({ avatar: avatar });
  };
  render() {
    let { avatar } = this.state;
    return (
      <>
        <AvatarC>
          <HeadC
            size={avatar.head.size}
            top={avatar.head.top}
            left={avatar.head.left}
          >
            <Head />
          </HeadC>
          <HairC
            size={avatar.hair.size}
            top={avatar.hair.top}
            left={avatar.hair.left}
          >
            <Hair />
          </HairC>
          <NoseC
            size={avatar.nose.size}
            top={avatar.nose.top}
            left={avatar.nose.left}
          >
            <Nose />
          </NoseC>
          <EyeL
            size={avatar.eyeL.size}
            top={avatar.eyeL.top}
            left={avatar.eyeL.left}
          >
            <Eye type={avatar.eyeL.type} />
          </EyeL>
          <EyeR
            size={avatar.eyeR.size}
            top={avatar.eyeR.top}
            left={avatar.eyeR.left}
          >
            <Eye type={avatar.eyeR.type} />
          </EyeR>
          <MouthC
            size={avatar.mouth.size}
            top={avatar.mouth.top}
            left={avatar.mouth.left}
          >
            <Mouth />
          </MouthC>
          <EarC
            size={avatar.ear.size}
            top={avatar.ear.top}
            left={avatar.ear.left}
          >
            <Ear />
          </EarC>
        </AvatarC>
        <Button
          onPress={this.handleButton}
          title="Make Eyes Look Like Mouths"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </>
    );
  }
}

export default Avatar;
