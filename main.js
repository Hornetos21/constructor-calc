import "./style.css";

const arrDigits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];
// Digits container
const digitsContainer = document.querySelector(".digits");
/* Render Digits */
arrDigits.map((digit) => {
  const btnElement = document.createElement("button");
  btnElement.classList.add("btn");
  btnElement.textContent = digit;
  if (digit === ",") {
    btnElement.value = ".";
  } else {
    btnElement.value = digit;
  }
  digitsContainer.append(btnElement);
});
// ---------------------------
// D&D
const components = document.querySelectorAll(".component");
const zoneDrop = document.querySelector("[data-comp='drop']");
const zoneDrag = document.querySelector("[data-comp='drag']");
const textArea = document.querySelector(".text-wrapper");
const droppedComponents = zoneDrop.children;
// Switch
const selectorRunTime = document.querySelector('.selector[name="runtime"]');
const iconEye = selectorRunTime.children[0];
const selectorConstructor = document.querySelector(
  '.selector[name="constructor"]'
);
const iconSelector = selectorConstructor.children[0];

let dragComp = null;
let bottomComp = null;

/*Events DnD*/
function addDnDEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute("draggable", "true");
    c.addEventListener("dragstart", dragStart);
    c.addEventListener("dragend", dragEnd);
  });

  addAreaDropEvents("dragover", dragOver);
  addAreaDropEvents("dragenter", dragEnter);
  addAreaDropEvents("dragleave", dragLeave);
  addAreaDropEvents("drop", dragDrop);
}

function deleteAllAreaDropEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute("draggable", "false");
    c.removeEventListener("dragstart", dragStart);
    c.removeEventListener("dragend", dragEnd);
    c.removeEventListener("dblclick", doubleClick);
  });

  removeAreaDropEvents("dragover", dragOver);
  removeAreaDropEvents("dragenter", dragEnter);
  removeAreaDropEvents("dragleave", dragLeave);
  removeAreaDropEvents("drop", dragDrop);
}

function addAreaDropEvents(event, fn) {
  zoneDrop.addEventListener(event, fn);
}

function removeAreaDropEvents(event, fn) {
  zoneDrop.removeEventListener(event, fn);
}
/* Block switch ------------------------------------------------*/
{
  let runComponents;
  let btns;
  let display;

  let flag = false;
  let currentNum = 0;
  let previousOperator = "";

  /* Functions Calc ---------------------------------*/

  // * Press Number
  function pressNum(Num) {
    if (flag) {
      display.value = Num;
      flag = false;
    } else {
      if (display.value === "0" || display.value === "Не определено")
        display.value = Num;
      else display.value += Num;
    }
    console.log("current: ", currentNum);
    console.log("flag: ", flag);
  }

  //  * Calc
  function calc(current, readDisplay, operator) {
    let a = current;
    let b = parseFloat(readDisplay);
    console.log(a, operator, b);
    switch (operator) {
      case "+":
        console.log(a, "IN +");
        a += b;
        console.log(a, "OUT +");
        break;
      case "-":
        a -= b;
        console.log(a, "-");
        break;
      case "/":
        if (readDisplay === "0") return (a = "Не определено");
        a /= b;
        console.log(a, "/");
        break;
      case "X":
        a *= b;
        console.log(a, "X");
        break;
      default:
        console.log(a, "defaultIN");
        a = b;
        console.log(a, "defaultOUT");
        break;
    }
    return a;
  }

  //  * Operation
  function operation(symbol) {
    let readDisplay = display.value;
    if (flag && previousOperator !== "=") {
      display.value = currentNum;
    } else {
      flag = true;
      currentNum = calc(currentNum, readDisplay, previousOperator);
      if (
        currentNum.toString().includes(".") &&
        currentNum.toString().length > 5
      )
        currentNum = +currentNum.toFixed(3);

      previousOperator = symbol;

      display.value = currentNum;
    }
    console.log("input: ", readDisplay);
    console.log("current: ", currentNum);
    console.log("flag: ", flag);
  }

  // * Float
  function float() {
    let floatDisplay = display.value;
    if (flag) {
      floatDisplay = "0.";
      flag = false;
    } else {
      if (!floatDisplay.includes(".")) floatDisplay += ".";
    }
    display.value = floatDisplay;
  }

  // * Reset
  function reset() {
    display.value = "0";
    currentNum = 0;
    previousOperator = "";
    flag = false;
  }

  // * Handler Calc
  function handlerCalc(e) {
    // e.stopImmediatePropagation()
    const parentButton = e.target.parentElement.className;
    // Digits
    if (parentButton.includes("digits")) {
      const value = e.target.value;

      if (value === ".") float();
      else pressNum(value);
      console.log("Display: ", display.value);
    }
    //  Operators
    if (
      parentButton.includes("operators") ||
      parentButton.includes("equally")
    ) {
      let operator = e.target.innerText;
      operation(operator);

      console.log("Currents: ", currentNum);
      console.log("PreviousOperator: ", previousOperator);
    }
  }

  /*---------------------------------------------------------Calc*/

  // Event Runtime
  selectorRunTime.addEventListener("click", () => {
    runComponents = Array.from(droppedComponents);
    btns = zoneDrop.querySelectorAll(".btn");
    display = zoneDrop.querySelector("input");

    if (zoneDrop.children.length < 4) {
      return alert("Calculator is not built. Please drop all components");
    }
    selectorConstructor.classList.remove("selector--active");
    iconSelector.classList.remove("icon__selector--active");
    selectorRunTime.classList.add("selector--active");
    iconEye.classList.add("icon__eye--active");
    zoneDrag.classList.add("hidden");

    btns.forEach((btn) => btn.classList.add("btn--runtime"));
    runComponents.forEach((c) => {
      c.classList.remove("cursor--move");
      if (c.dataset.item === "display") c.style.cursor = "auto";
    });
    deleteAllAreaDropEvents(runComponents);
    zoneDrop.addEventListener("click", handlerCalc);
  });

  // Event Constructor

  selectorConstructor.addEventListener("click", () => {
    selectorRunTime.classList.remove("selector--active");
    iconEye.classList.remove("icon__eye--active");
    selectorConstructor.classList.add("selector--active");
    iconSelector.classList.add("icon__selector--active");
    zoneDrop.removeEventListener("click", handlerCalc);
    zoneDrag.classList.remove("hidden");

    btns.forEach((btn) => btn.classList.remove("btn--runtime"));
    addDnDEvents(runComponents);

    runComponents.forEach((c) => {
      c.addEventListener("dblclick", doubleClick);
      c.classList.add("cursor--move");
      if (c.dataset.item === "display") {
        c.style.cursor = "not-allowed";
        c.draggable = false;
      }
    });
    reset();
  });
}
/*-------------------------------------------------------------*/

/* Functions DnD ==============================================*/

// Drop Insert Comp
function insertAboveComp(mouseY) {
  const els = Array.from(droppedComponents);
  let closestComp = null;
  let closestOffset = Number.NEGATIVE_INFINITY;
  els.forEach((comp) => {
    const { top } = comp.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestComp = comp;
    }
  });
  return closestComp;
}

//* Double Click*/
function doubleClick({ target }) {
  const arr = Array.from(components);
  const shadowElement = arr.filter(
    (c) => c.dataset.item === target.dataset.item
  );

  target.remove();
  shadowElement[0].classList.add("shadow");
  shadowElement[0].classList.remove("opacity");
  shadowElement[0].classList.remove("cursor--auto");
  shadowElement[0].setAttribute("draggable", "true");

  if (!zoneDrop.children.length) textArea.classList.remove("hidden");
}

//* Drag start*/
function dragStart({ target }) {
  console.log("drag start");

  dragComp = this;

  if (target.parentElement.dataset.comp === "drag") {
    dragComp = target.cloneNode(true);
    dragComp.classList.remove("shadow");

    dragComp.addEventListener("dragstart", dragStart);
    dragComp.addEventListener("dragend", dragStart);
    dragComp.addEventListener("dblclick", doubleClick);

    if (this.dataset.item === "display") {
      dragComp.draggable = false;
      dragComp.style.cursor = "not-allowed";
    }
  }
}

//* Drag entered*/
function dragEnter(e) {
  e.preventDefault();
}

// FIX highlight
//* Drag over*/
function dragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.effectAllowed = "move";

  textArea.style.background = "#F0F9FF";

  // Test
  if (droppedComponents.length) {
    bottomComp = insertAboveComp(e.clientY);
    bottomComp?.classList.add("highlight-line-before");
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

//* Drag left*/
function dragLeave() {
  console.log("drag left");
  textArea.style.background = "#FFF";
  if (droppedComponents.length) {
    bottomComp?.classList.remove("highlight-line-before");

    // droppedComponents[droppedComponents.length - 1].classList.remove(
    //   "highlight-line-after"
    // );
  }
}

//* Drag dropped*/
function dragDrop(e) {
  console.log("drag dropped");
  if (droppedComponents.length) {
    bottomComp?.classList.remove("highlight-line-before");
    // droppedComponents[droppedComponents.length - 1].classList.remove(
    //   "highlight-line-after"
    // );
  }

  /*Test*/
  if (!bottomComp) {
    this.appendChild(dragComp);
  } else {
    this.insertBefore(dragComp, bottomComp);
  }

  /*-----*/
}

//* Drag End*/
function dragEnd(e) {
  console.log("drag end");
  textArea.style.background = "#FFF";

  if (e.dataTransfer.dropEffect === "none") return;

  if (e.target.parentElement.dataset.comp === "drag") {
    setTimeout(() => {
      this.classList.add("opacity");
      this.classList.remove("shadow");
      this.setAttribute("draggable", "false");
      this.classList.add("cursor--auto");
    }, 0);
  }

  textArea.classList.add("hidden");
}
/*===============================================================*/

if (!droppedComponents.length) addDnDEvents(components);
