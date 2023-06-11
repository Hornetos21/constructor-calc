import './style.css'

const arrDigits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ',']
// Switch container
const switchContainer = document.querySelector('.switch')
// Digits container
const digitsContainer = document.querySelector('.digits')
// D&D
const components = document.querySelectorAll('.component')
const zoneDrop = document.querySelector("[data-comp='drop']")
const zoneDrag = document.querySelector("[data-comp='drag']")
const textArea = document.querySelector('.text-wrapper')

const droppedComponents = zoneDrop.children
let dragComp = null
// test
let bottomComp = null

function insertAboveComp(mouseY) {
  const els = Array.from(droppedComponents)
  let closestComp = null
  let closestOffset = Number.NEGATIVE_INFINITY
  els.forEach((comp) => {
    const { top } = comp.getBoundingClientRect()
    const offset = mouseY - top

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset
      closestComp = comp
    }
  })
  return closestComp
}

/*Events*/
function addAreaDropEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute('draggable', 'true')
    c.addEventListener('dragstart', dragStart)
    c.addEventListener('dragend', dragEnd)
  })

  areaDropEvents('dragover', dragOver)
  areaDropEvents('dragenter', dragEnter)
  areaDropEvents('dragleave', dragLeave)
  areaDropEvents('drop', dragDrop)
}

function deleteAreaDropEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute('draggable', 'false')
    c.removeEventListener('dragstart', dragStart)
    c.removeEventListener('dragend', dragEnd)
    c.removeEventListener('dblclick', doubleClick)
  })

  removeAreaDropEvents('dragover', dragOver)
  removeAreaDropEvents('dragenter', dragEnter)
  removeAreaDropEvents('dragleave', dragLeave)
  removeAreaDropEvents('drop', dragDrop)
}

function areaDropEvents(event, fn) {
  zoneDrop.addEventListener(event, fn)
}

function removeAreaDropEvents(event, fn) {
  zoneDrop.removeEventListener(event, fn)
}

/* Render Digits */
arrDigits.map((digit) => {
  const btnElement = document.createElement('button')
  btnElement.classList.add('btn')
  btnElement.textContent = digit
  if (digit === ',') {
    btnElement.value = '.'
  } else {
    btnElement.value = digit
  }
  digitsContainer.append(btnElement)
})
// ---------------------------

const display = zoneDrop.querySelector('input')
let flag = false
let currents = 0
let previousOperator = ''
/* Functions Calc */

// * Press Number
function pressNum(Num) {
  if (flag) {
    display.value = Num
    flag = false
  } else {
    if (display.value === '0') display.value = Num
    else display.value += Num
  }
}
//  * Calc
function calc(current, readDisplay, operator) {
  console.log(readDisplay, operator)
  let res = current
  switch (operator) {
    case '+':
      console.log(res, 'IN +')
      res += parseFloat(readDisplay)
      console.log(res, 'OUT +')
      break
    case '-':
      res -= parseFloat(readDisplay)
      console.log(res, '-')
      break
    case '/':
      res /= parseFloat(readDisplay)
      console.log(res, '/')
      break
    case 'X':
      res *= parseFloat(readDisplay)
      console.log(res, 'X')
      break

    default:
      console.log(res, 'defaultIN')

      res = parseFloat(readDisplay)
      console.log(res, 'defaultOUT')
      break
  }
  return res
}
//  * Operation
function operation(symbol) {
  let readDisplay = display.value
  if (flag && previousOperator !== '=') {
    display.value = currents
  } else {
    flag = true
    // console.log(currents, readDisplay, previousOperator);
    currents = calc(currents, readDisplay, previousOperator)
    display.value = currents
    previousOperator = symbol
  }
  console.log('input: ', readDisplay)
  console.log('current: ', currents)
  console.log('flag: ', flag)
}
// * Float
function float() {
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
function reset() {
  display.value = '0'
  currents = 0
  previousOperator = ''
  flag = false
}
const btns = zoneDrop.querySelectorAll('.btn')
const runComponents = Array.from(zoneDrop.children)
/* Event Switch */
switchContainer.addEventListener(
  'click',
  ({ target }) => {
    const selectors = document.querySelectorAll('.selector')
    const iconEye = document.querySelector('.icon[name="eye"]')
    const iconSelector = document.querySelector('.icon[name="selector"]')
    const selectorActive = target.matches('.selector')
    const iconActive = target.matches('.icon')

    // let a = "";
    // let b = "";
    // let operator = "";
    // let isOperator = false;
    // let equally = false;

    /* Calc Function */
    // function calc(current, readDisplay, operator) {
    //   console.log(readDisplay, operator);
    //   let res = current;
    //   /*  switch (operator) {
    // 		case "+":
    // 			res = a + b;
    // 			break;
    // 		case "-":
    // 			res = a - b;
    // 			break;
    // 		case "*":
    // 			res = a * b;
    // 			break;
    // 		case "/":
    // 			if (!b) {
    // 				return (res = "Не определено");
    // 			}
    // 			res = a / b;

    // 			break;*/
    //   switch (operator) {
    //     case "+":
    //       console.log(res, "IN +");
    //       res += parseFloat(readDisplay);
    //       console.log(res, "OUT +");
    //       break;
    //     case "-":
    //       res -= parseFloat(readDisplay);
    //       console.log(res, "-");
    //       break;
    //     case "/":
    //       res /= parseFloat(readDisplay);
    //       console.log(res, "/");
    //       break;
    //     case "X":
    //       res *= parseFloat(readDisplay);
    //       console.log(res, "X");
    //       break;

    //     default:
    //       console.log(res, "defaultIN");

    //       res = parseFloat(readDisplay);
    //       console.log(res, "defaultOUT");
    //       break;
    //   }
    //   return res;
    // }

    function handlerCalc(e) {
      const parentButton = e.target.parentElement.className

      // Digits
      if (parentButton.includes('digits')) {
        const value = e.target.value
        // console.log("BTN", value);
        // Validation ----------------

        //float
        if (value === '.') float()
        else pressNum(value)
        console.log('Display: ', display.value)
        /*           if (
				(value === "0" && !a && !b) ||
				(value === "." && display.value.includes("."))
			)
				return;*/

        /*      if (value === "." && input.value === "0") {
				console.log('value === "." && input.value === "0"');
				a = "0";
				input.value = a;
			}*/
        // Если Второе число пустое и нет оператора
        /* if (!b && !operator) {
				console.log("CONDITION: ", "!b && !operator");
				a += value;
				display.value = a;
			} // Если кнопка 0 и равно в положении true
			else if (value === "0" && equally) {
				console.log("CONDITION: ", 'value === "0" && equally');
				b = "0";
				display.value = "0";
				equally = false;
			} //
			else if (b === "0" && value === "0") return;
			//
			else if (b === "0" && value !== "." && value !== "0") {
				b = value;
				display.value = b;
			} //
			else if (a && b && equally) {
				console.log("CONDITION: ", "a && b && equally");
				b = value;
				equally = false;
				display.value = b;
			} else if (b && isOperator) {
				a = b;
				b = "";
				isOperator = false;
			} else {
				console.log("else");
				b += value;
				display.value = b;
			}*/
      }
      //  Operators
      if (
        parentButton.includes('operators') ||
        parentButton.includes('equally')
      ) {
        let operator = e.target.innerText
        operation(operator)

        /*isOperator = true;
			flag = true;*/
      }
      //  Equally
      if (parentButton.includes('equally')) {
        // Одинаковое число без нажатия по второму числу
        /*if (!b && operator) {
				b = a;
				a = calc(parseFloat(a), parseFloat(b), operator);
			}

			if (b && operator) {
				a = calc(parseFloat(a), parseFloat(b), operator);
			}
			isOperator = false;
			equally = true;
			display.value = a;*/
      }

      // console.log("NUMBER A: ", a, "NUMBER B: ", b);
      // console.log("Flag: ", flag);
      console.log('Currents: ', currents)
      console.log('PreviousOperator: ', previousOperator)
      // console.log(
      //   `operator: (${operator})`,
      //   "isOperator: ",
      //   isOperator
      // );
      // console.log("Equally: ", equally);
    }

    if (iconActive || selectorActive) {
      const selectorName = target.parentElement.name || target.name

      if (selectorName === 'runtime' && zoneDrop.children.length < 4)
        return alert('Calculator is not built. Please drop all components')

      selectors.forEach((div) => {
        div.classList.remove('selector--active')
        if (selectorActive) target.classList.add('selector--active')
        if (iconActive) target.parentElement.classList.add('selector--active')
      })

      switch (selectorName) {
        case 'runtime':
          console.log('runtime')
          console.log('current: ', currents)
          console.log('flag: ', flag)

          iconEye.classList.remove('icon__eye')
          iconEye.classList.add('icon__eye--active')
          iconSelector.className = 'icon icon__selector'
          zoneDrag.classList.add('hidden')

          btns.forEach((btn) => btn.classList.add('btn--runtime'))
          runComponents.forEach((c) => {
            c.classList.remove('cursor--move')
            if (c.dataset.item === 'display') c.style.cursor = 'auto'
          })
          deleteAreaDropEvents(runComponents)

          // Calculator
          zoneDrop.addEventListener('click', (e) => handlerCalc(e))

          break
        case 'constructor':
          console.log('constructor')

          reset()
          zoneDrop.removeEventListener('click', (e) => handlerCalc(e))
          console.log('runtime')
          console.log('current: ', currents)
          console.log('flag: ', flag)

          iconSelector.classList.remove('icon__selector')
          iconSelector.classList.add('icon__selector--active')
          iconEye.className = 'icon icon__eye'
          zoneDrag.classList.remove('hidden')
          /*Reset Calc*/
          /* a = "";
        b = "";
        operator = "";
        equally = false;
        display.value = "0";*/
          /*-----------------*/
          btns.forEach((btn) => btn.classList.remove('btn--runtime'))
          addAreaDropEvents(runComponents)

          runComponents.forEach((c) => {
            c.addEventListener('dblclick', doubleClick)
            c.classList.add('cursor--move')
            if (c.dataset.item === 'display') {
              c.style.cursor = 'not-allowed'
              c.draggable = false
            }
          })
          break
      }
    }
    return
  },
  true
)

/* Double Click*/
function doubleClick({ target }) {
  const arr = Array.from(components)
  const shadowElement = arr.filter(
    (c) => c.dataset.item === target.dataset.item
  )

  target.remove()
  shadowElement[0].classList.add('shadow')
  shadowElement[0].classList.remove('opacity')
  shadowElement[0].classList.remove('cursor--auto')
  shadowElement[0].setAttribute('draggable', 'true')

  if (!zoneDrop.children.length) textArea.classList.remove('hidden')
}

//* Drag start*/
function dragStart({ target }) {
  console.log('drag start')

  dragComp = this

  if (target.parentElement.dataset.comp === 'drag') {
    dragComp = target.cloneNode(true)
    dragComp.classList.remove('shadow')

    dragComp.addEventListener('dragstart', dragStart)
    dragComp.addEventListener('dragend', dragStart)
    dragComp.addEventListener('dblclick', doubleClick)

    if (this.dataset.item === 'display') {
      dragComp.draggable = false
      dragComp.style.cursor = 'not-allowed'
    }
  }
}

/* Drag entered*/
function dragEnter(e) {
  e.preventDefault()
}

//FIX highlight
/* Drag over*/
function dragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.effectAllowed = 'move'

  textArea.style.background = '#F0F9FF'

  // Test
  if (droppedComponents.length) {
    bottomComp = insertAboveComp(e.clientY)
    bottomComp?.classList.add('highlight-line-before')
  }

  //----test

  if (droppedComponents.length) {
    // droppedComponents[droppedComponents.length - 1].classList.add(
    //   "highlight-line-after"
    // );
    /*if (e.target.matches(".component")) {
			e.target.classList.add("highlight-line-before");
			if (!e.target.matches(".component")) {
				droppedComps[droppedComps.length - 1].classList.remove(
					"highlight-line-before"
				);
			}
		}*/
  }
}

/* Drag left*/
function dragLeave() {
  console.log('drag left')
  textArea.style.background = '#FFF'
  if (droppedComponents.length) {
    bottomComp?.classList.remove('highlight-line-before')

    // droppedComponents[droppedComponents.length - 1].classList.remove(
    //   "highlight-line-after"
    // );
  }
}

/* Drag dropped*/
function dragDrop(e) {
  console.log('drag dropped')
  if (droppedComponents.length) {
    bottomComp?.classList.remove('highlight-line-before')
    // droppedComponents[droppedComponents.length - 1].classList.remove(
    //   "highlight-line-after"
    // );
  }

  /*Test*/
  if (!bottomComp) {
    this.appendChild(dragComp)
  } else {
    this.insertBefore(dragComp, bottomComp)
  }

  /*-----*/
}

/* Drag End*/
function dragEnd(e) {
  console.log('drag end')
  textArea.style.background = '#FFF'

  if (e.dataTransfer.dropEffect === 'none') return

  if (e.target.parentElement.dataset.comp === 'drag') {
    setTimeout(() => {
      this.classList.add('opacity')
      this.classList.remove('shadow')
      this.setAttribute('draggable', 'false')
      this.classList.add('cursor--auto')
    }, 0)
  }

  textArea.classList.add('hidden')
}

if (!droppedComponents.length) addAreaDropEvents(components)
