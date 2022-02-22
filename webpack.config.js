const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
	entry: './app/app.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devServer: {
		open: true,
		host: 'localhost',
		setupMiddlewares: (middlewares, devServer) => {
			devServer.app.use('/', express.static(path.resolve(__dirname, 'public')));
			return middlewares;
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: 'public/index.html',
		}),
		new Dotenv({
			path: './.env', // Path to .env file (this is the default)
			safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
		}),
		new CopyPlugin({
			patterns: [{ from: path.join(process.cwd(), 'public/meta.json'), to: './' }],
		}),
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'babel-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@app': path.resolve(__dirname, './app/'),
			'@public': path.resolve(__dirname, './public/'),
		},
	},
	devServer: {
		historyApiFallback: true,
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';

		config.plugins.push(new MiniCssExtractPlugin());
	} else {
		config.mode = 'development';
	}
	return config;
};
