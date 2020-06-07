// vue.config.js
module.exports = {
	chainWebpack: config => {
		config
		.plugin('html')
		.tap(args => {
			args[0].title = 'UCRISKO PolitiMap'
			return args
		})
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/scss/_variables.scss";`
			}
		}
	}
}
