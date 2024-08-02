// @ts-check

import { getRandomString } from "./utils.js";

/**
 * @type {{all:ssr[],group:Object,selected:{all:ssr[],group:Object}}} ssrList
 * @description list of ssr
 */
export let ssrList = {
  all: [],
  group: {},
  selected: {
    all: [],
    group: {},
  },
};

export default class ssr {
  /**
   * @param {HTMLElement} htmlElement
   */
  constructor(htmlElement) {
    this.htmlElement = htmlElement;

    /** Set id
     * @type {string} id
     * @description id of ssr
     * @default getRandomString(10)
     */
    this.id = getRandomString(10);
    this.htmlElement.id = this.id;

    /**
     * @type {boolean} checked
     */
    this.checked = false;

    this.groupList = [];

    /**
     * @type {function} checkCondition
     * @description return true if conditions are met
     * @default () => {return true;}
     */
    this.checkCondition = () => {
      return true;
    };

    /**
     * @type {function} whenRejected
     * @param {ssr} self
     * @description function to execute when rejected
     * @default (self) => {}
     */
    this.whenRejected = (self) => {};

    /**
     * @type {function} whenChecked
     * @param {ssr} self
     * @description function to execute when checked
     * @default (self) => {}
     */
    this.whenChecked = (self) => {
      self.htmlElement.classList.add("checked");
    };

    /**
     * @type {function} whenUnchecked
     * @param {ssr} self
     * @description function to execute when unchecked
     * @default (self) => {}
     */
    this.whenUnchecked = (self) => {
      self.htmlElement.classList.remove("checked");
    };

    this.htmlElement.addEventListener("click", (e) => {
      if (!this.checked) {
        this.doCheck();
      } else {
        this.doUncheck();
      }
    });

    // Add to ssrList
    ssrList.all.push(this);
  }

  /**
   * @description check if conditions are met and execute functions
   */
  doCheck() {
    if (!this.checkCondition()) {
      this.whenRejected(this);
      return;
    }

    this.checked = true;

    // Update ssrList
    ssrList.selected.all.push(this);
    for (let group of this.groupList) {
      if (!ssrList.selected.group[group]) {
        ssrList.selected.group[group] = [];
      }
      ssrList.selected.group[group].push(this);
    }

    this.whenChecked(this);
    updateHandler(this);

    return this;
  }

  doUncheck() {
    this.checked = false;

    // Update ssrList
    ssrList.selected.all = ssrList.selected.all.filter((item) => {
      return item !== this;
    });
    for (let group of this.groupList) {
      ssrList.selected.group[group] = ssrList.selected.group[group].filter(
        (/** @type {ssr} */ item) => {
          return item !== this;
        }
      );
    }

    this.whenUnchecked(this);
    updateHandler(this);

    return this;
  }

  // Cannot do update.
  // doForceCheck() {
  //   this.checked = true;
  //   this.whenChecked(self);
  // }

  /**
   * @param {function} condition
   * @description set condition to check
   * @default () => {return true;}
   * @example
   * ssr.setCheckCondition(() => {
   * return true;
   * });
   * @returns {ssr}
   */
  setCheckCondition(condition) {
    this.checkCondition = condition;
    return this;
  }

  /**
   * @param {function | ((self:ssr)=>{})} whenRejected
   * @description set function to execute when rejected
   * @default () => {} function
   * @example
   * ssr.setWhenRejected((self) => {
   * console.log(self);
   * });
   * @returns {ssr}
   */
  setWhenRejected(whenRejected) {
    this.whenRejected = whenRejected;
    return this;
  }

  /**
   * @param {function} whenChecked
   * @description set function to execute when checked
   * @default () => {}
   * @example
   * ssr.setWhenChecked((self) => {
   * console.log(self);
   * });
   * @returns {ssr}
   */
  setWhenChecked(whenChecked) {
    this.whenChecked = whenChecked;
    return this;
  }

  /**
   * @param {function} whenUnchecked
   * @description set function to execute when unchecked
   * @default () => {}
   * @example
   * ssr.setWhenUnchecked((self) => {
   * console.log(self);
   * });
   * @returns {ssr}
   */
  setWhenUnchecked(whenUnchecked) {
    this.whenUnchecked = whenUnchecked;
    return this;
  }

  /**
   * @param {string} group
   * @returns {ssr}
   */
  addGroup(group) {
    this.groupList.push(group);

    if (!ssrList.group[group]) {
      ssrList.group[group] = [];
    }
    ssrList.group[group].push(this);

    return this;
  }

  /**
   * @param {string} group
   * @returns {ssr}
   */
  removeGroup(group) {
    this.groupList = this.groupList.filter((/** @type {String} */ item) => {
      return item !== group;
    });

    ssrList.group[group] = ssrList.group[group].filter(
      (/** @type {ssr} */ item) => {
        return item !== this;
      }
    );

    return this;
  }

  /**
   *
   * @returns {boolean}
   */
  isChecked() {
    return this.checked;
  }

  /**
   * @param {HTMLElement} htmlElement
   */
  append(htmlElement) {
    this.htmlElement.appendChild(htmlElement);
    return this;
  }
}

let isUpdateHandlerSet = false;
/**
 *
 * @param {ssr} object
 */
function updateHandler(object) {
  if (isUpdateHandlerSet) {
    return;
  }
  isUpdateHandlerSet = true;

  // Check all ssr
  let notConfirmed = true;

  while (notConfirmed) {
    notConfirmed = false;

    for (let ssrObject of ssrList.all) {
      if (isChecked(ssrObject) && !isConditionMet(ssrObject)) {
        ssrObject.doUncheck();
        notConfirmed = true;
      }
    }
  }

  isUpdateHandlerSet = false;
}

/**
 * @param {ssr} object
 * @returns {boolean}
 */
function isChecked(object) {
  return object.checked;
}

/**
 * @param {ssr} object
 * @returns {boolean}
 */
function isConditionMet(object) {
  return object.checkCondition();
}

// 설계를 해 보자.
// 우선 selectable -> 기본으로 선택 가능하게.
// toggle 형식.
// 선택 시 이벤트에 선택 애니메이션 기본 추가.
// 포인트, 타켓에 대한 설정.

// 기본 포인트 선택지
// 그룹 포인트 선택지 ^위로 통합 + 태그 설정
// radio 포인트 선택지
