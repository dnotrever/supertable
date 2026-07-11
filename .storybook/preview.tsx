import type { Preview } from '@storybook/react';
import '../src/styles/Table.scss';
import 'simplebar-react/dist/simplebar.min.css';
import './preview.css';

const preview: Preview = {
    parameters: {
        backgrounds: { disable: true },
        options: {
            storySort: {
                method: 'alphabetical',
                order: ['Components'],
            },
        },
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'padded',
    },
    decorators: [
        (Story, context) => {
            if (context.parameters.chromeless) return <Story />;

            return (
                <div
                    style={{
                        minHeight: 300,
                        background: 'var(--bg-2)',
                        borderRadius: 6,
                        border: '1px solid var(--border)',
                        padding: '32px 28px',
                        color: 'var(--fg-1)',
                        fontFamily: 'var(--font-sans)',
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
};

export default preview;
