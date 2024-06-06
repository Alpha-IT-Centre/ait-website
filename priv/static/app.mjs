// build/dev/javascript/prelude.mjs
var CustomType = class {
  withFields(fields) {
    let properties = Object.keys(this).map(
      (label) => label in fields ? fields[label] : this[label]
    );
    return new this.constructor(...properties);
  }
};
var List = class {
  static fromArray(array3, tail) {
    let t = tail || new Empty();
    for (let i = array3.length - 1; i >= 0; --i) {
      t = new NonEmpty(array3[i], t);
    }
    return t;
  }
  [Symbol.iterator]() {
    return new ListIterator(this);
  }
  toArray() {
    return [...this];
  }
  // @internal
  atLeastLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return true;
      desired--;
    }
    return desired <= 0;
  }
  // @internal
  hasLength(desired) {
    for (let _ of this) {
      if (desired <= 0)
        return false;
      desired--;
    }
    return desired === 0;
  }
  countLength() {
    let length2 = 0;
    for (let _ of this)
      length2++;
    return length2;
  }
};
function toList(elements, tail) {
  return List.fromArray(elements, tail);
}
var ListIterator = class {
  #current;
  constructor(current) {
    this.#current = current;
  }
  next() {
    if (this.#current instanceof Empty) {
      return { done: true };
    } else {
      let { head, tail } = this.#current;
      this.#current = tail;
      return { value: head, done: false };
    }
  }
};
var Empty = class extends List {
};
var NonEmpty = class extends List {
  constructor(head, tail) {
    super();
    this.head = head;
    this.tail = tail;
  }
};
var Result = class _Result extends CustomType {
  // @internal
  static isResult(data) {
    return data instanceof _Result;
  }
};
var Ok = class extends Result {
  constructor(value) {
    super();
    this[0] = value;
  }
  // @internal
  isOk() {
    return true;
  }
};
var Error = class extends Result {
  constructor(detail) {
    super();
    this[0] = detail;
  }
  // @internal
  isOk() {
    return false;
  }
};
function isEqual(x2, y) {
  let values = [x2, y];
  while (values.length) {
    let a2 = values.pop();
    let b = values.pop();
    if (a2 === b)
      continue;
    if (!isObject(a2) || !isObject(b))
      return false;
    let unequal = !structurallyCompatibleObjects(a2, b) || unequalDates(a2, b) || unequalBuffers(a2, b) || unequalArrays(a2, b) || unequalMaps(a2, b) || unequalSets(a2, b) || unequalRegExps(a2, b);
    if (unequal)
      return false;
    const proto = Object.getPrototypeOf(a2);
    if (proto !== null && typeof proto.equals === "function") {
      try {
        if (a2.equals(b))
          continue;
        else
          return false;
      } catch {
      }
    }
    let [keys2, get2] = getters(a2);
    for (let k of keys2(a2)) {
      values.push(get2(a2, k), get2(b, k));
    }
  }
  return true;
}
function getters(object3) {
  if (object3 instanceof Map) {
    return [(x2) => x2.keys(), (x2, y) => x2.get(y)];
  } else {
    let extra = object3 instanceof globalThis.Error ? ["message"] : [];
    return [(x2) => [...extra, ...Object.keys(x2)], (x2, y) => x2[y]];
  }
}
function unequalDates(a2, b) {
  return a2 instanceof Date && (a2 > b || a2 < b);
}
function unequalBuffers(a2, b) {
  return a2.buffer instanceof ArrayBuffer && a2.BYTES_PER_ELEMENT && !(a2.byteLength === b.byteLength && a2.every((n, i) => n === b[i]));
}
function unequalArrays(a2, b) {
  return Array.isArray(a2) && a2.length !== b.length;
}
function unequalMaps(a2, b) {
  return a2 instanceof Map && a2.size !== b.size;
}
function unequalSets(a2, b) {
  return a2 instanceof Set && (a2.size != b.size || [...a2].some((e) => !b.has(e)));
}
function unequalRegExps(a2, b) {
  return a2 instanceof RegExp && (a2.source !== b.source || a2.flags !== b.flags);
}
function isObject(a2) {
  return typeof a2 === "object" && a2 !== null;
}
function structurallyCompatibleObjects(a2, b) {
  if (typeof a2 !== "object" && typeof b !== "object" && (!a2 || !b))
    return false;
  let nonstructural = [Promise, WeakSet, WeakMap, Function];
  if (nonstructural.some((c) => a2 instanceof c))
    return false;
  return a2.constructor === b.constructor;
}
function makeError(variant, module, line, fn, message, extra) {
  let error = new globalThis.Error(message);
  error.gleam_error = variant;
  error.module = module;
  error.line = line;
  error.fn = fn;
  for (let k in extra)
    error[k] = extra[k];
  return error;
}

// build/dev/javascript/gleam_stdlib/gleam/option.mjs
var Some = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var None = class extends CustomType {
};

// build/dev/javascript/gleam_stdlib/dict.mjs
var tempDataView = new DataView(new ArrayBuffer(8));
var SHIFT = 5;
var BUCKET_SIZE = Math.pow(2, SHIFT);
var MASK = BUCKET_SIZE - 1;
var MAX_INDEX_NODE = BUCKET_SIZE / 2;
var MIN_ARRAY_NODE = BUCKET_SIZE / 4;

// build/dev/javascript/gleam_stdlib/gleam_stdlib.mjs
function identity(x2) {
  return x2;
}

// build/dev/javascript/gleam_stdlib/gleam/dynamic.mjs
function from(a2) {
  return identity(a2);
}

// build/dev/javascript/gleam_stdlib/gleam/bool.mjs
function guard(requirement, consequence, alternative) {
  if (requirement) {
    return consequence;
  } else {
    return alternative();
  }
}

// build/dev/javascript/lustre/lustre/effect.mjs
var Effect = class extends CustomType {
  constructor(all) {
    super();
    this.all = all;
  }
};
function from2(effect) {
  return new Effect(toList([(dispatch, _) => {
    return effect(dispatch);
  }]));
}
function none() {
  return new Effect(toList([]));
}

// build/dev/javascript/lustre/lustre/internals/vdom.mjs
var Text = class extends CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
};
var Element = class extends CustomType {
  constructor(key, namespace2, tag, attrs, children, self_closing, void$) {
    super();
    this.key = key;
    this.namespace = namespace2;
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.self_closing = self_closing;
    this.void = void$;
  }
};
var Attribute = class extends CustomType {
  constructor(x0, x1, as_property) {
    super();
    this[0] = x0;
    this[1] = x1;
    this.as_property = as_property;
  }
};

// build/dev/javascript/lustre/lustre/attribute.mjs
function attribute(name, value) {
  return new Attribute(name, from(value), false);
}
function class$(name) {
  return attribute("class", name);
}
function href(uri) {
  return attribute("href", uri);
}

// build/dev/javascript/lustre/lustre/element.mjs
function element(tag, attrs, children) {
  if (tag === "area") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "base") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "br") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "col") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "embed") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "hr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "img") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "input") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "link") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "meta") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "param") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "source") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "track") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else if (tag === "wbr") {
    return new Element("", "", tag, attrs, toList([]), false, true);
  } else {
    return new Element("", "", tag, attrs, children, false, false);
  }
}
function namespaced(namespace2, tag, attrs, children) {
  return new Element("", namespace2, tag, attrs, children, false, false);
}
function text(content) {
  return new Text(content);
}

// build/dev/javascript/lustre/lustre/internals/runtime.mjs
var Debug = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Dispatch = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var Shutdown = class extends CustomType {
};
var ForceModel = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};

// build/dev/javascript/lustre/vdom.ffi.mjs
function morph(prev, next, dispatch, isComponent = false) {
  let out;
  let stack = [{ prev, next, parent: prev.parentNode }];
  while (stack.length) {
    let { prev: prev2, next: next2, parent } = stack.pop();
    if (next2.subtree !== void 0)
      next2 = next2.subtree();
    if (next2.content !== void 0) {
      if (!prev2) {
        const created = document.createTextNode(next2.content);
        parent.appendChild(created);
        out ??= created;
      } else if (prev2.nodeType === Node.TEXT_NODE) {
        if (prev2.textContent !== next2.content)
          prev2.textContent = next2.content;
        out ??= prev2;
      } else {
        const created = document.createTextNode(next2.content);
        parent.replaceChild(created, prev2);
        out ??= created;
      }
    } else if (next2.tag !== void 0) {
      const created = createElementNode({
        prev: prev2,
        next: next2,
        dispatch,
        stack,
        isComponent
      });
      if (!prev2) {
        parent.appendChild(created);
      } else if (prev2 !== created) {
        parent.replaceChild(created, prev2);
      }
      out ??= created;
    } else if (next2.elements !== void 0) {
      iterateElement(next2, (fragmentElement) => {
        stack.unshift({ prev: prev2, next: fragmentElement, parent });
        prev2 = prev2?.nextSibling;
      });
    } else if (next2.subtree !== void 0) {
      stack.push({ prev: prev2, next: next2, parent });
    }
  }
  return out;
}
function createElementNode({ prev, next, dispatch, stack }) {
  const namespace2 = next.namespace || "http://www.w3.org/1999/xhtml";
  const canMorph = prev && prev.nodeType === Node.ELEMENT_NODE && prev.localName === next.tag && prev.namespaceURI === (next.namespace || "http://www.w3.org/1999/xhtml");
  const el2 = canMorph ? prev : namespace2 ? document.createElementNS(namespace2, next.tag) : document.createElement(next.tag);
  let handlersForEl;
  if (!registeredHandlers.has(el2)) {
    const emptyHandlers = /* @__PURE__ */ new Map();
    registeredHandlers.set(el2, emptyHandlers);
    handlersForEl = emptyHandlers;
  } else {
    handlersForEl = registeredHandlers.get(el2);
  }
  const prevHandlers = canMorph ? new Set(handlersForEl.keys()) : null;
  const prevAttributes = canMorph ? new Set(Array.from(prev.attributes, (a2) => a2.name)) : null;
  let className = null;
  let style = null;
  let innerHTML = null;
  for (const attr of next.attrs) {
    const name = attr[0];
    const value = attr[1];
    if (attr.as_property) {
      if (el2[name] !== value)
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2);
      const callback = dispatch(value);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      if (canMorph)
        prevHandlers.delete(eventName);
    } else if (name.startsWith("data-lustre-on-")) {
      const eventName = name.slice(15);
      const callback = dispatch(lustreServerEventHandler);
      if (!handlersForEl.has(eventName)) {
        el2.addEventListener(eventName, lustreGenericEventHandler);
      }
      handlersForEl.set(eventName, callback);
      el2.setAttribute(name, value);
    } else if (name === "class") {
      className = className === null ? value : className + " " + value;
    } else if (name === "style") {
      style = style === null ? value : style + value;
    } else if (name === "dangerous-unescaped-html") {
      innerHTML = value;
    } else {
      if (typeof value === "string")
        el2.setAttribute(name, value);
      if (name === "value" || name === "selected")
        el2[name] = value;
      if (canMorph)
        prevAttributes.delete(name);
    }
  }
  if (className !== null) {
    el2.setAttribute("class", className);
    if (canMorph)
      prevAttributes.delete("class");
  }
  if (style !== null) {
    el2.setAttribute("style", style);
    if (canMorph)
      prevAttributes.delete("style");
  }
  if (canMorph) {
    for (const attr of prevAttributes) {
      el2.removeAttribute(attr);
    }
    for (const eventName of prevHandlers) {
      handlersForEl.delete(eventName);
      el2.removeEventListener(eventName, lustreGenericEventHandler);
    }
  }
  if (next.key !== void 0 && next.key !== "") {
    el2.setAttribute("data-lustre-key", next.key);
  } else if (innerHTML !== null) {
    el2.innerHTML = innerHTML;
    return el2;
  }
  let prevChild = el2.firstChild;
  let seenKeys = null;
  let keyedChildren = null;
  let incomingKeyedChildren = null;
  let firstChild = next.children[Symbol.iterator]().next().value;
  if (canMorph && firstChild !== void 0 && // Explicit checks are more verbose but truthy checks force a bunch of comparisons
  // we don't care about: it's never gonna be a number etc.
  firstChild.key !== void 0 && firstChild.key !== "") {
    seenKeys = /* @__PURE__ */ new Set();
    keyedChildren = getKeyedChildren(prev);
    incomingKeyedChildren = getKeyedChildren(next);
  }
  for (const child of next.children) {
    iterateElement(child, (currElement) => {
      if (currElement.key !== void 0 && seenKeys !== null) {
        prevChild = diffKeyedChild(
          prevChild,
          currElement,
          el2,
          stack,
          incomingKeyedChildren,
          keyedChildren,
          seenKeys
        );
      } else {
        stack.unshift({ prev: prevChild, next: currElement, parent: el2 });
        prevChild = prevChild?.nextSibling;
      }
    });
  }
  while (prevChild) {
    const next2 = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = next2;
  }
  return el2;
}
var registeredHandlers = /* @__PURE__ */ new WeakMap();
function lustreGenericEventHandler(event) {
  const target = event.currentTarget;
  if (!registeredHandlers.has(target)) {
    target.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  const handlersForEventTarget = registeredHandlers.get(target);
  if (!handlersForEventTarget.has(event.type)) {
    target.removeEventListener(event.type, lustreGenericEventHandler);
    return;
  }
  handlersForEventTarget.get(event.type)(event);
}
function lustreServerEventHandler(event) {
  const el2 = event.target;
  const tag = el2.getAttribute(`data-lustre-on-${event.type}`);
  const data = JSON.parse(el2.getAttribute("data-lustre-data") || "{}");
  const include = JSON.parse(el2.getAttribute("data-lustre-include") || "[]");
  switch (event.type) {
    case "input":
    case "change":
      include.push("target.value");
      break;
  }
  return {
    tag,
    data: include.reduce(
      (data2, property) => {
        const path2 = property.split(".");
        for (let i = 0, o = data2, e = event; i < path2.length; i++) {
          if (i === path2.length - 1) {
            o[path2[i]] = e[path2[i]];
          } else {
            o[path2[i]] ??= {};
            e = e[path2[i]];
            o = o[path2[i]];
          }
        }
        return data2;
      },
      { data }
    )
  };
}
function getKeyedChildren(el2) {
  const keyedChildren = /* @__PURE__ */ new Map();
  if (el2) {
    for (const child of el2.children) {
      iterateElement(child, (currElement) => {
        const key = currElement?.key || currElement?.getAttribute?.("data-lustre-key");
        if (key)
          keyedChildren.set(key, currElement);
      });
    }
  }
  return keyedChildren;
}
function diffKeyedChild(prevChild, child, el2, stack, incomingKeyedChildren, keyedChildren, seenKeys) {
  while (prevChild && !incomingKeyedChildren.has(prevChild.getAttribute("data-lustre-key"))) {
    const nextChild = prevChild.nextSibling;
    el2.removeChild(prevChild);
    prevChild = nextChild;
  }
  if (keyedChildren.size === 0) {
    iterateElement(child, (currChild) => {
      stack.unshift({ prev: prevChild, next: currChild, parent: el2 });
      prevChild = prevChild?.nextSibling;
    });
    return prevChild;
  }
  if (seenKeys.has(child.key)) {
    console.warn(`Duplicate key found in Lustre vnode: ${child.key}`);
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  seenKeys.add(child.key);
  const keyedChild = keyedChildren.get(child.key);
  if (!keyedChild && !prevChild) {
    stack.unshift({ prev: null, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild && prevChild !== null) {
    const placeholder = document.createTextNode("");
    el2.insertBefore(placeholder, prevChild);
    stack.unshift({ prev: placeholder, next: child, parent: el2 });
    return prevChild;
  }
  if (!keyedChild || keyedChild === prevChild) {
    stack.unshift({ prev: prevChild, next: child, parent: el2 });
    prevChild = prevChild?.nextSibling;
    return prevChild;
  }
  el2.insertBefore(keyedChild, prevChild);
  stack.unshift({ prev: keyedChild, next: child, parent: el2 });
  return prevChild;
}
function iterateElement(element2, processElement) {
  if (element2.elements !== void 0) {
    for (const currElement of element2.elements) {
      processElement(currElement);
    }
  } else {
    processElement(element2);
  }
}

// build/dev/javascript/lustre/client-runtime.ffi.mjs
var LustreClientApplication2 = class _LustreClientApplication {
  #root = null;
  #queue = [];
  #effects = [];
  #didUpdate = false;
  #isComponent = false;
  #model = null;
  #update = null;
  #view = null;
  static start(flags, selector, init3, update3, view2) {
    if (!is_browser())
      return new Error(new NotABrowser());
    const root2 = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    if (!root2)
      return new Error(new ElementNotFound(selector));
    const app = new _LustreClientApplication(init3(flags), update3, view2, root2);
    return new Ok((msg) => app.send(msg));
  }
  constructor([model, effects], update3, view2, root2 = document.body, isComponent = false) {
    this.#model = model;
    this.#update = update3;
    this.#view = view2;
    this.#root = root2;
    this.#effects = effects.all.toArray();
    this.#didUpdate = true;
    this.#isComponent = isComponent;
    window.requestAnimationFrame(() => this.#tick());
  }
  send(action) {
    switch (true) {
      case action instanceof Dispatch: {
        this.#queue.push(action[0]);
        this.#tick();
        return;
      }
      case action instanceof Shutdown: {
        this.#shutdown();
        return;
      }
      case action instanceof Debug: {
        this.#debug(action[0]);
        return;
      }
      default:
        return;
    }
  }
  emit(event, data) {
    this.#root.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        detail: data,
        composed: true
      })
    );
  }
  #tick() {
    this.#flush_queue();
    const vdom = this.#view(this.#model);
    const dispatch = (handler) => (e) => {
      const result = handler(e);
      if (result instanceof Ok) {
        this.send(new Dispatch(result[0]));
      }
    };
    this.#didUpdate = false;
    this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
  }
  #flush_queue(iterations = 0) {
    while (this.#queue.length) {
      const [next, effects] = this.#update(this.#model, this.#queue.shift());
      this.#didUpdate ||= !isEqual(this.#model, next);
      this.#model = next;
      this.#effects = this.#effects.concat(effects.all.toArray());
    }
    while (this.#effects.length) {
      this.#effects.shift()(
        (msg) => this.send(new Dispatch(msg)),
        (event, data) => this.emit(event, data)
      );
    }
    if (this.#queue.length) {
      if (iterations < 5) {
        this.#flush_queue(++iterations);
      } else {
        window.requestAnimationFrame(() => this.#tick());
      }
    }
  }
  #debug(action) {
    switch (true) {
      case action instanceof ForceModel: {
        const vdom = this.#view(action[0]);
        const dispatch = (handler) => (e) => {
          const result = handler(e);
          if (result instanceof Ok) {
            this.send(new Dispatch(result[0]));
          }
        };
        this.#queue = [];
        this.#effects = [];
        this.#didUpdate = false;
        this.#root = morph(this.#root, vdom, dispatch, this.#isComponent);
      }
    }
  }
  #shutdown() {
    this.#root.remove();
    this.#root = null;
    this.#model = null;
    this.#queue = [];
    this.#effects = [];
    this.#didUpdate = false;
    this.#update = () => {
    };
    this.#view = () => {
    };
  }
};
var start = (app, selector, flags) => LustreClientApplication2.start(
  flags,
  selector,
  app.init,
  app.update,
  app.view
);
var is_browser = () => window && window.document;

// build/dev/javascript/lustre/lustre.mjs
var App = class extends CustomType {
  constructor(init3, update3, view2, on_attribute_change) {
    super();
    this.init = init3;
    this.update = update3;
    this.view = view2;
    this.on_attribute_change = on_attribute_change;
  }
};
var ElementNotFound = class extends CustomType {
  constructor(selector) {
    super();
    this.selector = selector;
  }
};
var NotABrowser = class extends CustomType {
};
function application(init3, update3, view2) {
  return new App(init3, update3, view2, new None());
}
function start3(app, selector, flags) {
  return guard(
    !is_browser(),
    new Error(new NotABrowser()),
    () => {
      return start(app, selector, flags);
    }
  );
}

// build/dev/javascript/lustre/lustre/element/html.mjs
function div(attrs, children) {
  return element("div", attrs, children);
}
function li(attrs, children) {
  return element("li", attrs, children);
}
function ul(attrs, children) {
  return element("ul", attrs, children);
}
function a(attrs, children) {
  return element("a", attrs, children);
}
function span(attrs, children) {
  return element("span", attrs, children);
}
function svg(attrs, children) {
  return namespaced("http://www.w3.org/2000/svg", "svg", attrs, children);
}

// build/dev/javascript/app/app.ffi.mjs
function read_localstorage(key) {
  const value = window.localStorage.getItem(key);
  return value ? new Ok(value) : new Error(void 0);
}
function write_localstorage(key, value) {
  window.localStorage.setItem(key, value);
}

// build/dev/javascript/lustre/lustre/element/svg.mjs
var namespace = "http://www.w3.org/2000/svg";
function g(attrs, children) {
  return namespaced(namespace, "g", attrs, children);
}
function path(attrs) {
  return namespaced(namespace, "path", attrs, toList([]));
}
function clip_path(attrs, children) {
  return namespaced(namespace, "clipPath", attrs, children);
}

// build/dev/javascript/app/app/logos.mjs
function facebook(classes) {
  return svg(
    toList([
      class$(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg")
    ]),
    toList([
      path(
        toList([
          attribute(
            "d",
            "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
          )
        ])
      )
    ])
  );
}
function linkedin(classes) {
  return svg(
    toList([
      class$(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg")
    ]),
    toList([
      path(
        toList([
          attribute(
            "d",
            "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
          )
        ])
      )
    ])
  );
}
function x(classes) {
  return svg(
    toList([
      class$(classes),
      attribute("viewBox", "0 0 448 512"),
      attribute("xmlns", "http://www.w3.org/2000/svg")
    ]),
    toList([
      path(
        toList([
          attribute(
            "d",
            "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"
          )
        ])
      )
    ])
  );
}
function alpha_it_centre(classes) {
  return svg(
    toList([
      class$(classes),
      attribute("stroke-miterlimit", "2"),
      attribute("stroke-linejoin", "round"),
      attribute("clip-rule", "evenodd"),
      attribute("fill-rule", "evenodd"),
      attribute("xmlns", "http://www.w3.org/2000/svg"),
      attribute("viewBox", "0 0 1837 316")
    ]),
    toList([
      g(
        toList([attribute("transform", "translate(-362.729 -1184.57)")]),
        toList([
          path(
            toList([
              attribute("d", "M362.729 1184.57h1836.9v315.86h-1836.9z"),
              attribute("fill", "none")
            ])
          ),
          clip_path(
            toList([attribute("id", "a")]),
            toList([
              path(
                toList([
                  attribute("d", "M362.729 1184.57h1836.9v315.86h-1836.9z")
                ])
              )
            ])
          ),
          g(
            toList([attribute("clip-path", "url(#a)")]),
            toList([
              path(
                toList([
                  attribute(
                    "d",
                    "M570.638 1239.231c18.466-32.31 53.258-54.1 93.099-54.1 53.18 0 97.363 38.827 105.721 89.656a88.235 88.235 0 0115.357-1.34c48.463 0 87.808 39.343 87.808 87.807 0 1.134-.023 2.262-.064 3.382 19.496 13.495 32.273 36.018 32.273 61.499 0 40.411-32.145 73.379-72.242 74.7v.155H445.517v-.526c-46.017-4.377-82.063-43.184-82.063-90.34 0-44.928 32.72-82.275 75.605-89.49a89.887 89.887 0 01-.02-1.943c0-49.552 40.231-89.785 89.786-89.785 15.095 0 29.323 3.733 41.813 10.325zm182.826 136.83v-6.257c0-3.457-2.8-6.257-6.26-6.257h-109.52v-28.165h28.162c6.912 0 12.517-5.605 12.517-12.517v-37.55c0-6.911-5.605-12.516-12.517-12.516h-75.1c-6.913 0-12.519 5.605-12.519 12.517v37.549c0 6.912 5.606 12.517 12.518 12.517h28.161v28.165H509.387c-3.457 0-6.26 2.8-6.26 6.257v6.257a6.26 6.26 0 006.26 6.26h40.68v28.162h-21.905c-6.912 0-12.517 5.605-12.517 12.518v37.55c0 6.912 5.605 12.518 12.517 12.518h62.583c6.912 0 12.518-5.606 12.518-12.518V1423c0-6.913-5.606-12.518-12.518-12.518h-21.904v-28.161H687.75v28.16h-21.903c-6.913 0-12.518 5.606-12.518 12.519v37.55c0 6.912 5.605 12.518 12.518 12.518h62.585c6.91 0 12.515-5.606 12.515-12.518V1423c0-6.913-5.605-12.518-12.515-12.518h-21.906v-28.161h40.679c3.46 0 6.26-2.803 6.26-6.26zm-168.976 53.197v25.035H534.42v-25.035h50.068zm137.683 0v25.035h-50.068v-25.035h50.068zm-125.168-137.684h62.585v25.033h-62.585v-25.033z"
                  )
                ])
              ),
              path(
                toList([
                  attribute("fill-rule", "nonzero"),
                  attribute(
                    "d",
                    "M1042.482 1297.91l23.013 154.263h-40.955l-2.145-27.693h-14.432l-2.34 27.693h-41.54l20.477-154.263h57.922zm-21.257 99.267c-1.95-17.552-3.9-39.005-6.046-64.748-4.096 29.449-6.63 51.096-7.606 64.748h13.652zM1071.114 1297.91h39.59v154.263h-39.59zM1163.736 1325.798l-.78 11.117c3.51-4.486 7.216-7.801 11.506-10.141 4.096-2.146 8.581-3.316 13.457-3.316 5.85 0 11.116 1.755 15.407 4.876 4.485 3.12 7.02 6.826 8.19 11.116.976 4.096 1.56 11.311 1.56 21.258v53.24c0 11.507-.584 19.698-1.95 24.574-1.365 4.875-4.29 8.776-8.385 11.701-4.29 2.73-9.361 4.29-15.407 4.29-4.68 0-9.166-1.17-13.067-3.315-4.095-2.34-7.8-5.656-11.311-9.946v28.863h-38.42v-144.317h39.2zm10.921 36.86c0-7.996-.195-12.677-.78-14.237-.585-1.755-2.145-2.535-4.875-2.535-2.536 0-4.096.975-4.876 2.925-.78 1.755-1.17 6.436-1.17 13.847v52.266c0 7.606.39 12.481 1.17 14.237.78 1.95 2.535 2.925 5.07 2.925 2.341 0 3.901-.975 4.486-2.535.585-1.756.975-6.046.975-12.872v-54.021zM1264.181 1297.91v34.714c3.316-2.925 7.021-5.265 10.726-6.826 3.9-1.56 7.996-2.34 12.482-2.34 6.63 0 12.286 1.755 17.162 5.266 4.68 3.315 7.606 7.41 8.58 11.701 1.171 4.486 1.561 12.677 1.561 24.573v87.175h-38.42v-88.93c0-7.411-.39-12.092-1.17-14.237-.585-2.145-2.34-3.12-4.875-3.12-2.34 0-3.9 1.17-4.68 3.315-.78 2.145-1.366 6.436-1.366 12.872v90.1h-38.42V1297.91h38.42zM1362.26 1374.75h-36.078v-8.387c0-9.946 1.17-17.357 3.51-22.622 2.145-5.461 6.63-10.142 13.457-14.042 6.825-4.096 15.601-6.24 26.523-6.24 13.066 0 22.817 2.34 29.448 7.02 6.631 4.486 10.531 10.141 11.897 16.967 1.365 6.63 1.95 20.477 1.95 41.345v63.382h-37.445v-11.311c-2.34 4.485-5.265 7.996-8.97 10.141-3.706 2.34-8.192 3.51-13.262 3.51-6.826 0-13.067-1.95-18.527-5.655-5.656-3.9-8.581-12.092-8.581-24.963v-10.336c0-9.361 1.56-15.797 4.485-19.308 3.12-3.315 10.531-7.41 22.233-11.896 12.676-5.07 19.502-8.386 20.282-10.141.975-1.56 1.365-5.07 1.365-10.336 0-6.631-.585-10.922-1.56-13.067-.975-1.95-2.535-2.925-4.875-2.925-2.536 0-4.096.78-4.876 2.535-.585 1.755-.975 6.046-.975 13.067v13.261zm12.287 17.356c-6.24 4.486-9.75 8.191-10.726 11.312-.975 3.12-1.56 7.41-1.56 13.066 0 6.63.585 10.921 1.365 12.677.78 1.95 2.535 2.925 5.07 2.925 2.536 0 4.096-.78 4.681-2.34.78-1.366 1.17-5.266 1.17-11.702v-25.938zM1461.759 1297.91h40.174v154.263h-40.174zM1598.681 1297.91v31.009h-23.792v123.254h-40.175V1328.92h-23.598v-31.009h87.565zM1735.822 1365.193h-40.175v-26.913c0-7.801-.39-12.677-1.17-14.432-.975-1.95-2.73-2.925-5.656-2.925-3.315 0-5.46 1.17-6.24 3.51-.976 2.34-1.366 7.411-1.366 15.212v71.573c0 7.411.39 12.482 1.365 14.627.78 2.34 2.73 3.51 5.851 3.51 3.12 0 5.07-1.17 5.85-3.51.976-2.34 1.366-7.606 1.366-16.187v-19.307h40.175v6.046c0 15.992-1.17 27.303-3.316 33.934-2.34 6.63-7.216 12.481-15.017 17.552-7.8 5.07-17.162 7.606-28.473 7.606-11.701 0-21.452-2.146-29.058-6.436-7.606-4.29-12.677-10.141-15.212-17.747-2.34-7.411-3.706-18.722-3.706-33.934v-45.05c0-11.117.39-19.308 1.17-24.963.78-5.461 3.12-10.922 6.826-15.992 3.706-5.266 8.971-9.166 15.602-12.092 6.826-3.12 14.432-4.485 23.208-4.485 11.701 0 21.452 2.34 29.253 6.826 7.606 4.485 12.677 10.336 15.017 17.162 2.535 6.63 3.706 17.357 3.706 31.788v14.627zM1836.203 1391.131h-49.731v27.498c0 5.656.39 9.361 1.17 10.922.78 1.755 2.34 2.535 4.68 2.535 2.926 0 4.876-1.17 5.851-3.315.975-2.146 1.56-6.436 1.56-12.677v-16.772h36.47v9.361c0 7.801-.586 13.847-1.56 18.137-.976 4.096-3.121 8.581-6.826 13.262-3.706 4.875-8.191 8.386-13.847 10.726-5.46 2.535-12.482 3.706-20.868 3.706-7.995 0-15.211-1.17-21.452-3.51-6.24-2.341-11.116-5.657-14.627-9.752-3.315-4.096-5.85-8.581-7.02-13.457-1.366-4.875-2.146-12.091-2.146-21.452v-36.86c0-11.116 1.56-19.892 4.486-26.132 3.12-6.436 7.996-11.312 14.626-14.822 6.826-3.316 14.627-5.07 23.598-5.07 10.726 0 19.697 2.144 26.718 6.24 6.826 4.095 11.897 9.556 14.627 16.187 2.925 6.826 4.29 16.382 4.29 28.668v16.577zm-38.615-20.477v-9.166c0-6.631-.39-10.922-.975-12.677-.78-1.95-2.145-2.925-4.29-2.925-2.73 0-4.291.78-5.071 2.535-.585 1.56-.78 5.85-.78 13.067v9.166h11.116zM1887.928 1325.798l-.78 11.702c2.925-4.68 6.24-8.191 10.336-10.531s8.581-3.51 13.847-3.51c6.63 0 12.091 1.56 16.187 4.68 4.29 3.12 7.02 7.02 8.19 11.896 1.17 4.68 1.756 12.482 1.756 23.598v88.54h-38.42v-87.565c0-8.581-.195-14.042-.78-15.797-.585-1.95-2.145-2.925-4.875-2.925s-4.486 1.17-5.07 3.315c-.78 2.145-1.17 7.996-1.17 17.552v85.42h-38.42v-126.375h39.2zM1991.282 1309.027v19.892h10.336v19.892h-10.336v67.673c0 8.386.39 12.872 1.365 13.847.78.975 4.29 1.56 10.726 1.56v20.282h-15.602c-8.776 0-15.016-.39-18.722-1.17-3.705-.585-7.02-2.34-9.946-4.875-2.925-2.73-4.68-5.656-5.266-9.167-.78-3.315-1.17-11.31-1.17-23.987v-64.163h-8.19v-19.892h8.19v-19.892h38.615zM2048.557 1325.798l-1.365 16.577c5.46-11.896 13.652-18.137 24.183-18.917v44.465c-7.02 0-12.286.976-15.407 2.926-3.315 1.95-5.46 4.485-6.24 7.996-.78 3.315-1.17 11.116-1.17 23.402v49.926h-38.42v-126.375h38.42zM2167.112 1391.131h-49.731v27.498c0 5.656.39 9.361 1.17 10.922.78 1.755 2.34 2.535 4.68 2.535 2.926 0 4.876-1.17 5.851-3.315.975-2.146 1.56-6.436 1.56-12.677v-16.772h36.47v9.361c0 7.801-.585 13.847-1.56 18.137-.976 4.096-3.12 8.581-6.826 13.262-3.706 4.875-8.191 8.386-13.847 10.726-5.46 2.535-12.481 3.706-20.867 3.706-7.996 0-15.212-1.17-21.453-3.51-6.24-2.341-11.116-5.657-14.627-9.752-3.315-4.096-5.85-8.581-7.02-13.457-1.366-4.875-2.146-12.091-2.146-21.452v-36.86c0-11.116 1.56-19.892 4.486-26.132 3.12-6.436 7.996-11.312 14.627-14.822 6.825-3.316 14.626-5.07 23.597-5.07 10.727 0 19.698 2.144 26.718 6.24 6.826 4.095 11.897 9.556 14.627 16.187 2.925 6.826 4.29 16.382 4.29 28.668v16.577zm-38.615-20.477v-9.166c0-6.631-.39-10.922-.975-12.677-.78-1.95-2.145-2.925-4.29-2.925-2.73 0-4.291.78-5.071 2.535-.585 1.56-.78 5.85-.78 13.067v9.166h11.116z"
                  )
                ])
              )
            ])
          )
        ])
      )
    ])
  );
}

// build/dev/javascript/app/app/types.mjs
var Model = class extends CustomType {
  constructor(message) {
    super();
    this.message = message;
  }
};
var UserUpdatedMessage = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};
var CacheUpdatedMessage = class extends CustomType {
  constructor(x0) {
    super();
    this[0] = x0;
  }
};

// build/dev/javascript/app/app/sections/info.mjs
function bus_support() {
  return div(
    toList([class$("bg-brand")]),
    toList([text("business support")])
  );
}
function hosting() {
  return div(
    toList([class$("bg-lighter")]),
    toList([text("hosting services")])
  );
}
function data_centre() {
  return div(
    toList([class$("bg-lighter")]),
    toList([text("data centre")])
  );
}
function domain_services() {
  return div(
    toList([class$("bg-lighter")]),
    toList([text("domain services")])
  );
}

// build/dev/javascript/app/app/sections.mjs
function socials() {
  return div(
    toList([
      class$(
        "text-light bg-dark p-1 flex mx-auto text-right space-x-2 justify-end px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl"
      )
    ]),
    toList([
      facebook("fill-current size-6 sm:size-8"),
      linkedin("fill-current size-6 sm:size-8"),
      x("fill-current size-6 sm:size-8")
    ])
  );
}
function header() {
  return div(
    toList([class$("bg-white py-4")]),
    toList([
      div(
        toList([
          class$(
            "mx-auto px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl flex justify-between items-center"
          )
        ]),
        toList([
          alpha_it_centre("text-brand fill-current h-16"),
          div(
            toList([class$("flex space-x-1 text-lg")]),
            toList([
              span(
                toList([class$("uppercase")]),
                toList([text("Call us today")])
              ),
              span(
                toList([class$("font-bold")]),
                toList([text("1300 20 55 73")])
              )
            ])
          )
        ])
      )
    ])
  );
}
function menu_item(name, link, classes) {
  return li(
    toList([class$("flex " + classes)]),
    toList([
      a(
        toList([
          href(link),
          class$(
            "uppercase py-4 px-2 hover:bg-brand-dark transition-all duration-500"
          )
        ]),
        toList([text(name)])
      )
    ])
  );
}
function menu() {
  return div(
    toList([class$("bg-brand")]),
    toList([
      div(
        toList([
          class$(
            "bg-brand font-normal text-white font-light tracking-tight mx-auto px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl"
          )
        ]),
        toList([
          ul(
            toList([class$("flex justify-between items-center")]),
            toList([
              menu_item("Home", "#", ""),
              menu_item("Telephone", "#", ""),
              menu_item("Business support", "#", ""),
              menu_item("Hosting services", "#", ""),
              menu_item("Domain services", "#", ""),
              menu_item("Datacentre services", "#", ""),
              menu_item("Contact us", "#", "")
            ])
          )
        ])
      )
    ])
  );
}
function carousel() {
  return div(toList([]), toList([text("carousel")]));
}
function contact_form() {
  return div(
    toList([class$("bg-darker")]),
    toList([text("contact form")])
  );
}
function info() {
  return div(
    toList([class$("bg-white grid gap-2 md:grid-cols-2 p-2")]),
    toList([
      bus_support(),
      domain_services(),
      hosting(),
      data_centre()
    ])
  );
}
function about_us() {
  return div(toList([class$("bg-darker")]), toList([text("about us")]));
}
function domain_search() {
  return div(
    toList([class$("bg-brand")]),
    toList([text("domain search")])
  );
}
function reviews() {
  return div(toList([class$("bg-white")]), toList([text("reviews")]));
}
function footer() {
  return div(toList([class$("bg-dark")]), toList([text("footer")]));
}
function copyright() {
  return div(toList([class$("bg-mid")]), toList([text("copyright")]));
}

// build/dev/javascript/app/app.mjs
function read_localstorage2(key) {
  return from2(
    (dispatch) => {
      let _pipe = read_localstorage(key);
      let _pipe$1 = new CacheUpdatedMessage(_pipe);
      return dispatch(_pipe$1);
    }
  );
}
function init2(_) {
  return [new Model(new None()), read_localstorage2("message")];
}
function write_localstorage2(key, value) {
  return from2((_) => {
    return write_localstorage(key, value);
  });
}
function update2(model, msg) {
  if (msg instanceof UserUpdatedMessage) {
    let input = msg[0];
    return [new Model(new Some(input)), write_localstorage2("message", input)];
  } else if (msg instanceof CacheUpdatedMessage && msg[0].isOk()) {
    let message = msg[0][0];
    return [new Model(new Some(message)), none()];
  } else {
    return [model, none()];
  }
}
function view(_) {
  return div(
    toList([]),
    toList([
      socials(),
      header(),
      menu(),
      carousel(),
      contact_form(),
      info(),
      about_us(),
      domain_search(),
      reviews(),
      footer(),
      copyright()
    ])
  );
}
function main() {
  let app = application(init2, update2, view);
  let $ = start3(app, "#app", void 0);
  if (!$.isOk()) {
    throw makeError(
      "assignment_no_match",
      "app",
      13,
      "main",
      "Assignment pattern did not match",
      { value: $ }
    );
  }
  return $;
}

// build/.lustre/entry.mjs
main();
