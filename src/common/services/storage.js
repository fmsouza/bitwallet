import SensitiveInfoStorage from 'react-native-sensitive-info';
import { Storage } from 'common/constants';

export const setItem = (key, value) => SensitiveInfoStorage.setItem(key, value, Storage.CONFIG);

export const getItem = (key) => SensitiveInfoStorage.getItem(key, Storage.CONFIG);