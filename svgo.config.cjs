module.exports = {
  plugins: [
    {
      name: 'removeAttrs',
      params: {
        attrs: '(id|style|fill|stroke)',
      },
    },
  ],
}
