const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports ={ // This is an object

    //This is a property
    entry: "./src/index.js", // This used to specify which file webpack 
    //should start with to get the internal dependency graph created.

    output: {
        //specifying where the bundled file should be generated and what the name of the bundled file would be
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        // This plugin will use the specified file in our src folder. It’ll then use that as a template 
        //for our HTML file where all the bundled files will be automatically injected
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        // This is to specify what webpack should do for a specific type for file
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // similar function to gitignore but for browsers 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}