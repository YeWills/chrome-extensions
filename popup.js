function init(){
  const form = document.getElementById("control-row");
const source = document.getElementById("source");
const target = document.getElementById("target");
const messagenode = document.getElementById("message");
const openOrClose = document.getElementById("openOrClose");


openOrClose.addEventListener("click", handleopenOrClose);



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
    return;
  }
  if(messagenode.innerText === '插件已关闭'){

    handleFormSubmit()

  messagenode.innerText = '插件已开启'
  openOrClose.innerText = ' 关闭'
    return;
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  // clearMessage();
  function stringToUrl(url){
   return url.trim()
  }

  let sourceUrl = stringToUrl(source.value);
  let targetDomain = stringToUrl(target.value);
  
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