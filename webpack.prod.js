const HtmlWebPackPuglin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin              = require('copy-webpack-plugin');
const MinifyPlugin            = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {

    mode: 'production', // production, development

    // Optimization es para minimizar el codigo css

    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contentHash].js'
    },

    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/, // Excepto este archivo
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/, // Para tener un archivo independiente y global
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
                
            },
            {
                test: /\.html$/, // Selecciona los documentos que termine en .html
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false // Para dejar todo el código html en una linea
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        
        // Cambia la direccion del index.html

        new HtmlWebPackPuglin({ 
            template: './src/index.html',
            filename: './index.html'
        }),

        // Cambia la direccion de styles.css

        new MiniCssExtractPlugin ({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),

        // Cambia la direccion de las imagenes 

        new CopyPlugin({
            patterns: [
              {
                from: "src/assets",
                to: "assets/",
              },
            ],
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]


}