const {
    override,
    disableEsLint,
    addWebpackModuleRule,
    addLessLoader,
    addWebpackResolve,
    addWebpackPlugin
} = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
    addWebpackPlugin(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    ),
    disableEsLint(),
    addLessLoader(),
    addWebpackModuleRule({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    }),
    addWebpackResolve({
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            assert: require.resolve("assert/"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer/"),
        }
    })
);
