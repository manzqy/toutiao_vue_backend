export const dateform = (time, rule) => {
  rule = rule || '/'
  time = new Date(time)
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  return `${year}${rule}${month}${rule}${day}`
}
