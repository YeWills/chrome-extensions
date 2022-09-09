function init(){
  const form = document.getElementById("control-row");
const setbtn = document.getElementById("set");
const source = document.getElementById("source");
const target = document.getElementById("target");
const message = document.getElementById("message");


form.addEventListener("submit", handleFormSubmit);

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