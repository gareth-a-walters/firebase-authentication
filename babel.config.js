module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            context: './src/context',
            elements: './src/elements',
            entities: './src/entities',
            navigation: './src/navigation',
            screens: './src/screens',
            theme: './src/theme',
            utils: './src/utils',
          },
        },
      ],
    ],
  }
}
