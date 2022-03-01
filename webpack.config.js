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
		historyApiFallback: true,
		open: true,
		host: 'localhost',
		static: [
			{
				directory: path.join(__dirname, 'public'),
				publicPath: '/',
			},
			{
				directory: path.join(__dirname, 'app/translations'),
				publicPath: '/translations',
			},
			{
				directory: path.join(__dirname, 'app/assets'),
				publicPath: '/assets',
			},
		],
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
				test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
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
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';

		config.plugins.push(new MiniCssExtractPlugin());
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{ from: path.join(process.cwd(), 'app/translations'), to: 'translations' },
					{ from: path.join(process.cwd(), 'public/meta.json'), to: './' },
					{ from: path.join(process.cwd(), 'app/assets'), to: 'assets' },
				],
			}),
		);
	} else {
		config.mode = 'development';
		config.plugins.push(
			new CopyPlugin({
				patterns: [{ from: path.join(process.cwd(), 'public/meta.json'), to: './' }],
			}),
		);
	}
	return config;
};
