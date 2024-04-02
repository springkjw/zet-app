module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx'],
        alias: {
          '@assets': './src/assets',
          '@routers': './src/routers',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@components': './src/components',
          '@models': './src/models',
          '@services': './src/services',
          '@stores': './src/stores',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
