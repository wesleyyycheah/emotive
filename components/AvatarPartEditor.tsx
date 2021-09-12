import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
interface PartEditorProps {
  changeSize: Function;
  changeX: Function;
  changeY: Function;
  //   changeRot: Function;
}

const PMover = styled.View<{}>`
  width: 300px;
  height: 300px;
  align-items: center;
  flex-direction: column;
`;

const Left = styled.Pressable<{}>`
  flex: 1;
  transform: rotate(0deg);
`;
const Right = styled.Pressable<{}>`
  flex: 1;
  transform: rotate(180deg);
`;
const Up = styled.Pressable<{}>`
  transform: rotate(90deg);
`;
const Down = styled.Pressable<{}>`
  transform: rotate(270deg);
`;
const LR = styled.View`
  flex-direction: row;
  width: 100%;
`;
const RotL = styled.Pressable<{}>`
  background-color: #c4c4c4;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  position: absolute;
  border-bottom-right-radius: 100px;
`;
const RotR = styled.Pressable<{}>`
  background-color: #c4c4c4;
  width: 100px;
  height: 100px;
  right: 0;
  top: 0;
  position: absolute;
  border-bottom-left-radius: 100px;
`;
const SizeUp = styled.Pressable<{}>`
  background-color: #c4c4c4;
  width: 100px;
  height: 100px;
  right: 0;
  bottom: 0;
  position: absolute;
  border-top-left-radius: 100px;
`;
const SizeDown = styled.Pressable<{}>`
  background-color: #c4c4c4;
  width: 100px;
  height: 100px;
  left: 0;
  bottom: 0;
  position: absolute;
  border-top-right-radius: 100px;
`;

const AvatarPartEditor = (props: PartEditorProps) => {
  const { changeY, changeX, changeSize } = props;
  return (
    <>
      <PMover>
        <Up onPress={() => changeY(-1)}>
          <AntDesign name="caretleft" size={100} color="#c4c4c4" />
        </Up>
        <LR>
          <Left onPress={() => changeX(-1)}>
            <AntDesign name="caretleft" size={100} color="#c4c4c4" />
          </Left>
          <Right onPress={() => changeX(1)}>
            <AntDesign name="caretleft" size={100} color="#c4c4c4" />
          </Right>
        </LR>
        <Down onPress={() => changeY(1)}>
          <AntDesign name="caretleft" size={100} color="#c4c4c4" />
        </Down>
      </PMover>
      <RotL />
      <RotR />
      <SizeUp onPress={() => changeSize(1)} />
      <SizeDown onPress={() => changeSize(-1)} />
    </>
  );
};

export default AvatarPartEditor;
