import * as React from 'react';
import Head5 from './AvatarParts/Head';
import { Component } from 'react';
import Nose1 from './AvatarParts/Nose';
import Eye2 from './AvatarParts/Eye';
import Mouth1 from './AvatarParts/Mouth';
import Ear1 from './AvatarParts/Ear';
import styled from 'styled-components/native';
import Hair1 from './AvatarParts/Hair';

const NoseC = styled.View`
  position: absolute;
  height: 20%;
  width: 20%;
  margin: 5% 20% 0 0%;
`;
const EyeL = styled.View`
  position: absolute;
  height: 20%;
  width: 20%;
  margin: -20% 0% 0 0%;
`;
const EyeR = styled.View`
  position: absolute;
  height: 20%;
  width: 20%;
  margin: -20% 40% 0 0%;
`;
const HeadC = styled.View`
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  height: 100%;
  width: 100%;
`;
const MouthC = styled.View`
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  height: 30%;
  width: 30%;
  margin: 40% 0% 0 0%;
`;
const EarC = styled.View`
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  height: 30%;
  width: 30%;
  margin: -10% -65% 0 0%;
`;
const HairC = styled.View`
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  height: 85%;
  width: 85%;
  margin: -50% -5% 0 0%;
`;
const AvatarC = styled.View`
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 250px;
  width: 250px;
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
