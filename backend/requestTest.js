const axios = require('axios')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NzMwMTg0LCJleHAiOjE2MDY3MzM3ODR9.XnFBqxbygSVb0qlHRhaeCWaMJ0yBqeQ98N4UG1dNUAg'

const signIn = _=>{
    axios({
        url:'http://localhost:8000/v1/user/signIn',
        method:'post',
        headers:{
            Authorization:token
        },
        data:{
            password:'weizhegou888',
            name:'err',
            role:'admin'
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err.response.status,err.response.data)
    })
}

const loginIn = _=>{
    axios({
        url:'http://localhost:8000/v1/user/login',
        method:'post',
        data:{
            password:'123456',
            name:'xiaolang'
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
}

const findOne = _=>{
    axios({
        url:'http://localhost:8000/v1/user/info',
        method:'get',
        headers:{
            Authorization:token
        },
        params:{
            uid:1
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
}

const getErr = _=>{
    axios({
        url:'http://localhost:8000/v1/client/err/r',
        method:'get',
        headers:{
            Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA2NzMwMTI1LCJleHAiOjE2MDY3MzM3MjV9.pSqPdyOqCzERBHq_c8AuHuDkEdZDHEcg_HDKAtesd48'
        },
        params:{
            page:1,
            pageSize:5
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
}

const setError = _=>{
    axios({
        url:'http://localhost:8000/v1/client/err/c',
        method:'get',
        params:{
            jsonData:{"info":{"type":"vue catch","err":"Network Error","info":"created hook (Promise/async)"},"url":"https://wzgtestapi.repaishop.com/h5/index.html?uid=4763&referrer_uid=4763&version=1607935580#/goodsDetail?id=98550","environment":"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1 wechatdevtools/1.02.1910120 MicroMessenger/7.0.4 Language/zh_CN webview/16079355714683775 webdebugger port/23851","platform":"wechat","uid":4763}
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
}

// signIn()
// loginIn()
// findOne()
// getErr()
setError()