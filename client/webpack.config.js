const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    //before deployment
    mode:'development',
    //during deployment
    // mode: 'production',
    entry: './src/index.js',
    output:{
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
    },
    devServer:{
        static:{
            directory: path.resolve(__dirname, '../public')
        },
        port: 3000,
        open: true,
        hot:true,
        compress:true,
        historyApiFallback:true,
        proxy: [
        {
            context: ['/api'],
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false
        }
        ]
    },
    
      // <- HERE
  performance: {
    hints: false
  },

    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader', 
                    options:{
                        presets:['@babel/preset-env']         
                        
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html',
        }),
      
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'admin.html',
            template: './src/admin.html',
        }),
          new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'about.html',
            template: './src/about.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'college.html',
            template: './src/college.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'newsDetails.html',
            template: './src/newsDetails.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'university.html',
            template: './src/university.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'collegeform.html',
            template: './src/collegeform.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'universityform.html',
            template: './src/universityform.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'achievements.html',
            template: './src/achievements.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'achievementForm.html',
            template: './src/achievementForm.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'education.html',
            template: './src/education.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'health.html',
            template: './src/health.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'rural-electrification.html',
            template: './src/rural-electrification.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'empowerment.html',
            template: './src/empowerment.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'employment.html',
            template: './src/employment.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'road-infrastructure.html',
            template: './src/road-infrastructure.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'water-supply.html',
            template: './src/water-supply.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'skill-acquisition.html',
            template: './src/skill-acquisition.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'festive-supply.html',
            template: './src/festive-supply.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'palliative.html',
            template: './src/palliative.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'human-capital-development.html',
            template: './src/human-capital-development.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'agriculture.html',
            template: './src/agriculture.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'bills-motion.html',
            template: './src/bills-motion.html',
        }),
      
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' }, // copies all images folder
      ],
    }),
    ]
};