
var ruleCookieId = 199;//此数字随机写即可；

var sourceUrl = ''
// var sourceUrl = 'http://xn.magichznpm.com'

// var targetDomain = 'www.axihe.com'
var targetDomain = ''

// 关闭插件
function closeEvent(){
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [ruleCookieId], 
      }, function(){
        console.log('卸载cookie')
      });
}

function getdomain(url){
    // 例如'www.axihe.com' 请求地址转域名，需求去掉前面的 www ，然后加上 .
    return `.${url.split('.').slice(1).join('.')}`
}

async function getCookieValues(source){
    let cookies = await chrome.cookies.getAll(
        {url:source}
    )

    if(!cookies) return;

    // 需要加上原来的cookie
    const origincookies = await chrome.cookies.getAll(
        {domain: getdomain(targetDomain)}
    )
    if(origincookies?.length){
        cookies = [...cookies, ...origincookies]
    }

    // 类似 "name=KJRiG5DUI; girl=beautiful; "
   const cookieValue = cookies.map(({name, value})=>{
        return `${name}=${value};`
    }).join(' ');

    return cookieValue;
}


// 更新请求规则
async function updateRules(){

    // 如果没有sourceUrl  targetDomain值，就不用给请求头设置cookie
    if(!sourceUrl || !targetDomain) return;

    const cookieval = await getCookieValues(sourceUrl);

    // 如果没有cookieval值，说明不用给请求头设置cookie，那么清除原来的ruleid
    if(!cookieval) {
        closeEvent()
        return;
    }
   

    chrome.declarativeNetRequest.updateDynamicRules({
            // 更新前，先删除旧的id规则，否则报错重复id
        removeRuleIds: [ruleCookieId], 
        addRules: [
            {
                id: ruleCookieId,
                action: {
                type: 'modifyHeaders',
                requestHeaders:[
                    {
                        header: 'Cookie',
                        value: cookieval,
                        operation: 'set',
                    }
                ]
                },
                condition: {
                    domains:[targetDomain],
                },
            }
        ],
        }, function(){
           console.log('update cookie')
        });
    
    }


chrome.runtime.onInstalled.addListener(() => {
    // 默认不开启
    // updateRules()
});

chrome.cookies.onChanged.addListener(function({cause,cookie,removed}){
    console.log(cookie.domain)
    console.log(cause,cookie,removed)
    // 只更新与源地址有关的cookie
    if(sourceUrl.includes(cookie.domain)){
        updateRules()
    }
})




chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'updatecookie') {
        sourceUrl = request.sourceUrl
        targetDomain = request.targetDomain
        updateRules()
        // sendResponse 一定要调用，否则报错
        // https://blog.csdn.net/m0_37729058/article/details/89186257
        sendResponse('get msg')
      }
})



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'setStatus') {
        if(request.value ==='close'){
            closeEvent()
            sendResponse('close')
            return
        }
        updateRules();
        sendResponse('open')
       
      }
})




