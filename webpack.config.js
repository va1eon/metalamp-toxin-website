const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const PATHS = {
  src: 'src', // директория с исходниками
  build: 'dist', // директория собранного проекта
  aliasImg() { return `${this.src}/img/` }, // директория с изображениями для алиаса
  aliasFonts() { return `${this.src}/fonts/` }, // директория с изображениями для алиаса
  aliasComponents() {return `${this.src}/components/`} // директория с компонентами
}

const PAGES_DIR = path.resolve(__dirname, `${PATHS.src}/pug/pages`); // директория с pug страницами
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug')); // массив страниц

const isDev = process.env.NODE_ENV === `development`;

const filename = ext => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

module.exports = {
  context: path.resolve(__dirname, PATHS.src),
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: `./js/${filename('.js')}`,
    path: path.resolve(__dirname, PATHS.build),
    clean: true,
    publicPath: ''
  },
  resolve: {
    alias: {
      $img: path.resolve(__dirname, PATHS.aliasImg()),
      $fonts: path.resolve(__dirname, PATHS.aliasFonts()),
      $components: path.resolve(__dirname, PATHS.aliasComponents()),
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, PATHS.build)
    },
    open: isDev,
    port: 3030,
  },
  devtool: isDev ? 'source-map' : false,
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: page.replace(/\.pug/, '.html')
    })),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('.css')}`,
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.jpe?g/,
        options: {
          quality: 75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          pretty: isDev
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          `css-loader`,
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: `img/${filename('[ext]')}`
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `fonts/${filename('[ext]')}`
        }
      }
    ]
  }
}