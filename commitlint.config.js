module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'always'],
    'subject-full-stop': [0, 'never'],
    'type-case': [0, 'always'],
    'header-max-length': [1, 'always', 120],
  },
};