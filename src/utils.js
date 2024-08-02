const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * AL 1: Generate random string
 * @param {number} length
 * @returns {string}
 */
export function getRandomString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * AL 1: Import style from url
 * @param {string} url
 */
export function importStyle(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;

  document.head.appendChild(link);
}

/**
 * AL 1: Create element with tag and class
 * @param {string} tag
 * @param {string|string[]} class
 */
export function createElement(tag, classList) {
  if (!Array.isArray(classList)) classList = [classList];

  const element = document.createElement(tag);
  element.classList.add(...classList);

  return element;
}

/**
 * AL 1: Create a HTML element
 * @param {string} innerHTML
 */
export function createHTML(innerHTML) {
  const element = document.createElement("template");
  element.innerHTML = innerHTML;

  return element.content;
}

/**
 * AL 2: Create div with class
 * @param {string|string[]} class
 */
export function createDiv(classList) {
  return createElement("div", classList);
}

/**
 * AL 1: Initialize all custom functions
 * @returns {void}
 */
export function initialize() {
  applyAppendTo();
  applyAddClass();
}

function applyAppendTo() {
  const normalTargets = [HTMLElement, DocumentFragment, Document, Element];
  const collectionTarget = [NodeList, HTMLCollection];
  const otherTargets = [String, Number, Boolean];

  normalTargets.forEach((target) => {
    target.prototype.appendTo = function (element) {
      element.appendChild(this);

      return this;
    };
  });

  collectionTarget.forEach((collection) => {
    collection.prototype.appendTo = function (element) {
      this.forEach((node) => {
        node.appendTo(element);
      });

      return this;
    };
  });

  otherTargets.forEach((target) => {
    target.prototype.appendTo = function (element) {
      element.innerHTML += this;

      return this;
    };
  });
}

function applyAddClass() {
  const normalTargets = [HTMLElement, DocumentFragment, Document, Element];
  const collectionTarget = [NodeList, HTMLCollection];

  normalTargets.forEach((target) => {
    target.prototype.addClass = function (classList) {
      if (!Array.isArray(classList)) classList = [classList];
      this.classList.add(...classList);

      return this;
    };
  });

  collectionTarget.forEach((collection) => {
    collection.prototype.addClass = function (classList) {
      if (!Array.isArray(classList)) classList = [classList];

      this.forEach((node) => {
        node.classList.add(...classList);
      });

      return this;
    };
  });
}
