import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from './styles';
import Icon from './Icon';

const ListItem = ({
  text,
  selected = false,
  onPress,
  checkmark = true,
  visible = true,
  iconBackground,
}) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        {selected ? (
          <Icon
            checkmark={checkmark}
            visible={visible}
            iconBackground={iconBackground}
          />
        ) : (
          <Icon />
        )}
      </View>
    </TouchableHighlight>
  );
};

ListItem.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  checkmark: PropTypes.bool,
  visible: PropTypes.bool,
  iconBackground: PropTypes.string,
};
export default ListItem;
