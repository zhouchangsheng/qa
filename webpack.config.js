/**
 * Created by jerry on 2016/12/14.
 */
module.exports = {
    entry:"./src/js/index.js",
    output:{
        path:"./dist/",
        filename:"bundle.js"
    },
    devServer:{
        inline:true,
        contentBase:'./dist',
        port:333
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel',
                query:{
                    presets:['es2015','react'],
                }
            },{
                test:/\.css$/,
                loader:'style!css'
            }
        ]
    }
};