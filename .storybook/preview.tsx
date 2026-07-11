import type { Preview } from '@storybook/react';
import '../src/styles/Table.scss';
import 'simplebar-react/dist/simplebar.min.css';

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
                        minHeight: '100vh',
                        background: '#f5f6f8',
                        color: '#1f2937',
                        fontFamily: 'Open Sans, Arial, sans-serif',
                        padding: 24,
                    }}
                >
                    <Story />
                </div>
            );
        },
    ],
};

export default preview;
