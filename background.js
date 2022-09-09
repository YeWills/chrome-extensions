
var ruleCookieId = 199;//此数字随机写即可；

// var sourcedomain = 'https://www.baidu.com'
var sourcedomain = 'http://xn.magichznpm.com'

var targetdomains = 'www.axihe.com'
var targeturl = targetdomains



async function getCookieValues(source){
  const cookies = await chrome.cookies.getAll(
        // todo 等下试试，是 url 还是 domail 好，最好使用 url，因为要做到精确匹配 一个
        {url:source}
    )

    if(!cookies) return;

    console.log('-----', cookies)

    // 类似 "name=KJRiG5DUI; girl=beautiful; "
   const cookieValue = cookies.map(({name, value})=>{
        return `${name}=${value};`
    }).join(' ');

    console.log('-----', cookieValue)

    return cookieValue;
}


// 更新请求规则
async function updateRules(){

    if(!sourcedomain || !targeturl) return;

    const cookieval = await getCookieValues(sourcedomain);

    console.log('--////---', cookieval)

    if(!cookieval) {
        chrome.declarativeNetRequest.updateDynamicRules({
            // 更新前，先删除旧的id规则，否则报错重复id
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
                    // urlFilter: ["||a.example.com"],
                    // todo
                    // urlFilter: `|${targeturl}`,
                    // regexFilter: 'magichznpm',
                    domains:[targetdomains],
                    // urlFilter: 'xn.magichznpm.com',
                  resourceTypes: [ "xmlhttprequest"],
                //   resourceTypes: ["main_frame", "script", "xmlhttprequest", 'other'],
                //   resourceTypes: [ "xmlhttprequest"],
                // requestMethods: 'rule.matchConfig.methods as any',
                // regexFilter:undefined,
                // urlFilter:undefined,
                },
            }
        ],
        }, function(){
        console.log('zhixing1')
        });
    
    }



chrome.runtime.onInstalled.addListener(() => {
    updateRules()
});

chrome.cookies.onChanged.addListener(function(cause,cookie,removed){
    updateRules()
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'updatecookie') {
        const {sourcedomain, targeturl } = request;
        sourcedomain = sourcedomain
        targeturl = targeturl
        updateRules()
      }
})