import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		brotliSize: false,
		chunkSizeWarningLimit: 2000
	},
	plugins: [
		vue(),
		vueJsx()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@router': path.resolve(__dirname, 'src/router'),
			'@component': path.resolve(__dirname, 'src/components'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@utils': path.resolve(__dirname, 'src/utils')
		}
	},
	css: {},
	server: {
		proxy: {
			'/api/v1': {
				target: 'http://172.16.2.2:9033/',
				changeOrigin: true,
				rewrite: path =>
					path.replace('^/api/v1', 'http://172.16.2.2:9033/api/v1')
			}
		}
	}
});
