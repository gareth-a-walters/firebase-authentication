module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            navigation: './src/navigation',
            screens: './src/screens',
          },
        },
      ],
    ],
  }
}
