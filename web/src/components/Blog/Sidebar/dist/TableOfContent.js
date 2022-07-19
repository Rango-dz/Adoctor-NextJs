"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
function useHeadings() {
    var _a = react_1["default"].useState([]), headings = _a[0], setHeadings = _a[1];
    react_1["default"].useEffect(function () {
        var elements = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"))
            .filter(function (element) { return element.id; })
            .map(function (element) {
            var _a;
            return ({
                id: element.id,
                text: (_a = element.textContent) !== null && _a !== void 0 ? _a : "",
                level: Number(element.tagName.substring(1))
            });
        });
        setHeadings(elements);
    }, []);
    return headings;
}
function getId(children) {
    return children
        .split(" ")
        .map(function (word) { return word.toLowerCase(); })
        .join("-");
}
function Heading(_a) {
    var children = _a.children, id = _a.id, Element = _a.as, props = __rest(_a, ["children", "id", "as"]);
    var theId = id !== null && id !== void 0 ? id : getId(children);
    return (react_1["default"].createElement(Element, __assign({ id: theId }, props), children));
}
function useScrollSpy(ids, options) {
    var _a = react_1["default"].useState(), activeId = _a[0], setActiveId = _a[1];
    var observer = react_1["default"].useRef();
    react_1["default"].useEffect(function () {
        var _a;
        var elements = ids.map(function (id) { return document.getElementById(id); });
        (_a = observer.current) === null || _a === void 0 ? void 0 : _a.disconnect();
        observer.current = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, options);
        elements.forEach(function (el) {
            var _a;
            if (el) {
                (_a = observer.current) === null || _a === void 0 ? void 0 : _a.observe(el);
            }
        });
        return function () { var _a; return (_a = observer.current) === null || _a === void 0 ? void 0 : _a.disconnect(); };
    }, [ids, options]);
    return activeId;
}
// Now, the function that renders it all
function TableOfContent() {
    var headings = useHeadings();
    var activeId = useScrollSpy(headings.map(function (_a) {
        var id = _a.id;
        return id;
    }), { rootMargin: "0% 0% -25% 0%" });
    return (react_1["default"].createElement("nav", { className: "toc" },
        react_1["default"].createElement("h2", null, "Table of content"),
        react_1["default"].createElement("ul", null, headings.map(function (heading) { return (react_1["default"].createElement("li", { key: heading.id },
            react_1["default"].createElement("a", { style: {
                    marginLeft: heading.level - 2 + "em",
                    fontWeight: activeId === heading.id ? "bold" : "normal"
                }, href: "#" + heading.id }, heading.text))); }))));
}
exports["default"] = TableOfContent;
