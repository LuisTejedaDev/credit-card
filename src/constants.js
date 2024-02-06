import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info';

const {isTablet} = DeviceInfo;

export const IsIphone = Platform.OS === 'ios' ? true : false
export const IsTablet = isTablet()
export const IsIpad = Platform.isPad