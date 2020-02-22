import {all, put, takeLatest, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import axios from 'axios';

import {configSaveSuccess, configSaveFailure} from '../config/actions';
import getRealm from '~/services/realm';

export function* SaveData({payload}) {
  console.tron.log(payload);
  const {protocol, address, door, route} = payload;

  const api = axios.create({
    baseURL: `${protocol}://${address}:${door}`,
  });

  // console.tron.log('baseURL: ', `${protocol}://${address}:${door}/${route}`);

  const DoorToDoor = yield getData('DoorToDoor');
  const Social = yield getData('Social');
  const children = yield getData('children');

  if (DoorToDoor.length === 0 && Social.length === 0 && children.length === 0) {
    Alert.alert('PIB Valo Velho', 'Não existem dados a serem salvos.');
    yield put(configSaveFailure());
  } else {
    try {
      const response = yield call(api.post, `${route}`, {
        DoorToDoor: Object.entries(DoorToDoor),
        Social: Object.entries(Social),
        children: Object.entries(children),
      });

      console.tron.log('response: ', response);
      clearData('DoorToDoor');
      clearData('Social');
      clearData('children');
      // yield api.post(dados);
      Alert.alert('PIB Valo Velho', 'Dados salvos com sucesso.');
      yield put(configSaveSuccess());
    } catch (error) {
      console.tron.log('error: ', error);
      Alert.alert('PIB Valo Velho', 'Erro ao enviar dados.');
      yield put(configSaveFailure());
    }
  }
}

async function getData(database) {
  const realm = await getRealm();

  const data = realm.objects(database).sorted('id', true);

  let array = Array.from(data);

  // realm.close();

  return array;
}

async function clearData(database) {
  const realm = await getRealm();

  realm.write(() => {
    let allData = realm.objects(database);
    realm.delete(allData); // Deletes all Data
  });
}

export default all([takeLatest('@config/SAVE_REQUEST', SaveData)]);
