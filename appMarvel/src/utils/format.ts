/* eslint-disable @typescript-eslint/ban-types */
import { format } from 'date-fns';

export const removeHTML = (message: string | undefined): string | undefined => {
  const regex = /(<([^>]+)>)/gi;

  return message ? message.replace(regex, '') : undefined;
};

const parseDate = (dateString: string): number => {
  let parts = dateString.split(/[T ]/);
  const date = parts[0];
  const time = parts[1];

  const dt = new Date();

  parts = date.split(/[-\/]/);
  dt.setFullYear(parseInt(parts[0], 10));
  dt.setMonth(parseInt(parts[1], 10) - 1);
  dt.setDate(parseInt(parts[2], 10));

  parts = time.split(/:/);
  dt.setHours(parseInt(parts[0], 10));
  dt.setMinutes(parseInt(parts[1], 10));
  dt.setSeconds(parseInt(parts[2], 10));

  return dt.getTime();
};

export const formatDate = (date: string | number): string => {
  if (typeof date === 'string') {
    return format(parseDate(date), 'MMMM dd, yyyy');
  }

  return format(date, 'MMMM dd, yyyy');
};

export const sortByField = (a: object, b: object, field: string) => {
  if (a[field] < b[field]) {
    return -1;
  }

  if (a[field] > b[field]) {
    return 1;
  }

  return 0;
};
