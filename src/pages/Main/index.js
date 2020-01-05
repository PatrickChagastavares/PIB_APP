import React from 'react';
import {Image, Dimensions, Text, View} from 'react-native';
import IconCross from 'react-native-vector-icons/FontAwesome5';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import logo from '~/assets/Logo_white.png';
import Background from '~/components/background';

import {Container} from './styles';

const {width} = Dimensions.get('window');

export default function Main() {
  //celtic-cross
  const date = new Date();

  return (
    <Background>
      <Container>
        <Image
          source={logo}
          style={{width: width * 0.5, height: width * 0.5}}
        />
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Viagem Missionaria {date.getFullYear()}
        </Text>

        <View
          style={{
            marginTop: 15,
          }}>
          <IconCross.Button
            name="cross"
            backgroundColor="#3b9eff"
            color="#fff"
            borderRadius={10}
            onPress={() => {}}>
            Ação Social
          </IconCross.Button>
          <View style={{marginTop: 10}}>
            <IconMC.Button
              name="baby"
              backgroundColor="#3b9eff"
              color="#fff"
              borderRadius={10}
              onPress={() => {}}>
              Crianças
            </IconMC.Button>
          </View>
          <View style={{marginTop: 10}}>
            <IconMC.Button
              name="door-open"
              backgroundColor="#3b9eff"
              color="#fff"
              borderRadius={10}
              onPress={() => {}}>
              Crianças
            </IconMC.Button>
          </View>
        </View>

        {/* <View>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={() => {}}
          /> */}
      </Container>
    </Background>
  );
}
