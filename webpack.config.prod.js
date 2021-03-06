const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const contentBase = __dirname + `/src`
const entryIndex = __dirname + `/src/index.js`
const htmlTemplete = __dirname + `/src/index.html`

const output = {
  module: true,
  path: __dirname + '/dist',
  filename: 'bundle.[hash:7].js',
  chunkFilename: 'chunks/[name].[hash:7].js',
}

const resolve = {
  extensions: ['.vue', '.less', '.css', '.js', '.jsx', '.ts'], // 忽略文件后缀
  modules: ['node_modules'], // 指定包的目录
  alias: {
    '@': contentBase // 文件目录缩写
  }
}

const webpackModule = {
  rules: [{
      test: /\.js[x]?$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:7].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:7].[ext]'
        }
      }]
    },
    {
      test: /\.(html)$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    },
  ]
}

const plugins = [
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: htmlTemplete
  })
]

const optimization = {
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
}

module.exports = {
  target: ['web', 'es2017'],
  mode: 'production', // 打包模式 development || production
  entry: entryIndex, // 入口文件
  output, // 打包输出文件目录
  experiments: {
    outputModule: true,
  },
  resolve,
  module: webpackModule,
  plugins,
  optimization
}