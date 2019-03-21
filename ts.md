```js
{
  "compilerOptions": {
    "noImplicitThis": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

`noImplicitThis` 默认false，当 this表达式的值为 any类型的时候，生成一个错误。