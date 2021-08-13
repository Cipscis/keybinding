import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);

const srcPath = path.resolve(__dirname, '../src');
const entryPath = './docs/assets/js/src';
const distPath = path.resolve(__dirname, '../docs/assets/js/dist');

const config = {
	mode: process.env.MODE,
	entry: `${entryPath}/main.js`,
	output: {
		path: distPath,
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'keybinding': `${srcPath}/keybinding.ts`,
			'KeyBind': `${srcPath}/KeyBind.ts`,
			'KeyPress': `${srcPath}/KeyPress.ts`,
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
			},
		],
	},
};

switch (process.env.MODE) {
	case 'development':
		config.optimization = {
			minimize: false,
		};
		config.devtool = 'eval-source-map';
		break;
	case 'production':
	default:
		config.devtool = 'source-map';
		break;
}

export default config;
