
const path = require("path")

module.exports = {
    externals: {
        jquery: 'jQuery',
        layer: 'layer',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "..", "src"),
            "@page": path.resolve(__dirname, "..", "src/page"),
            "@style": path.resolve(__dirname, "..", "src/style"),
        }
    }
};