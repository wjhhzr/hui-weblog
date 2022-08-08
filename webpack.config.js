const path = require("path")
const src = path.resolve(__dirname, 'src');
const mode = process.env.mode
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: __dirname + "/dist",
        library :{
            type: "commonjs",
            export: "default"
        }
    },
    devtool: "source-map",
    mode: mode === "dev" ? "development" : "production",
    watch: mode === "dev",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            src: src,
        },
        roots: [__dirname, src],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    }
};