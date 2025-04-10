const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    dices: './src/javascripts/dices.js',
    swiper: './src/javascripts/swiper.js',
    dictionary: './src/dictionary/dictionary.js',
    jsBasic: './src/jsBasic/jsBasic.js',
    test: './src/tests/test1.js',
    filterCards: './src/javascripts/filterCards.js',
    searchVanilla: './src/javascripts/search-vanilla.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.png/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // Index
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index', 'dices']
    }),

    // Страницы разделов
    new HtmlWebpackPlugin({
      template: './src/articles.html',
      filename: './articles.html',
      chunks: ['index', 'swiper', 'filterCards']
    }),
    new HtmlWebpackPlugin({
      template: './src/boardgames.html',
      filename: './boardgames.html',
      chunks: ['index']
    }),

    // Страницы раздела статей / articles
    new HtmlWebpackPlugin({
      template: './src/articles/about-games.html',
      filename: './articles/about-games.html',
      chunks: ['index']
    }),

    // Страницы раздела об играх / boardgames
    new HtmlWebpackPlugin({
      template: './src/boardgames/gloomhaven.html',
      filename: './boardgames/gloomhaven.html',
      chunks: ['index']
    }),

    // Pages
    new HtmlWebpackPlugin({
      template: './src/pages/theory.html',
      filename: './pages/theory.html',
      chunks: ['index']
    }),

    // ADC Dictionary
    new HtmlWebpackPlugin({
      template: './src/dictionary/dictionary.html',
      filename: './dictionary/dictionary.html',
      chunks: ['dictionary']
    }),

    // Основы JS
    new HtmlWebpackPlugin({
      template: './src/jsBasic/jsBasic.html',
      filename: './jsBasic/jsBasic.html',
      chunks: ['jsBasic']
    }),

    //Тесты
    new HtmlWebpackPlugin({
      template: './src/tests/test1.html',
      filename: './tests/test1.html',
      chunks: ['index', 'test']
    }),

    //Поиск
    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: './search.html',
      chunks: ['index', 'searchVanilla']
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/3d'),
          to: path.resolve(__dirname, './dev_build/3d')
        },
        {
          from: path.resolve(__dirname, './src/3d'),
          to: path.resolve(__dirname, './docs/3d')
        }
      ]
    }),

    // Article
    // new HtmlWebpackPlugin({
    //   template: './src/articles/superorganisms/S_Popup.html',
    //   filename: './superorganisms/S_Popup.html'
    // }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/footer.html'),
        location: 'footerPart',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
