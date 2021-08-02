// const c = /\.md$/

function myPlugin(){
  const vfileid = "my-vfiles"

  return{
    name:'my-plugin',
    resolveId(id){
      if(id === vfileid){
        return vfileid
      }
    },

    load(id){
      if(id === vfileid){


        return `export const msg = "xilinglaoshi exp file "`
      }
    }

  }
}

export default myPlugin