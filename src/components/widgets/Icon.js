import React from 'react';
import { Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Octicon from 'react-native-vector-icons/dist/Octicons';
import Zocial from 'react-native-vector-icons/dist/Zocial';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { colors, measures } from 'common/styles';

function getSize(size) {
    if ((size >>> 0) > 0) return size;
    switch (size) {
        case 'small': return measures.iconSizeSmall;
        case 'large': return measures.iconSizeLarge;
        default:
        case 'medium': return measures.iconSizeMedium;
    }
}

function getIonicon({ name, ...props }) {
    name = (Platform.OS === 'ios') ? `ios-${name}` : `md-${name}`;
    return <Ionicon name={name} {...props} />;
}

export const Icon = (props) => {
    if (!props.name) return null;
    const size = getSize(props.size);
    switch (props.type) {
        case 'ent': return <Entypo {...props} size={size} />;
        case 'ei': return <EvilIcon {...props} size={size} />;
        case 'fe': return <Feather {...props} size={size} />;
        case 'fa': return <FontAwesome {...props} size={size} />;
        case 'fo': return <Foundation {...props} size={size} />;
        case 'md': return <MaterialIcon {...props} size={size} />;
        case 'mdc': return <MaterialCommunityIcon {...props} size={size} />;
        case 'oct': return <Octicon {...props} size={size} />;
        case 'zo': return <Zocial {...props} size={size} />;
        case 'simple': return <SimpleLineIcon {...props} size={size} />;

        default:
        case 'ionicons': return getIonicon({ size, ...props });
    }
};