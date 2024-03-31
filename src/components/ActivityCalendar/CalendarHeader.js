import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import styles from './Calendar.style.js';
import moment from 'moment';

class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    calendarHeaderStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    weekStartDate: PropTypes.object,
    weekEndDate: PropTypes.object,
    allowHeaderTextScaling: PropTypes.bool,
    fontSize: PropTypes.number,
    headerText: PropTypes.string,
    onHeaderSelected: PropTypes.func,
    onMonthPrevious: PropTypes.func,
    onMonthNext: PropTypes.func,
    selectedDate: PropTypes.any,
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(calendarHeaderFormat) {
    if (!this.props.weekStartDate || !this.props.weekEndDate) {
      return '';
    }

    const firstDay = this.props.weekStartDate;
    const lastDay = this.props.weekEndDate;
    let monthFormatting = '';
    //Parsing the month part of the user defined formating
    if ((calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
      monthFormatting = 'Mo';
    } else {
      if ((calendarHeaderFormat.match(/M/g) || []).length > 0) {
        for (
          let i = (calendarHeaderFormat.match(/M/g) || []).length;
          i > 0;
          i--
        ) {
          monthFormatting += 'M';
        }
      }
    }

    if (firstDay.month() === lastDay.month()) {
      return firstDay.format(calendarHeaderFormat);
    } else if (firstDay.year() !== lastDay.year()) {
      return `${firstDay.format(calendarHeaderFormat)} / ${lastDay.format(
        calendarHeaderFormat,
      )}`;
    }

    return `${
      monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ''
    } ${monthFormatting.length > 1 ? '/' : ''} ${lastDay.format(
      calendarHeaderFormat,
    )}`;
  }

  render() {
    const {
      calendarHeaderFormat,
      onHeaderSelected,
      calendarHeaderContainerStyle,
      calendarHeaderStyle,
      fontSize,
      allowHeaderTextScaling,
      weekStartDate: _weekStartDate,
      weekEndDate: _weekEndDate,
      headerText,
      onMonthPrevious,
      onMonthNext
    } = this.props;
    const _headerText =
      headerText || this.formatCalendarHeader(calendarHeaderFormat);
    const weekStartDate = _weekStartDate && _weekStartDate.clone();
    const weekEndDate = _weekEndDate && _weekEndDate.clone();

    return (
      <View style={styles.headerComponentView}>
        <TouchableOpacity onPress={() => onMonthPrevious && onMonthPrevious()}>
          <Image
            style={{height: 15, tintColor: 'purple'}}
            source={require('./img/left-arrow-black.png')}
          />
        </TouchableOpacity>
        {!!_headerText && (
          <TouchableOpacity
            onPress={
              onHeaderSelected &&
              onHeaderSelected.bind(this, {weekStartDate, weekEndDate})
            }
            disabled={!onHeaderSelected}
            style={[calendarHeaderContainerStyle, {flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}]}>
            <Text
              style={[
                styles.calendarHeader,
                {
                  marginEnd: 15,
                },
              ]}
              allowFontScaling={allowHeaderTextScaling}>
              <Text style={styles.monthTextStyle}>
                {moment(_headerText, 'MMMM YYYY').format('MMMM')}
              </Text>{' '}
              {moment(_headerText, 'MMMM YYYY').format('YYYY')}
            </Text>
            <Text
              style={{
                borderWidth: 2,
                borderColor: 'black',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 15,
                fontSize: 16,
                color: 'purple',
                alignSelf: 'flex-end'
              }}>
              Month
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onMonthNext && onMonthNext(weekStartDate)}>
          <Image
            style={{height: 15, tintColor: 'purple'}}
            source={require('./img/right-arrow-black.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default CalendarHeader;
