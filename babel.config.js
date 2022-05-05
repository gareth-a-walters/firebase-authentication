module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            context: './src/context',
            elements: './src/elements',
            navigation: './src/navigation',
            screens: './src/screens',
          },
        },
      ],
    ],
  }
}
