/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("./Template");
const WebpackMissingModule = require("./dependencies/WebpackMissingModule");

module.exports = class RuntimeTemplate {
	constructor(outputOptions, requestShortener) {
		this.outputOptions = outputOptions || {};
		this.requestShortener = requestShortener;
	}

	moduleId({ module, request }) {
		if(!module) return WebpackMissingModule.module(request);
		const comment = this.outputOptions.pathinfo && request ?
			Template.toComment(this.requestShortener.shorten(request)) + " " :
			"";
		return `${comment}${JSON.stringify(module.id)}`;
	}

	moduleExports({ module, request }) {
		if(!module) return WebpackMissingModule.module(request);
		return `__webpack_require__(${this.moduleId({ module, request })})`;
	}
};
