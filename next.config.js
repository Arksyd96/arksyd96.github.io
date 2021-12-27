// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== "production";

module.exports = {
    exportPathMap: function () {
        return {
            "/": { page: "/" },
            "/blog": { page: "/blog" }
        };
    },
    //assetPrefix: '',
    assetPrefix: !debug ? "/" : "",
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Perform customizations to webpack config
        config.module.rules = config.module.rules.map((rule) => {
            if (rule.loader === "babel-loader") {
                rule.options.cacheDirectory = false;
            }
            return rule;
        });
        // Important: return the modified config
        return config;
    }
};
