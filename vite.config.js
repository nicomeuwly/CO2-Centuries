import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig ({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                secondPage: resolve(__dirname, 'new-view.html')
            }
        }
    },
    publicDir: 'public',
    base: './'
})