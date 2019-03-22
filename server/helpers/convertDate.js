function convertDate(date) {
  let arr = []
  let str = date.split(' ')
  for (let i = 0; i < 3; i++) {
    arr.push(str[i])
  }
  return arr
}

module.exports = convertDate