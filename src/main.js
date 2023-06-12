import './style.css'

import {float, operation, pressNum, reset} from './calc/index.js'

const arrDigits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ',']
// Digits container
const digitsContainer = document.querySelector('.digits')
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
// D&D
export const components = document.querySelectorAll('.component')
export const zoneDrop = document.querySelector('[data-comp=\'drop\']')
const zoneDrag = document.querySelector('[data-comp=\'drag\']')
const textArea = document.querySelector('.text-wrapper')
export const droppedComponents = zoneDrop.children
// Switch
const selectorRunTime = document.querySelector('.selector[name="runtime"]')
const iconEye = selectorRunTime.children[0]
const selectorConstructor = document.querySelector(
  '.selector[name="constructor"]'
)
const iconSelector = selectorConstructor.children[0]

let dragComp = null
let bottomComp = null

/* Block switch ------------------------------------------------*/
{
  let runComponents
  let btns
  let display

  function handlerCalc(e) {
    const parentButton = e.target.parentElement.className
    // Digits
    if (parentButton.includes('digits')) {
      const value = e.target.value

      if (value === '.') float(display)
      else pressNum(value, display)

    }
    //  Operators
    if (
      parentButton.includes('operators') ||
      parentButton.includes('equally')
    ) {
      let operator = e.target.innerText
      operation(operator, display)
    }
  }

  // Event Runtime
  selectorRunTime.addEventListener('click', () => {
    runComponents = Array.from(droppedComponents)
    btns = zoneDrop.querySelectorAll('.btn')
    display = zoneDrop.querySelector('input')

    if (zoneDrop.children.length < 4) {
      return alert('Calculator is not built. Please drop all components')
    }
    selectorConstructor.classList.remove('selector--active')
    iconSelector.classList.remove('icon__selector--active')
    selectorRunTime.classList.add('selector--active')
    iconEye.classList.add('icon__eye--active')
    zoneDrag.classList.add('hidden')

    btns.forEach((btn) => btn.classList.add('btn--runtime'))
    runComponents.forEach((c) => {
      c.classList.remove('cursor--move')
      if (c.dataset.item === 'display') c.style.cursor = 'auto'
    })
    deleteAllAreaDropEvents(runComponents)
    zoneDrop.addEventListener('click', handlerCalc)
  })

  // Event Constructor

  selectorConstructor.addEventListener('click', () => {
    selectorRunTime.classList.remove('selector--active')
    iconEye.classList.remove('icon__eye--active')
    selectorConstructor.classList.add('selector--active')
    iconSelector.classList.add('icon__selector--active')
    zoneDrop.removeEventListener('click', handlerCalc)
    zoneDrag.classList.remove('hidden')

    btns.forEach((btn) => btn.classList.remove('btn--runtime'))
    addDnDEvents(runComponents)

    runComponents.forEach((c) => {
      c.addEventListener('dblclick', doubleClick)
      c.classList.add('cursor--move')
      if (c.dataset.item === 'display') {
        c.style.cursor = 'not-allowed'
        c.draggable = false
      }
    })
    reset(display)
  })
}
/*-------------------------------------------------------------*/

/* Functions DnD ==============================================*/

/*Events DnD*/
function addDnDEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute('draggable', 'true')
    c.addEventListener('dragstart', dragStart)
    c.addEventListener('dragend', dragEnd)
  })

  addAreaDropEvents('dragover', dragOver)
  addAreaDropEvents('dragenter', dragEnter)
  addAreaDropEvents('dragleave', dragLeave)
  addAreaDropEvents('drop', dragDrop)
}

function deleteAllAreaDropEvents(elements) {
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

export function addAreaDropEvents(event, fn) {
  zoneDrop.addEventListener(event, fn)
}

export function removeAreaDropEvents(event, fn) {
  zoneDrop.removeEventListener(event, fn)
}

// Drop Insert Comp
function insertAboveComp(mouseY) {
  const els = Array.from(droppedComponents)
  let closestComp = null
  let closestOffset = Number.NEGATIVE_INFINITY
  els.forEach((comp) => {
    const {top} = comp.getBoundingClientRect()
    const offset = mouseY - top

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset
      closestComp = comp
    }
  })
  return closestComp
}

//* Double Click*/
function doubleClick({target}) {
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
function dragStart({target}) {

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

//* Drag entered*/
function dragEnter(e) {
  e.preventDefault()
}

// FIX highlight
//* Drag over*/
function dragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.effectAllowed = 'move'

  textArea.style.background = '#F0F9FF'

  if (droppedComponents.length) {
    bottomComp = insertAboveComp(e.clientY)
    bottomComp?.classList.add('highlight-line-before')
  }
}

//* Drag left*/
function dragLeave() {
  textArea.style.background = '#FFF'
  if (droppedComponents.length) {
    bottomComp?.classList.remove('highlight-line-before')
  }
}

//* Drag dropped*/
function dragDrop(e) {
  if (droppedComponents.length) {
    bottomComp?.classList.remove('highlight-line-before')
  }

  if (!bottomComp) {
    this.appendChild(dragComp)
  } else {
    this.insertBefore(dragComp, bottomComp)
  }
}

//* Drag End*/
function dragEnd(e) {
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

/*===============================================================*/

if (!droppedComponents.length) addDnDEvents(components)
