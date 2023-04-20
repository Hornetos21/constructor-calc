import "./style.css";

const arrDigits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];
// Switch container
const switchContainer = document.querySelector(".switch");
// Digits container
const digitsContainer = document.querySelector(".digits");
// D&D
const components = document.querySelectorAll(".component");
const zoneDrop = document.querySelector("[data-comp='drop']");
const zoneDrag = document.querySelector("[data-comp='drag']");
const textArea = document.querySelector(".text-wrapper");

const droppedComponents = zoneDrop.children;
let dragComp = null;
// test
let bottomComp = null;

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

/* Calc Function */
function calc(a, b, operator) {
  let res;
  switch (operator) {
    case "+":
      res = a + b;
      break;
    case "-":
      res = a - b;
      break;
    case "*":
      res = a * b;
      break;
    case "/":
      if (!b) {
        return (res = "Не определено");
      }
      res = a / b;

      break;
  }
  return res;
}

/*Events*/
function addAreaDropEvents(elements) {
  elements.forEach((c) => {
    c.setAttribute("draggable", "true");
    c.addEventListener("dragstart", dragStart);
    c.addEventListener("dragend", dragEnd);
  });

  areaDropEvents("dragover", dragOver);
  areaDropEvents("dragenter", dragEnter);
  areaDropEvents("dragleave", dragLeave);
  areaDropEvents("drop", dragDrop);
}

function deleteAreaDropEvents(elements) {
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

function areaDropEvents(event, fn) {
  zoneDrop.addEventListener(event, fn);
}

function removeAreaDropEvents(event, fn) {
  zoneDrop.removeEventListener(event, fn);
}

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

/* Event Switch */
switchContainer.addEventListener("click", ({ target }) => {
  const selectors = document.querySelectorAll(".selector");
  const iconEye = document.querySelector('.icon[name="eye"]');
  const iconSelector = document.querySelector('.icon[name="selector"]');
  const selectorActive = target.matches(".selector");
  const iconActive = target.matches(".icon");
  const btns = zoneDrop.querySelectorAll(".btn");
  const runComponents = Array.from(zoneDrop.children);

  const input = zoneDrop.querySelector("input");

  if (iconActive || selectorActive) {
    const selectorName = target.parentElement.name || target.name;

    if (selectorName === "runtime" && zoneDrop.children.length < 4)
      return alert("Calculator is not built. Please drop all components");

    selectors.forEach((div) => {
      div.classList.remove("selector--active");
      if (selectorActive) target.classList.add("selector--active");
      if (iconActive) target.parentElement.classList.add("selector--active");
    });

    let a = "";
    let b = "";
    let operator;
    let equally = false;

    switch (selectorName) {
      case "runtime":
        iconEye.classList.remove("icon__eye");
        iconEye.classList.add("icon__eye--active");
        iconSelector.className = "icon icon__selector";
        zoneDrag.classList.add("hidden");

        btns.forEach((btn) => btn.classList.add("btn--runtime"));
        runComponents.forEach((c) => {
          c.classList.remove("cursor--move");
          if (c.dataset.item === "display") c.style.cursor = "auto";
        });
        deleteAreaDropEvents(runComponents);

        // Calculator
        zoneDrop.addEventListener("click", (e) => {
          const parentButton = e.target.parentElement.className;

          // Digits
          if (parentButton.includes("digits")) {
            const value = e.target.value;
            // Validation ----------------
            if (
              (value === "0" && !a && !b) ||
              (value === "." && input.value.includes("."))
            )
              return;
            if (value === "." && input.value === "0") {
              a = "0";
              input.value = a;
            }
            if (!b && !operator) {
              a += value;
              input.value = a;
            } else if (value === "0" && equally) {
              console.log("Нуль");
              b = "";
              input.value = "0";
            } else if (a && b && equally) {
              b = value;
              equally = false;
              input.value = b;
            } else {
              b += value;
              input.value = b;
            }
          }
          //  Operators
          if (parentButton.includes("operators")) {
            operator = e.target.innerText;
          }
          //  Equally
          if (parentButton.includes("equally")) {
            console.log(e.target.innerText);
            /*if (!sum[1] && operator) {
							const res = calc(sum[0], sum[0], operator);
							input.value = res;
							equally = true;
						}
						if (sum.length === 2) {
							console.log(sum);

							const res = calc(sum[0], sum[1], operator);
							input.value = res;
							digits.length = 0;
							sum[0] = res;
							equally = true;
						}*/

            // Одинаковое число без нажатия по второму числу
            if (!b && operator) {
              b = a;
              a = calc(parseFloat(a), parseFloat(b), operator);
              // input.value = res;
              // digits.length = 0;
            }

            if (b && operator) {
              a = calc(parseFloat(a), parseFloat(b), operator);

              // digits.length = 0;
              // a = res;
            }
            equally = true;
            input.value = a;
          }

          console.log("Number A: ", a, "Number B: ", b);
          console.log("operator: ", operator);
          console.log("=", equally);
        });

        break;
      case "constructor":
        iconSelector.classList.remove("icon__selector");
        iconSelector.classList.add("icon__selector--active");
        iconEye.className = "icon icon__eye";
        zoneDrag.classList.remove("hidden");
        /*Reset Calc*/
        a = "";
        b = "";
        operator = "";
        equally = false;
        input.value = "0";
        /*-----------------*/
        btns.forEach((btn) => btn.classList.remove("btn--runtime"));
        addAreaDropEvents(runComponents);

        runComponents.forEach((c) => {
          c.addEventListener("dblclick", doubleClick);
          c.classList.add("cursor--move");
          if (c.dataset.item === "display") {
            c.style.cursor = "not-allowed";
            c.draggable = false;
          }
        });
        break;
    }
  }
});

/* Double Click*/
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

/* Drag entered*/
function dragEnter(e) {
  e.preventDefault();
}

//FIX highlight
/* Drag over*/
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

/* Drag left*/
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

/* Drag dropped*/
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

/* Drag End*/
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

if (!droppedComponents.length) addAreaDropEvents(components);
