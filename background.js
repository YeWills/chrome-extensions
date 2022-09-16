
var ruleCookieId = 199;//此数字随机写即可；


chrome.runtime.onInstalled.addListener(() => {
    // 默认不开启
    // updateRules()
});



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




