import React, {LegacyRef, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FeelingSelector from './components/FeelingSelector';
import CalendarStrip from '../../components/ActivityCalendar/CalendarStrip';
import moment from 'moment';
import {emojiEmotion} from 'emoji-emotion';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type Props = {};

type EmojiItem = {name: string; emoji: string; polarity: number};

const markedDatesArrayInit = [
  {
    date: moment(),
    emoji: [
      {
        text: emojiEmotion[0].emoji,
      },
    ],
  },
  {
    date: moment().subtract(2, 'day'),
    emoji: [
      {
        text: emojiEmotion[11].emoji,
      },
    ],
  },
  {
    date: moment().subtract(1, 'day'),
    emoji: [
      {
        text: emojiEmotion[15].emoji,
      },
    ],
  },
  {
    date: moment().subtract(4, 'day'),
    emoji: [
      {
        text: emojiEmotion[10].emoji,
      },
    ],
  },
];

const Routine: React.FunctionComponent<Props> = ({}) => {
  const calendarRef = useRef<any>();
  const [startingDate, setStartingDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [markedDatesArray, setMarkedDate] = useState(markedDatesArrayInit);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedEmojiBottom, setSelectedEmojiBottom] = useState<EmojiItem>(emojiEmotion[0]);

  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
  };

  const onMonthPrevious = () => {
    calendarRef.current.setSelectedDate(selectedDate.subtract(1, 'month'));
  };

  const onMonthNext = (weekStartDate: any) => {
    if (
      weekStartDate.month() == moment().month() &&
      weekStartDate.year() == moment().year()
    ) {
      Alert.alert('Future month can not be visible.');
    } else {
      calendarRef.current.setSelectedDate(selectedDate.add(1, 'month'));
    }
  };

  const onDateSelected = (selectedDate: any) => {
    setSelectedEmojiBottom(emojiEmotion[0])
    bottomSheetRef.current?.present();
    setSelectedDate(selectedDate);
  };

  const onSelectEmoji = (emoji: EmojiItem) => {
    setSelectedEmojiBottom(emoji);
    const dateObject = {
      date: selectedDate,
      emoji: [
        {
          text: emoji.emoji,
        },
      ],
    };
    const newArray = markedDatesArray.filter((item: any) => item.date.day() !== selectedDate.day())
    newArray.push(dateObject);
    setMarkedDate(newArray);
  };

  const onTodaySelectEmoji = (emoji: EmojiItem) => {
    const dateObject = {
      date: moment(),
      emoji: [
        {
          text: emoji.emoji,
        },
      ],
    };
    const newArray = markedDatesArray.filter((item: any) => item.date.day() !== moment().day())
    newArray.push(dateObject);
    setMarkedDate(newArray);
  };
  

  return (
    <BottomSheetModalProvider>
      <View style={styles.mainContainer}>
        <View style={styles.icancontainer}>
          <View style={styles.rowview}>
            <Image
              style={styles.userstyle}
              source={require('../../assets/images/user.png')}
            />
            <Text style={styles.textstyle}>My Routine</Text>
          </View>
          <Image
            style={styles.msgIconStyle}
            source={require('../../assets/images/comment.png')}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.textcontainer}>
            <Text style={styles.gudafter}>GOOD AFTERNOON</Text>
            <Text style={styles.namestyle}> Vishal Attri!</Text>
          </View>
          <View style={styles.vitaglowcontainer}>
            <Text style={styles.vitaglowtext}>
              Everyday you become a better version of yourself with VitaGlow!
            </Text>
            <View style={styles.rowview}>
              <Text style={styles.clsstyle}>close</Text>
              <Text style={styles.closetext}>share daily quote</Text>
            </View>
          </View>
          <Text style={styles.daytextstyle}>Today</Text>
          <Text style={styles.datetextstyle}>{moment().format('dddd, MMMM DD')}</Text>
          <View style={styles.calendarContainer}>
            <CalendarStrip
              ref={calendarRef}
              scrollable={true}
              style={styles.calendarStyle}
              dayComponentHeight={100}
              onDateSelected={onDateSelected}
              dateNameStyle={styles.dateNameStyle}
              selectedDate={selectedDate}
              startingDate={startingDate}
              scrollToOnSetSelectedDate={true}
              calendarHeaderContainerStyle={styles.calendarHeaderContainerStyle}
              dateNumberStyle={styles.dateNumberStyle}
              markedDates={markedDatesArray}
              onMonthPrevious={onMonthPrevious}
              maxDate={moment()}
              onMonthNext={onMonthNext}
            />
          </View>
          <Text style={styles.feelText}>Today I feel...</Text>
          <FeelingSelector onSelectEmoji={onTodaySelectEmoji}/>
          <Text style={styles.habitText}>
            Add Your Good Habites and let's get started!{' '}
          </Text>
          <Image
            resizeMode={'contain'}
            style={styles.girlstyle}
            source={require('../../assets/images/girl.jpg')}
          />
          <Text style={styles.habiteTextStyle}>No Habites.</Text>
          <Text style={styles.plusTextStyle}>Tap '+' to start good days</Text>
          <View style={styles.borderstyle}></View>
          <Text style={styles.listTextStyle}>MY TO DO LIST:</Text>
          <View style={styles.squarStyle}></View>
          <View style={styles.borderstyle}></View>
        </ScrollView>
        <TouchableOpacity>
          <Image
            style={styles.plusIconStyle}
            source={require('../../assets/images/add.png')}
          />
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          onDismiss={() => onSelectEmoji(selectedEmojiBottom)}
          snapPoints={['65%']}>
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.feelText}>Today I feel...</Text>
            <View style={[styles.borderstyle, {marginTop: 0}]} />
            <View style={styles.feelingContainer} >
              <Text style={styles.emojiText}>{selectedEmojiBottom.emoji}</Text>
              <Text style={styles.emojiNameText}>{selectedEmojiBottom.name}</Text>
            </View>
            <FeelingSelector onSelectEmoji={onSelectEmoji} />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  emojiNameText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  emojiText: {
    fontSize: 100
  },
  feelingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  plusIconStyle: {
    alignSelf: 'center',
    height: 35,
    width: 35,
    tintColor: 'blue',
    position: 'absolute',
    bottom: 20,
  },
  mainContainer: {
    flex: 1,
  },
  squarStyle: {
    height: 18,
    width: 18,
    borderColor: 'gray',
    borderWidth: 2,
    marginStart: 20,
    marginTop: 15,
  },
  listTextStyle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    marginStart: 20,
  },
  borderstyle: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
    marginTop: 10,
  },
  plusTextStyle: {
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '400',
    marginTop: 15,
  },
  habiteTextStyle: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
  },
  girlstyle: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 400,
  },
  habitText: {
    marginHorizontal: 30,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 10,
  },
  msgIconStyle: {
    height: 35,
    width: 35,
  },
  userstyle: {
    tintColor: 'gray',
    height: 20,
    width: 20,
  },
  feelText: {
    fontWeight: '500',
    marginStart: 15,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  datetextstyle: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  daytextstyle: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  closetext: {
    color: 'white',
    fontSize: 18,
    marginStart: 20,
  },
  clsstyle: {
    fontSize: 18,
    color: '#bcbfc4',
  },
  rowview: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'flex-end',
    marginEnd: 15,
    alignItems: 'center',
  },
  vitaglowtext: {
    fontSize: 26,
    marginHorizontal: 20,
    marginTop: 30,
    color: 'white',
    fontWeight: '600',
  },
  vitaglowcontainer: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#547ce3',
    borderRadius: 20,
  },
  namestyle: {
    fontSize: 18,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  gudafter: {
    fontSize: 22,
    color: 'black',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  textcontainer: {
    flexDirection: 'row',
    marginStart: 10,
    marginTop: 20,
  },
  textstyle: {
    fontSize: 20,
    marginStart: 10,
  },
  icancontainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarContainer: {
    width: '95%',
    backgroundColor: '#f0c25d',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  calendarHeaderContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateNumberStyle: {
    fontSize: 14,
    color: '#171717',
  },
  dateNameStyle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#8D8D8D',
  },
  calendarStyle: {
    height: 145,
    marginTop: 27,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

export default Routine;
