import * as moment from 'moment';

const reference = moment()
const today = reference.clone().startOf('day').format('DD')
const yesterday = reference
  .clone()
  .subtract(1, 'days')
  .startOf('day')
  .format('DD')

function ComplexTime(time) {
  switch (moment(time).format('DD')) {
    case today: {
      return moment(time).format('HH:mm')
    }
    case yesterday: {
      return `yesterday ${moment(time).format('HH:mm')}`
    }
    default: {
      return moment(time).utcOffset(60).format('DD/MM/YYYY')
    }
  }
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
