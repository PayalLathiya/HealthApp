/**
 * Created by bogdanbegovic on 8/26/16.
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //CALENDAR STYLES
  dividerLine: {
    height: 1,
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  dateText: {
    color: "#5D5D5D",
    fontSize: 12,
    lineHeight: 16,
  },
  calendarContainer: {
    overflow: "hidden",
  },
  datesStrip: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  calendarDates: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarHeader: {
    fontSize: 18,
    color: "#171717",
    lineHeight: 28,
  },
  headerComponentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    resizeMode: "contain",
  },

  //CALENDAR DAY
  dateRootContainer: {
    flex: 1,
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  dateName: {
    textAlign: "center",
  },
  weekendDateName: {
    color: "#A7A7A7",
    textAlign: "center",
  },
  dateNumber: {
    textAlign: "center",
  },
  weekendDateNumber: {
    color: "#A7A7A7",
    fontWeight: "bold",
    textAlign: "center",
  },
  dot: {
    width: 6,
    height: 6,
    marginTop: 1,
    borderRadius: 5,
    opacity: 0,
  },

  // CALENDAR DOTS
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  visibleDot: {
    opacity: 1,
    backgroundColor: "blue",
  },
  selectedDot: {
    backgroundColor: "blue",
  },

  // Calendar Lines
  line: {
    height: 4,
    marginTop: 3,
    borderRadius: 1,
    opacity: 0,
  },
  linesContainer: {
    justifyContent: "center",
  },
  visibleLine: {
    opacity: 1,
    backgroundColor: "blue",
  },
  selectedLine: {
    backgroundColor: "blue",
  },
  monthTextStyle: {
    color: "#171717",
    fontSize: 18,
    lineHeight: 28,
  },
});
