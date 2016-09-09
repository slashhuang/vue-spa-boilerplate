/**
 * Created by huangxiaogang on 16/8/3.
 * 工具函数
 */

var path =require('path');
var add_prefix = (obj,prefix)=>{
    var transObj = {};
    for(var key in obj){
        transObj[key] = prefix+obj[key];
    }
    return transObj;
};
var addResolve = (obj)=>{
    var transObj = {};
    for(var key in obj){
        transObj[key] = path.resolve(process.cwd(),obj[key])
    }
    return transObj;
};
module.exports={
    add_prefix:add_prefix,
    addResolve:addResolve
};