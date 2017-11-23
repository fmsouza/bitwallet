import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'common/styles';

export const Container = props => <LinearGradient style={{ flex: 1 }} colors={[colors.purple, colors.pink]} {...props} />;