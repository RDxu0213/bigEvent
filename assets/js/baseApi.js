$.ajaxPrefilter(function(config){
    const form2Json=(source)=>{
        let target={}
        source.split('&').forEach((el)=>{
            let kv=el.split('=')
            target[kv[0]]=kv[1]
        })
        return JSON.stringify(target)
    }
    config.url='http://big-event-vue-api-t.itheima.net'+config.url
    config.contentType='application/json'
    config.data=form2Json(config.data)
})