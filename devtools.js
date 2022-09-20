

chrome.devtools.panels.create('MyPanel', 'images/icon.png', 'panel/panel.html',function(panel){
    console.log(panel);
})

var backconnect = chrome.runtime.connect(({
  name:'devtools-page'
}))

chrome.devtools.network.onRequestFinished.addListener(function(request){
  request.getContent(function(content, encoding){
    if(request.request.url === 'https://www.baidu.com'){
      chrome.runtime.sendMessage({
        name:'panel',
        tabId: chrome.devtools.inspectedWindow.tabId,
        content:content
      })
    }
  })
})



