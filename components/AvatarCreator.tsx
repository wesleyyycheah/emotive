import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components/native';
import Avatar from './Avatar';
import { Dimensions, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
  editorPage: number;
  editorToggle: boolean;
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
const EditorC = styled.View`
  justify-content: center;
  flex-wrap: wrap;
`;
const Editor = styled.View<{ toggle: boolean }>`
  flex: ${(props) => (props.toggle ? 10 : 1)};
  height: ${Dimensions.get('window').height * 0.2}px;
  width: ${Dimensions.get('window').width}px;
  background: #ececec;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const EHeader = styled.View`
  flex: 1;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  flex-direction: row;
`;

const EHToggle = styled.Pressable<{ toggle: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  transform: rotate(${(props) => (props.toggle ? '0deg' : '180deg')});
`;
const EHTabs = styled.ScrollView`
  flex: 5;
  background: #c4c4c4;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 25px;
  overflow: scroll;
  flex-wrap: nowrap;
  flex-direction: row;
`;
const EHTab = styled.View<{ active: boolean }>`
  background: ${(props) => (props.active ? '#ececec' : '#DCDADA')};
  width: 80px;
  height: ${(props) => (props.active ? '95%' : '90%')};
  margin-top: auto;
  margin-right: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;
const EContent = styled.ScrollView<{ toggle: boolean }>`
  flex: ${(props) => (props.toggle ? 5 : 0)};
`;

const AvatarEC = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

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
      editorPage: 0,
      editorToggle: true,
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

  editorToggle(): void {
    const { editorToggle } = this.state;
    this.setState({ editorToggle: !editorToggle });
  }

  render() {
    let { avatar, sizeX, editorToggle } = this.state;
    return (
      <EditorC>
        <AvatarEC>
          <Avatar
            avatar={avatar}
            onPressFunction={this.onPressFunction.bind(this)}
            sizeX={sizeX}
          />
        </AvatarEC>
        <Editor toggle={editorToggle}>
          <EHeader>
            <EHToggle
              toggle={editorToggle}
              onPress={this.editorToggle.bind(this)}
            >
              <AntDesign name="downcircle" size={35} color="#c4c4c4" />
            </EHToggle>
            <EHTabs horizontal={true}>
              <EHTab active={false} />
              <EHTab active={false} />
              <EHTab active={true} />
              <EHTab active={false} />
              <EHTab active={false} />
              <EHTab active={false} />
              <EHTab active={false} />
              <EHTab active={false} />
              <EHTab active={false} />
            </EHTabs>
          </EHeader>
          <EContent toggle={editorToggle}></EContent>
        </Editor>
      </EditorC>
    );
  }
}

export default AvatarCreator;
