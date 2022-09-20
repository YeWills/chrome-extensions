

chrome.devtools.network.onNavigated.addListener(function(uuu){
  chrome.runtime.sendMessage(
    {
        type: 'setStatus1134',
        value: uuu, 
    },
    (res) => {
      console.log('ok')
    }
);

});


chrome.devtools.network.onRequestFinished.addListener(function(request){
  request.getContent(function(content, encoding){
    console.log('----')
    var arr = ['validateCurrentSession', 'doJudgeSupplierUser', 'isSignIn', 'isExistByPhone'];
    var issame = arr.find(t=> request.request.url.includes(t))
    if(issame){
      chrome.runtime.sendMessage(
        {
            type: 'setStatus11',
            value: content, 
            data: content, 
            encoding: request.request, 
        },
        (res) => {
          console.log('ok')
        }
    );

      chrome.runtime.sendMessage({
        name:'panel',
        tabId: chrome.devtools.inspectedWindow.tabId,
        content:content
      })
    }
  })
});