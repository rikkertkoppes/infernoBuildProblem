"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var inferno_1 = require("inferno");
var inferno_component_1 = require("inferno-component");
console.log(inferno_component_1.default);
var MyComp = (function (_super) {
    __extends(MyComp, _super);
    function MyComp() {
        return _super.apply(this, arguments) || this;
    }
    MyComp.prototype.render = function () {
        return 'moo';
    };
    return MyComp;
}(inferno_component_1.default));
exports.MyComp = MyComp;
inferno_1.default.render('hello world', document.querySelector('#viewContainer'));
//# sourceMappingURL=main.js.map