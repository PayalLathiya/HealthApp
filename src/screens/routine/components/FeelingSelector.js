import React, {RefObject, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {emojiEmotion} from 'emoji-emotion';
import CircleList from '../../../components/circleSlider';


const {width} = Dimensions.get('screen');
const RADIUS = width / 1.8;

export const CircleListItem = ({
  label,
  value,
}) => (
  <View>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const FeelingSelector = ({onSelectEmoji}) => {
  const [scrolling, setScrolling] = useState(false);
  let circleList = null;

  const _keyExtractor = (item) => item.name;

  const _onScrollBegin = () => setScrolling(true);

  const _onScrollEnd = (i) => {
    onSelectEmoji && onSelectEmoji(emojiEmotion[i])
    setScrolling(false)
  };

  const _renderItem = ({item}) => (
    <CircleListItem label={`${item.name}`} value={item.emoji + ''} />
  );

  return (
    <CircleList
        data={emojiEmotion}
        elementCount={16}
        keyExtractor={_keyExtractor}
        radius={RADIUS}
        innerRef={(component) => {
          circleList = component;
        }}
        onScrollBegin={_onScrollBegin}
        onScrollEnd={_onScrollEnd}
        renderItem={_renderItem}
      />
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 12,
    color: 'white',
    fontSize: 30,
  },
});

export default FeelingSelector;
