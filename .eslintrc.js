module.exports = {
  extends: ['soybeanjs'],
  overrides: [
    {
      files: ['src/scripts/*.ts', 'scripts/*.ts'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ],
  rules: {
    'no-await-in-loop': 'off'
  }
};
