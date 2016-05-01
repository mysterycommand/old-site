import webpack from 'webpack';

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
                presets: [
                    'es2015',
                    'react',
                ],
            },
        }],
    },

    output: {
        filename: '[name].js',
        publicPath: '',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ],
};
