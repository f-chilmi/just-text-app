// const moment = require('moment');
import * as moment from 'moment';

const reference = moment()
const today = reference.clone().startOf('day')
const yesterday = reference
  .clone()
  .subtract(1, 'days')
  .startOf('day')
const week = reference
  .clone()
  .subtract(7, 'days')
  .startOf('day')

function isToday(time, TODAY) {
  return moment(time).isSame(TODAY, 'd')
}

function isYesterday(time, YESTERDAY) {
  return moment(time).isSame(YESTERDAY, 'd')
}

function isWithinAWeek(time, AWEEK) {
  return moment(time).isAfter(AWEEK)
}

function ComplexTime(time, full = false) {
  if (isToday(time, today)) {
    return moment(time).format('HH:mm')
  }
  if (isYesterday(time, yesterday)) {
    if (full) {
      return `yesterday ${moment(time).format('HH:mm')}`
    }
    return 'yesterday'
  }
  if (isWithinAWeek(time, week)) {
    return moment(time)
      .utcOffset(60)
      .format('DD/MM/YYYY')
  }
  return moment(time)
    .utcOffset(60)
    .format('DD/MM/YYYY')
}

function GetExpiredDate(expDate) {
  const end = moment(expDate)
  const duration = moment.duration(end.diff(reference)).asMilliseconds()
  return duration
}

function secondsToHms(d) {
  const ds = Number(d)
  const h = Math.floor(ds / 3600)
  const m = Math.floor((ds % 3600) / 60)
  const s = Math.floor((ds % 3600) % 60)

  const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : ''
  const mDisplay = m > 0 ? m + (m === 1 ? 'm ' : 'm ') : ''
  const sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : '0s'
  return hDisplay + mDisplay + sDisplay
}

function milisecondsToHms(d) {
  const ds = Number(d) / 1000
  const h = Math.floor(ds / 3600)
  const m = Math.floor((ds % 3600) / 60)
  const s = Math.floor((ds % 3600) % 60)

  const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : ''
  const mDisplay = m > 0 ? m + (m === 1 ? 'm ' : 'm ') : ''
  const sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : '0s'
  return hDisplay + mDisplay + sDisplay
}

export { ComplexTime, GetExpiredDate, secondsToHms, milisecondsToHms }
