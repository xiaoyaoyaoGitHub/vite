const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')
const app = new Koa()

app.use(async (ctx) => {
    const { url, query } = ctx.request;
    if (url === '/') {
        ctx.type = 'text/html';
        const p = path.join(__dirname, '..', '/index.html');
        const htmls = fs.readFileSync(p, 'utf-8');
        ctx.body = htmls
    } else if (url.endsWith('.js')) {
        const jsPath = path.join(__dirname, '..', url);
        const jsContents = fs.readFileSync(jsPath, 'utf-8');
        ctx.type = 'text/javascript';
        ctx.body = replaceModelPath(jsContents)
    } else if (url.startsWith('/@modules/')) {
        const moduleName = url.replace('/@modules/', '');
        const modulePath = path.join(__dirname, '../../node_modules', moduleName);
        // 要加载的文件
        const moduleFile = require(modulePath + '/package.json').module;
        ctx.type = "text/javascript";
        ctx.body = replaceModelPath(fs.readFileSync(modulePath + '/' + moduleFile, 'utf-8'))
    } else if (url.endsWith('.css')) {
        // console.log('css');
        console.log(url);
        const style = fs.readFileSync(path.join('../', url.replace('/', '')), 'utf-8');
        const content = `
            const css = "${style.replace(/\n/g, '')}";
            let link = document.createElement('style');
            link.setAttribute('type','text/css');
            document.head.appendChild(link);
            link.innerHTML = css;
            // export default css
        `;
        ctx.type = 'application/javascript';
        ctx.body = content
    } else if (url.indexOf('vue')) {
        // console.log(url);
        const fileName = path.join(__dirname, '..', url.split('?')[0]);
        const vueContent = fs.readFileSync(fileName, 'utf-8');
        const compileContent = compilerSfc.parse(vueContent);
        // console.log(compileContent);
        if (!query.type) {
            let compilerScript = compileContent.descriptor.script.content;
            const scriptContent = compilerScript.replace('export default', 'const __script=')
            ctx.type = 'text/javascript';
            ctx.body = `
                ${replaceModelPath(scriptContent)}
                import '${url}?type=style'
                import { render as __render } from '${url}?type=template'
                __script.render = __render
                export default __script
            `
        } else { //template
            if (query.type === 'template') {
                const compilerTemplate = compileContent.descriptor.template.content;
                const render = compilerDom.compile(compilerTemplate, { mode: 'module' }).code;
                ctx.type = 'text/javascript';
                ctx.body = replaceModelPath(render)
            } else { //style
                // console.log(compileContent.descriptor.styles);
                const currentStyle = compileContent.descriptor.styles[0].content;
                console.log(currentStyle);
                // // console.log(styleElement);
                ctx.type = 'text/javascript';
                ctx.body = `
                    const css = "${currentStyle.replace(/\n/g, '')}";
                    let link = document.createElement('style');
                    link.setAttribute('type','text/css');
                    document.head.appendChild(link);
                    link.innerHTML = css;
                    // export default css
                `
            }

        }

    }
})


function replaceModelPath(content) {
    return content.replace(/ from ('|")(.*)(\1)/g, function (s0, s1, s2) {
        if (s2.match(/^(\/|..\/|.\/)/)) {
            return s0
        } else {
            return s0.replace(s2, `/@modules/${s2}`)
        }
    })
}

app.listen('3001', () => {
    console.log('koa server 3001');
})