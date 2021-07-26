## vite 创建项目
```js
    npm init vite@latest [project-name] --template [vue | react]
```
    - 修改别名
        vite.config.js
            resolve:{
                alias:{
                    "@":resolve(__dirname, 'src')
                }
            }
    - 配置代理
        vite.config.js
            server: {
                proxy: {
                "/api": {
                    target: "http://jsonplaceholder.typicode.com",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
                },
            }
    - css模块化
        ```js
            import classes from "@/css.module.css"
            <div :class="classes.logo"></div>
        ```
        ```js
            <style module>.logo {}</style>

            <div :class="$style.logo"></div>
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