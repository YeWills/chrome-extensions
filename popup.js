function init(){
const source = document.getElementById("source");
const target = document.getElementById("target");
const messagenode = document.getElementById("message");
const openOrClose = document.getElementById("openOrClose");


openOrClose.addEventListener("click", handleopenOrClose);

function stringToUrl(url){
  return url.trim()
 }

const defaultvals ={
  defaultsource: 'https://test-xxxx-xxxxxxx.com',
  defaulttarget: 'upload.xxxxx.com',
  defaultmessagenode: '插件已关闭',
  defaultopenOrClose: '开启',
}


function handleopenOrClose(){
  if(messagenode.innerText === '插件已开启'){
   
    chrome.runtime.sendMessage(
      {
          type: 'setStatus',
          value: 'close', 
      },
      (res) => {
        console.log('ok')
      }
  );
  messagenode.innerText = '插件已关闭'
  openOrClose.innerText = ' 开启'
  onClose()
    return;
  }
  if(messagenode.innerText === '插件已关闭'){

    let sourceUrl = stringToUrl(source.value);
    let targetDomain = stringToUrl(target.value);
  
    if(!sourceUrl || !targetDomain) return;

    handleFormSubmit()

  messagenode.innerText = '插件已开启'
  openOrClose.innerText = ' 关闭'
    return;
  }
}

function initrender(){
  chrome.storage.local.get(['___sourceUrl___','___targetDomain___','___cookiemsg___','___cookiestatus___',], function(result) {
    console.log('Value currently is ' + result);
    console.log('Value currently is ' + result.___sourceUrl___);
    source.value=result.___sourceUrl___ || defaultvals.defaultsource
    target.value=result.___targetDomain___ || defaultvals.defaulttarget
    messagenode.innerText=result.___cookiemsg___ || defaultvals.defaultmessagenode
    openOrClose.innerText=result.___cookiestatus___ || defaultvals.defaultopenOrClose
  });
}
initrender()


function onOpen(sourceUrl, targetDomain){
  chrome.storage.local.set({___sourceUrl___: sourceUrl});
  chrome.storage.local.set({___targetDomain___: targetDomain});
  chrome.storage.local.set({___cookiemsg___: '插件已开启'});
  chrome.storage.local.set({___cookiestatus___: '关闭'});
}
function onClose(){
  chrome.storage.local.set({___cookiemsg___: '插件已关闭'});
  chrome.storage.local.set({___cookiestatus___: '开启'});
}

async function handleFormSubmit(event) {

  // clearMessage();
 

  let sourceUrl = stringToUrl(source.value);
  let targetDomain = stringToUrl(target.value);

  if(!sourceUrl || !targetDomain) return;

  onOpen(sourceUrl, targetDomain)
  
  chrome.runtime.sendMessage(
    {
        type: 'updatecookie',
        sourceUrl, 
        targetDomain
    },
    (res) => {
      console.log('ok')
    }
);
}

}


setTimeout(t=>{
  init()
  
},500)