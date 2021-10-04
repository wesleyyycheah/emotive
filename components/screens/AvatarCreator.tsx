import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components/native';
import Avatar from '../Avatar';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Head from '../AvatarParts/Head';
import Hair from '../AvatarParts/Hair';
import Eye from '../AvatarParts/Eye';
import Nose from '../AvatarParts/Nose';
import Mouth from '../AvatarParts/Mouth';
import Ear from '../AvatarParts/Ear';
import Brow from '../AvatarParts/Brow';
import { API } from '@env';
import AvatarPartEditor from '../AvatarPartEditor';
import Emotions from '../AvatarParts/Emotions';
//type definitions
type avatarKey =
  | 'hair'
  | 'head'
  | 'ear'
  | 'eyeL'
  | 'eyeR'
  | 'nose'
  | 'mouth'
  | 'browL'
  | 'browR';
type listType = {
  [key in avatarKey]: number;
};

//list of number of types for each part
const partsList: listType = {
  hair: 3,
  head: 6,
  ear: 4,
  eyeL: 1,
  eyeR: 1,
  nose: 8,
  mouth: 1,
  browL: 4,
  browR: 4,
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
  margin: auto;
  padding: 5px;
`;
const EPartsCR = styled.View<{}>`
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

const ECPart = styled.Pressable<{ key: number }>`
  flex: 1;
  width: 80px;
  height: 80px;
  padding: 5px;
  margin: 10px;
  border-radius: 25px;
  background: #c4c4c4;
`;

const AvatarEC = styled.TouchableOpacity`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

const Done = styled.TouchableOpacity`
  color: #ffffff;
  background-color: #ff6085;
  margin: 5px;
  padding: 10px;
  font-family: Comfortaa_300Light;
  font-size: 24px;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 25px;
  top: 10px;
  right: 5px;
  position: absolute;
`;
const BText = styled.Text`
  color: #ffffff;
  font-family: Comfortaa_300Light;
  font-size: 24px;
`;

type AvatarType = {
  [key in avatarKey]: {
    color: string;
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
  emotion: number;
};
type CreatorProps = {
  userID: string;
  avatar: AvatarType;
  navigation: any;
  setNav: Function;
};

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
        head: {
          color: '#e6c9a1',
          type: 5,
          size: 100,
          top: 0,
          left: 0,
          rot: 0,
        },
        ear: {
          color: '#e6c9a1',
          type: 1,
          size: 30,
          top: 35,
          left: 60,
          rot: 0,
        },
        eyeL: {
          color: '#fff',
          type: 0,
          size: 20,
          top: 35,
          left: 15,
          rot: 0,
        },
        eyeR: {
          color: '#fff',
          type: 0,
          size: 20,
          top: 35,
          left: 37,
          rot: 0,
        },
        nose: {
          color: '#e6c9a1',
          type: 0,
          size: 20,
          top: 50,
          left: 25,
          rot: 0,
        },
        mouth: {
          color: '#e6c9a1',
          type: 0,
          size: 20,
          top: 65,
          left: 30,
          rot: 0,
        },
        browL: {
          color: '#291600',
          type: 0,
          size: 20,
          top: 50,
          left: 25,
          rot: 0,
        },
        browR: {
          color: '#291600',
          type: 0,
          size: 20,
          top: 65,
          left: 30,
          rot: 0,
        },
      },
      sizeX: 3,
      editorPage: 0,
      editorToggle: true,
      editorPart: 'head',
      parts: [],
      emotion: 0,
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
      parts.push(<EPartsCR key={i}>{x}</EPartsCR>);
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
    let { avatar, editorPart } = this.state;
    avatar[editorPart].type = id;
    if (editorPart === 'browL' || editorPart === 'eyeL') {
      avatar.browR.type = avatar.browL.type;
      avatar.eyeR.type = avatar.eyeL.type;
    }
    this.setState({ avatar: avatar, editorPage: 1 });
    this.updateAvatar(avatar);
  }

  editorPartSelect(part: avatarKey) {
    const { avatar } = this.state;
    if (this.state.editorPart !== part) {
      const n = Math.round(Dimensions.get('window').width / 110);
      let parts = [];
      if (part === 'hair') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Hair type={j} color={avatar.hair.color} />
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
                <Head type={j} color={avatar.head.color} />
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
                <Eye type={j} mode={0} color={avatar.eyeL.color} />
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
                <Nose type={j} color={avatar.head.color} />
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
                <Mouth type={j} mode={0} color={avatar.mouth.color} />
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
                <Ear type={j} color={avatar.head.color} />
              </ECPart>,
            );
          }
          parts.push(<EPartsCR>{x}</EPartsCR>);
        }
      } else if (part === 'browL' || part === 'browR') {
        for (let i = 0; i < partsList[part]; i += n) {
          let x = [];
          for (let j = i; j < i + n && j < partsList[part]; j++) {
            x.push(
              <ECPart key={j} onPress={() => this.editorPartIDSelect(j)}>
                <Brow type={j} mode={0} color={avatar.head.color} />
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
    let {
      avatar,
      sizeX,
      editorToggle,
      editorPart,
      parts,
      editorPage,
      emotion,
    } = this.state;
    return (
      <Container>
        <EditorC>
          <AvatarEC
            onPress={() => {
              this.setState({
                emotion: (emotion + 1) % (Emotions.length - 1),
              });
            }}
          >
            <Avatar avatar={avatar} sizeX={sizeX} emotion={emotion} />
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
                  <Head type={1} color={avatar.head.color} />
                </EHTab>
                <EHTab
                  id="hair"
                  active={editorPart === 'hair'}
                  onPress={() => this.editorPartSelect('hair')}
                >
                  <Hair type={1} color={avatar.hair.color} />
                </EHTab>
                <EHTab
                  id="browL"
                  active={editorPart === 'browL'}
                  onPress={() => this.editorPartSelect('browL')}
                >
                  <Brow type={0} mode={0} color={avatar.browL.color} />
                </EHTab>
                <EHTab
                  id="eyeL"
                  active={editorPart === 'eyeL'}
                  onPress={() => this.editorPartSelect('eyeL')}
                >
                  <Eye type={0} mode={2} color={avatar.eyeL.color} />
                </EHTab>
                <EHTab
                  id="ear"
                  active={editorPart === 'ear'}
                  onPress={() => this.editorPartSelect('ear')}
                >
                  <Ear type={1} color={avatar.ear.color} />
                </EHTab>
                <EHTab
                  id="nose"
                  active={editorPart === 'nose'}
                  onPress={() => this.editorPartSelect('nose')}
                >
                  <Nose type={1} color={avatar.nose.color} />
                </EHTab>
                <EHTab
                  id="mouth"
                  active={editorPart === 'mouth'}
                  onPress={() => this.editorPartSelect('mouth')}
                >
                  <Mouth type={0} mode={0} color={avatar.mouth.color} />
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
        <Done
          onPress={() => {
            this.props.setNav(true);
            this.props.navigation.navigate('Home');
          }}
        >
          <BText>Done</BText>
        </Done>
      </Container>
    );
  }
}

export default AvatarCreator;
