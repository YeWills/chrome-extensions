
var ruleCookieId = 199;//此数字随机写即可；

// var sourceUrl = 'https://www.baidu.com'
var sourceUrl = 'http://xn.magichznpm.com'

var targetDomain = 'www.axihe.com'



async function getCookieValues(source){
    const cookies = await chrome.cookies.getAll(
        {url:source}
    )

    if(!cookies) return;

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
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [ruleCookieId], 
        }, function(){
          console.log('卸载cookie')
        });
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
    updateRules()
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
        const {sourceUrl, targetDomain } = request;
        sourceUrl = sourceUrl
        targetDomain = targetDomain
        updateRules()
      }
})


// chrome.runtime.sendMessage(
//     {
//         type: 'cookieStatus',
//         cookieStatus,
//         superCookieList
//     },
//     (res) => {
//         if (res.success) {
//             this.setState({cookieStatus: res.cookieStatus, getStatus: true})
//         }
//     }
// );