import "./style.css";

const arrDigits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];
// Switch container
const switchContainer = document.querySelector(".switch");
// Digits container
const digitsContainer = document.querySelector(".digits");
// D&D
const components = document.querySelectorAll(".component");
const areaDrop = document.querySelector("[data-comp='drop']");
const areaDrag = document.querySelector("[data-comp='drag']");
const textArea = areaDrop.querySelector(".text-wrapper");

let dragComp = null;
let droppedComp = null;
let selectorName = "constructor";

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
  areaDrop.addEventListener(event, fn);
}
function removeAreaDropEvents(event, fn) {
  areaDrop.removeEventListener(event, fn);
}

/* render Digits */
arrDigits.map((item) => {
  const btnElement = document.createElement("button");
  btnElement.classList.add("btn");
  btnElement.textContent = item;
  digitsContainer.append(btnElement);
});

/* Event Switch */
switchContainer.addEventListener("click", ({ target }) => {
  const selectors = document.querySelectorAll(".selector");
  const iconEye = document.querySelector('.icon[name="eye"]');
  const iconSelector = document.querySelector('.icon[name="selector"]');
  const selectorActive = target.matches(".selector");
  const iconActive = target.matches(".icon");
  const btns = areaDrop.querySelectorAll(".btn");
  const runComponents = Array.from(areaDrop.children);

  if (iconActive || selectorActive) {
    selectorName = target.parentElement.name || target.name;

    if (selectorName === "runtime" && areaDrop.children.length < 5)
      return alert("Calculator is not built. Please drop all components");

    selectors.forEach((div) => {
      div.classList.remove("selector--active");
      if (selectorActive) target.classList.add("selector--active");
      if (iconActive) target.parentElement.classList.add("selector--active");
    });

    switch (selectorName) {
      case "runtime":
        iconEye.classList.remove("icon__eye");
        iconEye.classList.add("icon__eye--active");
        iconSelector.className = "icon icon__selector";
        areaDrag.classList.add("hidden");

        btns.forEach((btn) => btn.classList.add("btn--runtime"));
        runComponents.forEach((c) => {
          c.classList.remove("cursor--move");
          if (c.dataset.item === "display") c.style.cursor = "auto";
        });
        deleteAreaDropEvents(runComponents);
        break;
      case "constructor":
        iconSelector.classList.remove("icon__selector");
        iconSelector.classList.add("icon__selector--active");
        iconEye.className = "icon icon__eye";
        areaDrag.classList.remove("hidden");

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

  if (areaDrop.children.length === 1) textArea.classList.remove("hidden");
}

//* Drag start*/
function dragStart(e) {
  console.log("drag start");

  dragComp = this;

  if (e.target.parentElement.dataset.comp === "drag") {
    dragComp = e.target.cloneNode(true);
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
  const droppedComps = areaDrop.children;

  textArea.style.background = "#F0F9FF";

  if (droppedComps.length > 1) {
    droppedComps[droppedComps.length - 1].classList.add("highlight-line-after");
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
  areaDrop.children[areaDrop.children.length - 1].classList.remove(
    "highlight-line-after"
  );
}
/* Drag dropped*/
function dragDrop(e) {
  console.log("drag dropped");
  areaDrop.children[areaDrop.children.length - 1].classList.remove(
    "highlight-line-after"
  );
  droppedComp = dragComp;
  // if (areaDrop.children.length === 1)
  this.append(dragComp);
  console.log(e.target);
  /*  if(){
    this.before(dragComp)
  }else {

  }*/
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
if (selectorName === "constructor") addAreaDropEvents(components);

/* Calc Functions */
function calc(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}
