let flag = false
let currentNum = 0
let previousOperator = ''

// * Press Number
function pressNum(Num, display) {
  if (flag) {
    display.value = Num
    flag = false
  } else {
    if (display.value === '0' || display.value === 'Не определено')
      display.value = Num
    else display.value += Num
  }

}

//  * Calc
function calc(current, readDisplay, operator) {
  let a = current
  let b = parseFloat(readDisplay)

  switch (operator) {
    case '+':
      a += b
      break
    case '-':
      a -= b
      break
    case '/':
      if (readDisplay === '0') return (a = 'Не определено')
      a /= b
      break
    case 'X':
      a *= b
      break
    default:
      a = b
      break
  }
  return a
}

//  * Operation
function operation(symbol, display) {
  let readDisplay = display.value
  if (flag && previousOperator !== '=') {
    display.value = currentNum
  } else {
    flag = true
    currentNum = calc(currentNum, readDisplay, previousOperator)
    if (
      currentNum.toString().includes('.') &&
      currentNum.toString().length > 5
    )
      currentNum = +currentNum.toFixed(3)

    previousOperator = symbol

    display.value = currentNum
  }

}

// * Float
function float(display) {
  let floatDisplay = display.value
  if (flag) {
    floatDisplay = '0.'
    flag = false
  } else {
    if (!floatDisplay.includes('.')) floatDisplay += '.'
  }
  display.value = floatDisplay
}

// * Reset
function reset(display) {
  display.value = '0'
  currentNum = 0
  previousOperator = ''
  flag = false
}

// * Handler Calc

export {calc,reset,float,pressNum,operation}