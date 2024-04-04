// TIMEZONE CONVERSION FUNCTION

import { parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { z } from 'zod';

export function getPopularOptions(data, maxPerKey = 5) {
  const uniqueValues = {};

  data.forEach((row) => {
    Object.entries(row).forEach(([key, value]) => {
      if (!uniqueValues[key]) {
        uniqueValues[key] = new Set();
      }
      if (uniqueValues[key].size < maxPerKey) {
        uniqueValues[key].add(value);
      }
    });
  });
  console.log('uniqueValues', uniqueValues);

  Object.keys(uniqueValues).forEach((key) => {
    uniqueValues[key] = [...uniqueValues[key]];
  });
  console.log('uniqueValues', uniqueValues);
  return uniqueValues;
  // Object.keys(uniqueValues)
}

export function getUtcTimestampFromLocalTime(
  localTime,
  timeFormat = 'yyyy-MM-dd hh:mm a'
) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [date, time, amOrPm] = localTime.split(' ');
  // console.log('date', date, 'time', time, 'amOrPm', amOrPm);
  let [hours, mins] = time.split(':');
  hours = parseInt(hours);
  mins = parseInt(mins);

  if (amOrPm === 'PM' && hours < 12) hours += 12;

  const DateObject = parse(
    `${date} ${hours}:${mins}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  );

  const utcDate = zonedTimeToUtc(DateObject, localTimeZone);

  return utcDate.toISOString();
}
