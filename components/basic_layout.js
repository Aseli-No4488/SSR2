import {
  importStyle,
  createDiv,
  createHTML,
  getRandomString,
  createElement,
} from "../src/utils.js";

importStyle("components/basic_layout.css");

export const getBody = () => {
  return document.querySelector("body");
};

/**
 * AL 2: Create basic detail element
 * @param {string} summary_text
 */
export const basicDetails = (summary_text) => {
  return customDetails(basicText(summary_text, "")).addClass("basicDetails");
};

/**
 * AL 2: Create row and append right to the body
 * @param {HTMLElement} summaryChild
 * @returns {HTMLDivElement}
 */
export const customDetails = (summaryChild) => {
  const element = createElement("details", "customDetails");
  const summary = createElement("summary", "customDetails").appendTo(element);
  summaryChild.appendTo(summary);

  summary.addEventListener("click", (e) => {
    if (element.hasAttribute("open")) {
      element.classList.remove("open");
      summaryChild.classList.remove("selected");
    } else {
      element.classList.add("open");
      summaryChild.classList.add("selected");
    }
  });

  return element;
};

/**
 * AL 2: Create row and append right to the body
 * @returns {HTMLDivElement}
 */
export const basicRow = () => {
  const row = createDiv("row");
  getBody().appendChild(row);
  return row;
};

export const basicText = (title = "", text = "") => {
  const element = createDiv("basicText");

  createHTML(`<h3>${title}</h3><p>${text}</p>`).appendTo(element);

  return element;
};

export const basicImageText = (title = "", text = "", imageUrl = "") => {
  const element = createDiv("basicImageText");

  createHTML(
    `<img src="${imageUrl}" /><div><h3>${title}</h3><p>${text}</p></div>`
  ).appendTo(element);

  return element;
};
