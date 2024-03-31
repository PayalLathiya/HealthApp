import React, {RefObject, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {emojiEmotion} from 'emoji-emotion';
import CircleList from '../../../components/circleSlider';


const {width} = Dimensions.get('screen');
const RADIUS = width / 1.8;

type Item = {name: string; emoji: string; polarity: number};

export const CircleListItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View>
    <Text style={styles.text}>{value}</Text>
  </View>
);

type Props = {
  onSelectEmoji?: (emoji: Item) => void;
};

const FeelingSelector: React.FunctionComponent<Props> = ({onSelectEmoji}) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  let circleList: any = null;

  const _keyExtractor = (item: Item) => item.name;

  const _onScrollBegin = () => setScrolling(true);

  const _onScrollEnd = (i: number) => {
    onSelectEmoji && onSelectEmoji(emojiEmotion[i])
    setScrolling(false)
  };

  const _renderItem = ({item}: {item: Item}) => (
    <CircleListItem label={`${item.name}`} value={item.emoji + ''} />
  );

  return (
    <CircleList
        data={emojiEmotion}
        elementCount={16}
        keyExtractor={_keyExtractor}
        radius={RADIUS}
        innerRef={(component: any) => {
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
