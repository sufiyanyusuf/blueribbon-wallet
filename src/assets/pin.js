import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Pin extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Svg width="36px" height="59px" viewBox="0 0 36 59" version="1.1" >
        
            <G id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="iPhone-XS" transform="translate(-280.000000, -603.000000)">
                    <G id="pin" transform="translate(280.000000, 603.000000)">
                        <G id="Group">
                            <G id="Group-3">
                                <Path d="M18,23 C19.1045695,23 20,23.8954305 20,25 L20,57 C20,58.1045695 19.1045695,59 18,59 C16.8954305,59 16,58.1045695 16,57 L16,25 C16,23.8954305 16.8954305,23 18,23 Z" id="Rectangle" fill="#000000"></Path>
                                <Circle id="Oval" fill="#000000" cx="18" cy="18" r="18"></Circle>
                                <Circle id="Oval" fill="#FFFFFF" cx="18" cy="18" r="6"></Circle>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>

      </View>
    );
  }
}


