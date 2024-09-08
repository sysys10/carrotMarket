// 이렇게 라이브러리를 임포트해주고
import moment from 'moment'

// 2017-08-28 17:22:21 요렇게 들어오는 데이터를 잘 요리해준다
export const changeToDate = (datetime) => {
  // 오늘 날짜
  let now = moment(new Date())
  // 오늘과의 시간 차이
  let duration = moment.duration(now.diff(datetime))
  // 변환
  // asSeconds 를 하면 오늘과의 시간차이를 
  // 초단위로 float datatype 으로 보여준다 (3.82 이런식)
  let seconds = duration.asSeconds()
  let minute = duration.asMinutes()
  let hours = duration.asHours()
  let days = duration.asDays()
  let weeks = duration.asWeeks()
  let month = duration.asMonths()
  let year = duration.asYears()
  
  // 그래서 사용할 때는 parseInt 를 사용해 int 로 바꿔야 한다. 
  if (minute < 1) {
  	// 1분 미만이면 초 단위로 보여주고,  
    return parseInt(seconds) + '초 전'
  } else if (hours < 1) {
    // 1시간 미만이면 분 단위로 보여주고
    return parseInt(minute) + '분 전'
  } else if (hours < 24) {
    // 하루 미만이면 시간으로 보여주고
    return parseInt(hours) + '시간 전'
  } else if (weeks < 1) {
    // 일주일 미만이면 일 단위로 보여주고
    return parseInt(days) + '일 전'
  } else if (month < 1) {
    // 한 달 미만이면 주 단위로 보여주고
    return parseInt(weeks) + '주 전'
  } else if (year < 1) {
    // 1년 미만이면 달 단위로 보여주고
    return parseInt(month) + '달 전'
  } else {
    // 1년 이상이면 넌 단위로 보여주고
    return parseInt(year) + '년 전'
  }
}

export const convertToM = (string) => {
  return string.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}