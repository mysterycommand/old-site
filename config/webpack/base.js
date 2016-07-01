import webpack from 'webpack';
import Text from 'extract-text-webpack-plugin';

export default {
    entry: {
        main: './source/main.js',
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015'],
            },
        }, {
            test: /\.s?css$/,
            exclude: /node_modules/,
            loader: Text.extract('style', 'css?root=.&sourceMap!sass?' + JSON.stringify({
                outputStyle: 'expanded',
                precision: 9,
                sourceComments: true,
                sourceMap: true,
            })),
        }],
    },

    output: {
        filename: '[name].js',
        publicPath: '',
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new Text('main.css'),
    ],
};
