export default {
    build: {
        minify: false,
        terserOptions: false,

        rollupOptions: {
            input: {
                content: './Content.js',
            },
            output: {
                entryFileNames: 'Content.js',
            }
        },
    },
};