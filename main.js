import ssr from "./src/ssr.js";
import { initialize } from "./src/utils.js";
import {
  getBody,
  basicRow,
  basicText,
  basicDetails,
  basicImageText,
} from "./components/basic_layout.js";

initialize();

// --- Main ---

const body = getBody();

const row1 = basicRow().appendTo(body);

const detail1 = basicDetails("Title").appendTo(row1);

basicImageText(
  "Title 2",
  "This is a texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext 2",
  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
).appendTo(detail1);
