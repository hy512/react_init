const path = require('path')

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, '../www'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // sourceMap: true,
                            localIdentName: "[local]___[hash:base64]",
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(t|m?j)sx?$/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'ts-loader' },

                ],
                exclude: [/node_modules/, /www/],
            }
        ]
    },
};