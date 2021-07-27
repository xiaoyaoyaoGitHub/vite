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
## vite-project / myvite 手写vite
- 过程
    - 先以 type=module 方式在html中引入入口文件
    - 解析如果文件中 import 引入的文件,并从node-module中查找
    - 使用@vue/compiler-sfc 解析.vue文件,分离template 和 javascript
    - 使用@vue/compiler-dom 将template 转换为render函数
    - 挂载到script上, 成功