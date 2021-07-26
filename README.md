## vite 创建项目
```js
    npm init vite@latest [project-name] --template [vue | react]
```

## 插件
```js
export default {
    transform(code, id){
        if(/vue&type=i18n/.test(id)){
            return `export default Comp => {Comp.i18n = ${code}}`
        }
        return
    }
}
```