import moment from 'moment';

export const canPlaySlots = (slotsDateRun) => {
  let slotsDate = moment(slotsDateRun !== '' ? slotsDateRun : '2022-01-01');
  slotsDate.add(1, 'day');
  
  const currentTime = moment.utc();
  return currentTime.isAfter(slotsDate);
}