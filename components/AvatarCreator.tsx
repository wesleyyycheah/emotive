import * as React from 'react';
import { Component } from 'react';
import { Text } from 'react-native-svg';
import styled from 'styled-components/native';
import Avatar from './Avatar';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Head from './AvatarParts/Head';
import Hair from './AvatarParts/Hair';
import Eye from './AvatarParts/Eye';
import Nose from './AvatarParts/Nose';
import Mouth from './AvatarParts/Mouth';
import Ear from './AvatarParts/Ear';
import { API } from '@env';
//type definitions
type avatarKey = 'hair' | 'head' | 'ear' | 'eyeL' | 'eyeR' | 'nose' | 'mouth';
type listType = {
  [key in avatarKey]: number;
};

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

//Styled Components
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
const EHTab = styled.Pressable<{ id: string; active: boolean }>`
  background: ${(props) => (props.active ? '#ececec' : '#DCDADA')};
  width: 80px;
  height: ${(props) => (props.active ? '95%' : '90%')};
  margin-top: auto;
  margin-right: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 5px;
`;
const EContent = styled.View<{ toggle: boolean }>`
  flex: ${(props) => (props.toggle ? 5 : 0)};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const ECPart = styled.Pressable<{ key: number }>`
  width: 80px;
  height: 80px;
  padding: 5px;
  margin: 10px;
  border-radius: 25px;
  background: #c4c4c4;
`;

const AvatarEC = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;
type AvatarType = {
  [key in avatarKey]: {
    color?: string;
    type: number;
    size: number;
    top: number;
    left: number;
  };
};
type CreatorState = {
  avatar: AvatarType;
  sizeX: number;
  editorPage: number;
  editorToggle: boolean;
  editorPart: avatarKey;
  parts: Array<JSX.Element>;
};
type CreatorProps = {};

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
      editorPart: 'head',
      parts: [],
    };
    this.editorPartSelect = this.editorPartSelect.bind(this);
    this.editorToggle = this.editorToggle.bind(this);
  }
  componentDidMount() {
    let parts = [];
    for (let i = 0; i < partsList['head']; i++) {
      parts.push(
        <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
          <Head type={i} />
        </ECPart>,
      );
    }
    this.setState({ parts: parts });
    this.getUserAvatar();
  }
  async getUserAvatar() {
    await axios
      .request<AvatarType>({
        method: 'post',
        url: API + 'user/avatar/get',
        data: {
          _id: '61279f057e518a766eb14a5c',
        },
      })
      .then((response) => {
        this.setState({ avatar: response.data });
      });
  }
  updateAvatar(avatar: AvatarType) {
    axios({
      method: 'post',
      url: API + 'user/avatar/update',
      data: {
        _id: '61279f057e518a766eb14a5c',
        avatar: avatar,
      },
    });
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

  editorPartIDSelect(id: number): void {
    let { avatar } = this.state;
    avatar[this.state.editorPart].type = id;
    this.setState({ avatar: avatar });
    this.updateAvatar(avatar);
    this.getUserAvatar();
  }

  editorPartSelect(part: avatarKey) {
    let parts = [];

    if (part === 'hair') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Hair type={i} color={'#000'} />
          </ECPart>,
        );
      }
    } else if (part === 'head') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Head type={i} color={'#000'} />
          </ECPart>,
        );
      }
    } else if (part === 'eyeL' || part === 'eyeR') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Eye type={i} />
          </ECPart>,
        );
      }
    } else if (part === 'nose') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Nose type={i} />
          </ECPart>,
        );
      }
    } else if (part === 'mouth') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Mouth type={i} />
          </ECPart>,
        );
      }
    } else if (part === 'ear') {
      for (let i = 0; i < partsList[part]; i++) {
        parts.push(
          <ECPart key={i} onPress={() => this.editorPartIDSelect(i)}>
            <Ear type={i} />
          </ECPart>,
        );
      }
    }

    this.setState({ editorPart: part, parts: parts });
  }

  render() {
    let { avatar, sizeX, editorToggle, editorPart, parts } = this.state;
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
            <EHToggle toggle={editorToggle} onPress={this.editorToggle}>
              <AntDesign name="downcircle" size={35} color="#c4c4c4" />
            </EHToggle>
            <EHTabs horizontal={true}>
              <EHTab
                id="head"
                active={editorPart === 'head'}
                onPress={() => this.editorPartSelect('head')}
              >
                <Head type={1} color={'#000'} />
              </EHTab>
              <EHTab
                id="hair"
                active={editorPart === 'hair'}
                onPress={() => this.editorPartSelect('hair')}
              >
                <Hair type={1} color={'#000'} />
              </EHTab>
              <EHTab
                id="eyeL"
                active={editorPart === 'eyeL'}
                onPress={() => this.editorPartSelect('eyeL')}
              >
                <Eye type={1} />
              </EHTab>
              <EHTab
                id="eyeR"
                active={editorPart === 'eyeR'}
                onPress={() => this.editorPartSelect('eyeR')}
              >
                <Eye type={1} />
              </EHTab>
              <EHTab
                id="ear"
                active={editorPart === 'ear'}
                onPress={() => this.editorPartSelect('ear')}
              >
                <Ear type={1} />
              </EHTab>
              <EHTab
                id="nose"
                active={editorPart === 'nose'}
                onPress={() => this.editorPartSelect('nose')}
              >
                <Nose type={1} />
              </EHTab>
              <EHTab
                id="mouth"
                active={editorPart === 'mouth'}
                onPress={() => this.editorPartSelect('mouth')}
              >
                <Mouth type={1} />
              </EHTab>
            </EHTabs>
          </EHeader>
          <EContent toggle={editorToggle}>{parts}</EContent>
        </Editor>
      </EditorC>
    );
  }
}

export default AvatarCreator;
