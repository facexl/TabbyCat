export default {
    preset: 'ts-jest',
    globals: {},
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\js$": "babel-jest"
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}