
var ruleCookieId = 199;//此数字随机写即可；


chrome.runtime.onInstalled.addListener(() => {
    // 默认不开启
    // updateRules()
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'setStatus11') {
    console.log('setStatus11 ....')
    console.log(request.data)
    console.log(request.encoding)
    sendResponse(1)
  }
  if (request.type === 'setStatus116') {
    console.log('setStatus116 ....')
    console.log(request.data)
    console.log(request.encoding)
    sendResponse(1)
  }
  if (request.type === 'setStatus112') {
    console.log('setStatus112 ....')
    console.log(request.value)
    console.log(request.data)
    sendResponse(1)
  }
  if (request.type === 'setStatus1134') {
    console.log('setStatus1134 ....')
    console.log(request.value)
    sendResponse(1)
  }
})



// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'setStatus112') {
//     console.log('setStatus11 ....')
//     console.log(request.data)
//     console.log(request.encoding)
//     sendResponse(1)
//   }
// })



