import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            root: resolve(dirname, '..'),
            resolve: {
                alias: {
                    '@': resolve(dirname, '../src'),
                    '@super-table': resolve(dirname, '../src'),
                },
            },
        });
    },
};

export default config;
