import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';
import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardDidShowListener = Keyboard.addListener(
      `keyboard${name}Show`,
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = () => {
    const {containerImageWidth, imageWidth} = this.state;

    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();
  };

  keyboardWillHide = () => {
    const {containerImageWidth, imageWidth} = this.state;

    Animated.parallel([
      Animated.timing(containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();
  };

  render() {
    const {containerImageWidth, imageWidth} = this.state;
    const {tintColor} = this.props;

    const containerImageStyles = [
      styles.containerImage,
      {width: containerImageWidth, height: containerImageWidth},
    ];
    const imageStyles = [
      styles.logo,
      {width: imageWidth},
      tintColor ? {tintColor} : null,
    ];

    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyles}>
          <Animated.Image
            resizeMode="contain"
            style={[StyleSheet.absoluteFill, containerImageStyles]}
            source={require('./images/background.png')}
          />
          <Animated.Image
            resizeMode="contain"
            style={imageStyles}
            source={require('./images/logo.png')}
          />
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;

// const Logo = () => {
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         resizeMode="contain"
//         style={styles.containerImage}
//         source={require('./images/background.png')}>
//         <ImageBackground
//           resizeMode="contain"
//           style={styles.image}
//           source={require('./images/logo.png')}
//         />
//       </ImageBackground>
//     </View>
//   );
// };
//
// export default Logo;

// export default class Logo extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       containerImageWidth: new Animated.Value(styles.$largeContainerSize),
//       imageWidth: new Animated.Value(styles.$largeImageSize),
//     };
//   }
//
//   componentDidMount() {
//     let showListener = 'keyboardWillShow';
//     let hideListener = 'keyboardWillHide';
//     if (Platform.OS === 'android') {
//       showListener = 'keyboardDidShow';
//       hideListener = 'keyboardDidHide';
//     }
//     this.KeyboardShowListener = Keyboard.addListener(
//       showListener,
//       this.keyboardShow,
//     );
//     this.KeyboardHideListener = Keyboard.addListener(
//       hideListener,
//       this.keyboardHide,
//     );
//   }
//
//   componentWillUnmount() {
//     this.KeyboardShowListener.remove();
//     this.KeyboardHideListener.remove();
//   }
//
//   keyboardShow = () => {
//     Animated.parallel([
//       Animated.timing(this.containerImageWidth, {
//         toValue: styles.$smallContainerSize,
//         duration: ANIMATION_DURATION,
//       }),
//       Animated.timing(this.imageWidth, {
//         toValue: styles.$smallImageSize,
//         duration: ANIMATION_DURATION,
//       }),
//     ]).start();
//   };
//
//   keyboardHide = () => {
//     Animated.parallel([
//       Animated.timing(this.containerImageWidth, {
//         toValue: styles.$largeContainerSize,
//         duration: ANIMATION_DURATION,
//       }),
//       Animated.timing(this.imageWidth, {
//         toValue: styles.$largeImageSize,
//         duration: ANIMATION_DURATION,
//       }),
//     ]).start();
//   };
//
//   render() {
//     const { containerImageWidth, imageWidth } = this.state;
//     const containerImageStyle = [
//       styles.containerImage,
//       {width: this.containerImageWidth, height: containerImageWidth},
//     ];
//
//     const imageStyle = [styles.logo, {width: imageWidth}];
//
//     return (
//       <View style={styles.container}>
//         <Animated.View style={containerImageStyle}>
//           <Animated.Image
//             resizeMode="contain"
//             style={containerImageStyle}
//             source={require('./images/background.png')}
//           />
//           <Animated.Image
//             resizeMode="contain"
//             style={imageStyle}
//             source={require('./images/logo.png')}
//           />
//         </Animated.View>
//         <Text style={styles.text}>Currency Converter</Text>
//       </View>
//     );
//   }
// }
