module.exports = {
  plugins: [
    'sortAttrs',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(id|style|fill|stroke)',
      },
    },
  ],
}
