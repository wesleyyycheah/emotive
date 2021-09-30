import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
const NavBarContainer = styled.View`
  position: absolute;
  flex-direction: row;
  flex-wrap: nowrap;
  bottom: 0;
`;
const Tab = styled.Pressable<{ selected: boolean }>`
  flex: ${(props) => (props.selected ? '1.2' : '1')};
  margin-top: auto;
  border-top-left-radius: ${(props) => (props.selected ? '25px' : '10px')};
  border-top-right-radius: ${(props) => (props.selected ? '25px' : '10px')};
  height: ${(props) => (props.selected ? '80px' : '60px')};
  background: ${(props) => (props.selected ? '#ff6085' : '#de3163')};
  align-items: center;
  justify-content: center;
`;
type NavBarProps = {};
const NavBar = (props: NavBarProps) => {
  const [tab, setTab] = useState({
    goals: false,
    people: false,
    home: true,
    cal: false,
    settings: false,
  });
  return (
    <NavBarContainer>
      <Tab
        selected={tab.goals}
        onPress={() => {
          setTab({
            goals: true,
            people: false,
            home: false,
            cal: false,
            settings: false,
          });
        }}
      >
        <AntDesign name="star" size={tab.goals ? 45 : 35} color="white" />
      </Tab>
      <Tab
        selected={tab.people}
        onPress={() => {
          setTab({
            goals: false,
            people: true,
            home: false,
            cal: false,
            settings: false,
          });
        }}
      >
        <Ionicons name="heart" size={tab.people ? 45 : 35} color="white" />
      </Tab>
      <Tab
        selected={tab.home}
        onPress={() => {
          setTab({
            goals: false,
            people: false,
            home: true,
            cal: false,
            settings: false,
          });
        }}
      >
        <FontAwesome5 name="home" size={tab.home ? 45 : 35} color="white" />
      </Tab>
      <Tab
        selected={tab.cal}
        onPress={() => {
          setTab({
            goals: false,
            people: false,
            home: false,
            cal: true,
            settings: false,
          });
        }}
      >
        <Ionicons name="calendar" size={tab.cal ? 45 : 35} color="white" />
      </Tab>
      <Tab
        selected={tab.settings}
        onPress={() => {
          setTab({
            goals: false,
            people: false,
            home: false,
            cal: false,
            settings: true,
          });
        }}
      >
        <Ionicons name="settings" size={tab.settings ? 45 : 35} color="white" />
      </Tab>
    </NavBarContainer>
  );
};

export default NavBar;
