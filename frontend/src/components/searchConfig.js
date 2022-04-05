
export const pickerOptions = {
  shortcuts: [
    {
      text: '今日',
      onClick (picker) {
        const _start = createTargetTime(0, 'start')
        const _end = createTargetTime(0, 'end')
        picker.$emit('pick', [_start, _end])
      }
    },

    {
      text: '昨日',
      onClick (picker) {
        const _start = createTargetTime(-1, 'start')
        const _end = createTargetTime(-1, 'end')
        picker.$emit('pick', [_start, _end])
      }
    },
    {
      text: '最近一周', // ok
      onClick (picker) {
        const _start = createTargetTime(-6, 'start')
        const _end = createTargetTime(0, 'end')
        picker.$emit('pick', [_start, _end])
      }
    },
    {
      text: '最近一个月', // ok
      onClick (picker) {
        const _start = createTargetTime(-29, 'start')
        const _end = createTargetTime(0, 'end')
        picker.$emit('pick', [_start, _end])
      }
    },
    {
      text: '本月',
      onClick (picker) {
        const date = new Date()
        const y = date.getFullYear()
        const m = date.getMonth()
        const _firstDay = new Date(y, m, 1, 0, 0, 0, 0)
        const _lastDay = new Date(y, m + 1, 0, 23, 59, 59, 0)
        // console.log(_firstDay);
        // console.log(_lastDay);
        picker.$emit('pick', [_firstDay, _lastDay])
      }
    },
    {
      text: '上月',
      onClick (picker) {
        const date = new Date()
        const y = date.getFullYear()
        const m = date.getMonth()
        const _firstDay = new Date(y, m - 1, 1, 0, 0, 0, 0)
        const _lastDay = new Date(y, m, 0, 23, 59, 59, 0)
        // console.log(_firstDay);
        // console.log(_lastDay);
        picker.$emit('pick', [_firstDay, _lastDay])
      }
    }
  ]
}
/**
 * @description: 时间戳转换为 年月日天时分秒
 * @param {Number} day:想要哪一天  -2:前天 -1:昨天 0:今天 1:明天 2:后天 以此类推
 * @param {String} time:想要的时间节点  start:目标日期的00:00:00  end:目标日期的23:59:00
 */
export const createTargetTime = (day = 0, time = 'start') => {
  let timeStamp
  if (time === 'start') {
    timeStamp = +new Date(new Date().setHours(0, 0, 0, 0))
  } else if (time === 'end') {
    timeStamp = +new Date(new Date().setHours(23, 59, 59, 0))
  }
  return new Date(timeStamp + 86400000 * Number(day))
}
