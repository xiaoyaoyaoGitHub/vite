

export default function(){
    return {
        name:"my-example",
        resolveId(source){
            // console.log(source);
            // if(source === 'viturl-dom'){
            //     return source
            // }
            return null
        },
        load(id){
            console.log('load',id);
            return 'export default "this is virtual-dom"'
        }
    }
}