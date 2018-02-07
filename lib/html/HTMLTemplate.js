const {
	RawSource
} = require("webpack-sources");

class HTMLModulesTemplatePlugin {
	constructor() {
		this.pluginName = "HTMLModulesTemplatePlugin";
	}

	apply(moduleTemplate) {
		const {
			content,
			hash
		} = moduleTemplate.hooks;

		content.tap(this.pluginName, (source, module, {
			chunk
		}) => {
			if(module.type && module.type.startsWith("html")) {
				const html = new RawSource(source);

				return html;
			} else {
				return source;
			}
		});

		hash.tap(this.pluginName, (hash) => {
			hash.update(this.pluginName);
			hash.update("1");
		});
	}
}

module.exports = HTMLModulesTemplatePlugin;
