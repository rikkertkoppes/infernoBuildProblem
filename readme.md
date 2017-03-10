# Example of the Inferno rc.8 build problem

See <https://github.com/infernojs/inferno/issues/903#issuecomment-283954103>

[This is the ts source](https://github.com/rikkertkoppes/infernoBuildProblem/blob/master/src/main.ts):

    import Inferno from 'inferno';
    import Component from 'inferno-component';

    console.log(Component);

    export class MyComp extends Component<{},{}> {
        public render() {
            return 'moo';
        }
    }

    Inferno.render('hello world', document.querySelector('#viewContainer'));

Which compiles to [this](https://github.com/rikkertkoppes/infernoBuildProblem/blob/master/dist/main.js)

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

Note that `inferno-component` is required and the default member is logged and used in the class extention

This is all fine, and is as you would expect. However, when packed with webpack, which is taken from `dist/inferno-component.node.js`. Which is ok, as I don't want es6 code in browsers just yet.

However, the es5 build exports Component as the root export, which is not how it is expected to be.

You can see this in [js/packed.js](https://github.com/rikkertkoppes/infernoBuildProblem/blob/master/js/packed.js)

The UMD header is [here](https://github.com/rikkertkoppes/infernoBuildProblem/blob/master/js/packed.js#L2823-L2827)

    (function (global, factory) {
         true ? module.exports = factory(__webpack_require__(0)) :
        typeof define === 'function' && define.amd ? define(['inferno'], factory) :
        (global['inferno-component'] = factory(global.Inferno));
    }(this, (function (inferno) { 'use strict';

And the return statement is [this one](https://github.com/rikkertkoppes/infernoBuildProblem/blob/master/js/packed.js#L3130):

        .........
        }
        return NO_OP;
    };

    return Component;

    })));

This becomes a problem as you can see by opening the HTML file

Also note the logged statement, which shows undefined.