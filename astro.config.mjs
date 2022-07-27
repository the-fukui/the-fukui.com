import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [vue()],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @use 'src/styles/color' as *;
                    @use 'src/styles/font' as *;
                    @use 'src/styles/size' as *;`
                }
            }
        }
    }
});
