import * as React from 'react';
import Head5 from './AvatarParts/Head';
import { Component } from 'react';
import Nose1 from './AvatarParts/Nose';
import Eye2 from './AvatarParts/Eye';
import Mouth1 from './AvatarParts/Mouth';
import Ear1 from './AvatarParts/Ear';
import styled from 'styled-components/native';
import Hair1 from './AvatarParts/Hair';

const sizeM = 1.5;

const NoseC = styled.View`
  position: absolute;
  height: ${20 * sizeM}px;
  width: ${20 * sizeM}px;
  margin-left: ${25 * sizeM}px;
  margin-top: ${50 * sizeM}px;
`;
const EyeL = styled.View`
  position: absolute;
  height: ${20 * sizeM}px;
  width: ${20 * sizeM}px;
  margin-left: ${15 * sizeM}px;
  margin-top: ${35 * sizeM}px;
`;
const EyeR = styled.View`
  position: absolute;
  height: ${20 * sizeM}px;
  width: ${20 * sizeM}px;
  margin-left: ${35 * sizeM}px;
  margin-top: ${37 * sizeM}px;
`;
const HeadC = styled.View`
  position: absolute;
  height: ${100 * sizeM}px;
  width: ${100 * sizeM}px;
  margin-left: ${0 * sizeM}px;
  margin-top: ${0 * sizeM}px;
`;
const MouthC = styled.View`
  position: absolute;
  height: ${20 * sizeM}px;
  width: ${20 * sizeM}px;
  margin-left: ${30 * sizeM}px;
  margin-top: ${65 * sizeM}px;
`;
const EarC = styled.View`
  position: absolute;
  height: ${30 * sizeM}px;
  width: ${30 * sizeM}px;
  margin-left: ${60 * sizeM}px;
  margin-top: ${35 * sizeM}px;
`;
const HairC = styled.View`
  position: absolute;
  height: ${85 * sizeM}px;
  width: ${85 * sizeM}px;
  margin-left: ${5 * sizeM}px;
  margin-top: ${-17 * sizeM}px;
`;
const AvatarC = styled.View`
  top: 80px;
  position: absolute;
  width: 100px;
  height: 100px;
`;
class Avatar extends Component {
  state = {};
  render() {
    return (
      <AvatarC>
        <HeadC>
          <Head5 />
        </HeadC>
        <HairC>
          <Hair1 />
        </HairC>
        <NoseC>
          <Nose1 />
        </NoseC>
        <EyeL>
          <Eye2 />
        </EyeL>
        <EyeR>
          <Eye2 />
        </EyeR>
        <MouthC>
          <Mouth1 />
        </MouthC>
        <EarC>
          <Ear1 />
        </EarC>
      </AvatarC>
    );
  }
}

export default Avatar;
