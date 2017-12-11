'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');
const path = require('path');

module.exports = {
	name: 'pr-pal',
	entry: 'kotlinApp',
	resolve: {
		modules: ['src', 'kotlin_build', 'node_modules'],
	},
	plugins: [
		new KotlinWebpackPlugin({
			src: __dirname + '/src',
			verbose: true,
			optimize: true,
			libraries: ['@jetbrains/kotlin-extensions'].map(pkg =>
				require.resolve(pkg)
			),
		}),
		new CopyWebpackPlugin([{ from: 'assets' }]),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, '../kotlin_build'),
				exclude: [
					/kotlin\.js$/, // Kotlin runtime doesn't have sourcemaps at the moment
				],
				use: ['source-map-loader'],
				enforce: 'pre',
			},
		],
	},
	output: {
		path: path.join(__dirname, 'build/'),
		filename: 'bundle.js',
	},
};
