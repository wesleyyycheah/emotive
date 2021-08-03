import * as React from 'react';
import { Component } from 'react';
import Avatar from './Avatar';

//type definitions
type avatarKey = 'hair' | 'head' | 'ear' | 'eyeL' | 'eyeR' | 'nose' | 'mouth';
type listType = {
  [key in avatarKey]: number;
};

type CreatorState = {
  avatar: {
    [key in avatarKey]: {
      color?: string;
      type: number;
      size: number;
      top: number;
      left: number;
    };
  };
  sizeX: number;
};

type CreatorProps = {};

//list of number of types for each part
const partsList: listType = {
  hair: 3,
  head: 6,
  ear: 3,
  eyeL: 8,
  eyeR: 8,
  nose: 8,
  mouth: 9,
};

class AvatarCreator extends Component<CreatorProps, CreatorState> {
  constructor(props: CreatorProps) {
    super(props);
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
      sizeX: 3,
    };
  }

  onPressFunction(part: avatarKey): null {
    //make a copy of avatar
    let avatar = this.state.avatar;
    //set the avatar part to it + 1 mod by the length of the parts so it doesn't run out
    avatar[part].type = (avatar[part].type + 1) % partsList[part];
    //set state of avatar to avatar copy
    this.setState({ avatar: avatar });
    //return nothing
    return null;
  }

  render() {
    let { avatar, sizeX } = this.state;
    return (
      <>
        <Avatar
          avatar={avatar}
          onPressFunction={this.onPressFunction.bind(this)}
          sizeX={sizeX}
        />
      </>
    );
  }
}

export default AvatarCreator;
