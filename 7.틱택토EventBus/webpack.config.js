const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        app: path.join(__dirname, 'main.js'), //나중에 하나로 합쳐질 파일의 이름이 app(app.js) --> output 보면 됨
    },

    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
        }],
    },

    plugins: [
        new VueLoaderPlugin(),
    ],

    output: {
        filename: '[name].js', //app.js로 해도됨
        path: path.join(__dirname, 'dist'), // dist 이름은 임의로 해도 됨
        publicPath: '/dist',
    },
}