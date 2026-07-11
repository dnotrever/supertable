import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const superkitManagerTheme = create({
    base: 'dark',
    colorPrimary: '#ff4785',
    colorSecondary: '#029cfd',

    appBg: '#1c1f22',
    appContentBg: '#1f242c',
    appPreviewBg: '#0a0b0e',
    appBorderColor: '#30363d',
    appBorderRadius: 6,

    barBg: '#1c1f22',
    barTextColor: '#d7dde5',
    barHoverColor: '#ffffff',
    barSelectedColor: '#029cfd',

    textColor: '#f1f3f5',
    textInverseColor: '#ffffff',
    textMutedColor: '#8b95a1',

    buttonBg: '#20242a',
    buttonBorder: '#30363d',

    inputBg: '#1c1f22',
    inputBorder: '#30363d',
    inputTextColor: '#aab2bd',
    inputBorderRadius: 6,

    fontBase: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontCode: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

addons.setConfig({
    theme: superkitManagerTheme,
});

const style = document.createElement('style');
style.textContent = `
    [data-selected="true"],
    [aria-current="page"] {
        background: #029cfd !important;
        color: #ffffff !important;
    }

    [data-selected="true"] svg,
    [aria-current="page"] svg {
        color: #ffffff !important;
    }

    input[type="search"],
    input[placeholder="Find components"] {
        background: #1c1f22 !important;
        border-color: #30363d !important;
        color: #aab2bd !important;
    }
`;
document.head.appendChild(style);
