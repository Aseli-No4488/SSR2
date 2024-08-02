import ssr from "../src/ssr.js";

export class select extends ssr {
  constructor() {
    const htmlElement = document.createElement("div");
    htmlElement.classList.add("select");

    super(htmlElement);
  }
}
