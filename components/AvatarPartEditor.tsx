import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
interface PartEditorProps {
  //   changeSize: Function;
  //   changeX: Function;
  //   changeY: Function;
  //   changeRot: Function;
}

const PEditor = styled.View<{}>`
  padding: 5px;
  width: 100%;
  height: 100%;
`;

const Left = styled.Pressable<{}>`
  position: absolute;
  left: 15%;
  top: 35%;
  transform: rotate(0deg);
`;
const Right = styled.Pressable<{}>`
  position: absolute;
  left: 65%;
  top: 35%;
  transform: rotate(180deg);
`;
const Up = styled.Pressable<{}>`
  position: absolute;
  left: 40%;
  top: 10%;
  transform: rotate(90deg);
`;
const Down = styled.Pressable<{}>`
  position: absolute;
  left: 40%;
  top: 60%;
  transform: rotate(270deg);
`;

const AvatarPartEditor = (props: PartEditorProps) => {
  return (
    <PEditor>
      <Left>
        <AntDesign name="caretleft" size={100} color="#c4c4c4" />
      </Left>
      <Right>
        <AntDesign name="caretleft" size={100} color="#c4c4c4" />
      </Right>
      <Up>
        <AntDesign name="caretleft" size={100} color="#c4c4c4" />
      </Up>
      <Down>
        <AntDesign name="caretleft" size={100} color="#c4c4c4" />
      </Down>
    </PEditor>
  );
};

export default AvatarPartEditor;
