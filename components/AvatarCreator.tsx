import * as React from 'react';
import { Component } from 'react';
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
import AvatarPartEditor from './AvatarPartEditor';
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
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
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

const EHToggle = styled.Pressable<{ toggle: boolean; page: number }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  transform: rotate(
    ${(props) =>
      props.toggle ? (props.page === 0 ? '0deg' : '90deg') : '180deg'}
  );
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
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
const EPartsC = styled.ScrollView<{}>`
  flex-direction: column;
  padding: 5px;
`;
const EPartsCR = styled.View<{}>`
  flex-direction: row;
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
    rot: number;
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
type CreatorProps = { userID: string; avatar: AvatarType };

class AvatarCreator extends Component<CreatorProps, CreatorState> {
  constructor(props: CreatorProps) {
    super(props);
    this.state = {
      avatar: {
        hair: {
          color: '#291600',
          type: 1,
          size: 85,
          top: -17,
          left: 5,
          rot: 0,
        },
        head: { color: '#e6c9a1', type: 5, size: 100, top: 0, left: 0, rot: 0 },
        ear: { type: 1, size: 30, top: 35, left: 60, rot: 0 },
        eyeL: { type: 0, size: 20, top: 35, left: 15, rot: 0 },
        eyeR: { type: 0, size: 20, top: 35, left: 37, rot: 0 },
        nose: { type: 0, size: 20, top: 50, left: 25, rot: 0 },
        mouth: { type: 0, size: 20, top: 65, left: 30, rot: 0 },
      },
      sizeX: 3,
      editorPage: 0,
      editorToggle: true,
      editorPart: 'head',
      parts: [],
    };
    this.editorPartSelect = this.editorPartSelect.bind(this);
    this.editorToggle = this.editorToggle.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeX = this.changeX.bind(this);
    this.changeY = this.changeY.bind(this);
    this.changeRot = this.changeRot.bind(this);
  }
  componentDidMount() {
    let parts = [];
    const n = Math.round(Dimensions.get('window').width / 110);
    for (let i = 0; i < partsList['head']; i += n) {
      let x = [];
      for (let j = i; j < i + n && j < partsList['head']; j++) {
        x.push(
          <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
            <Head type={j} color={'#000'} />
          </ECPart>,
        );
      }
      parts.push(<EPartsCR>{x}</EPartsCR>);
    }
    this.setState({ parts: parts, avatar: this.props.avatar });
    //this.getUserAvatar();
  }
  async getUserAvatar() {
    await axios
      .request<AvatarType>({
        method: 'post',
        url: API + 'user/avatar/get',
        data: {
          _id: this.props.userID,
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
        _id: this.props.userID,
        avatar: avatar,
      },
    });
  }

  editorToggle(): void {
    const { editorToggle, editorPage } = this.state;
    if (editorPage === 0) {
      this.setState({ editorToggle: !editorToggle });
    } else {
      this.setState({ editorPage: editorPage - 1 });
    }
  }

  editorPartIDSelect(id: number): void {
    let { avatar } = this.state;
    avatar[this.state.editorPart].type = id;
    this.setState({ avatar: avatar, editorPage: 1 });
    this.updateAvatar(avatar);
  }

  editorPartSelect(part: avatarKey) {
    if (this.state.editorPart !== part) {
      const n = Math.round(Dimensions.get('window').width / 110);
      let parts = [];
      if (part === 'hair') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Hair type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'head') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Head type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'eyeL' || part === 'eyeR') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Eye type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'nose') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Nose type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'mouth') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Mouth type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'ear') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Ear type={j} color={'#000'} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      }
      this.setState({ editorPart: part, parts: parts, editorPage: 0 });
    } else {
      this.setState({ editorPage: 0 });
    }
  }

  changeSize(s: number) {
    let { avatar, editorPart } = this.state;
    avatar[editorPart].size += s;
    avatar[editorPart].left -= s;
    avatar[editorPart].top -= s;
    this.setState({ avatar: avatar });
    this.updateAvatar(avatar);
  }
  changeX(x: number) {
    let { avatar, editorPart } = this.state;
    avatar[editorPart].left += x;
    this.setState({ avatar: avatar });
    this.updateAvatar(avatar);
  }
  changeY(y: number) {
    let { avatar, editorPart } = this.state;
    avatar[editorPart].top += y;
    this.setState({ avatar: avatar });
    this.updateAvatar(avatar);
  }
  changeRot(d: number) {
    let { avatar, editorPart } = this.state;
    avatar[editorPart].rot += d;
    this.setState({ avatar: avatar });
    this.updateAvatar(avatar);
  }

  render() {
    let { avatar, sizeX, editorToggle, editorPart, parts, editorPage } =
      this.state;
    return (
      <Container>
        <EditorC>
          <AvatarEC>
            <Avatar avatar={avatar} sizeX={sizeX} />
          </AvatarEC>
          <Editor toggle={editorToggle}>
            <EHeader>
              <EHToggle
                toggle={editorToggle}
                page={editorPage}
                onPress={this.editorToggle}
              >
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
            <EContent toggle={editorToggle}>
              {editorPage === 0 ? (
                <EPartsC>{parts}</EPartsC>
              ) : (
                <AvatarPartEditor
                  changeX={this.changeX}
                  changeY={this.changeY}
                  changeSize={this.changeSize}
                  changeRot={this.changeRot}
                />
              )}
            </EContent>
          </Editor>
        </EditorC>
      </Container>
    );
  }
}

export default AvatarCreator;
