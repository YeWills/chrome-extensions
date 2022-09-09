const form = document.getElementById("control-row");
const go = document.getElementById("go");
const set1 = document.getElementById("set1");
const input = document.getElementById("input");
const message = document.getElementById("message");

var sourcedomain = 'qiqiaoban.alibaba.com';
var targeturl = 'https://test-i0-superapiplus.carzone360.com';

// The async IIFE is necessary because Chrome <89 does not support top level await.
(async function initPopupWindow() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.url) {
    try {
      let url = new URL(tab.url);
      input.value = url.hostname;
    } catch {}
  }

  input.focus();
})();

form.addEventListener("submit", handleFormSubmit);
set1.addEventListener("click", setcookie);



// chrome.declarativeNetRequest.updateDynamicRules({
//   removeRuleIds: currentRules.map((item) => item.id), // remove current rules
//   addRules: [
//     {
//         id: 1,
//         action: {
//           type: 'modifyHeaders',
//           requestHeaders:[
//             {
//                 header: 'Cookie',
//                 value:'_uab_collina=165880078628408553695095;',
//                 // value:'553695095',
//                 operation: 'set',
//               }
//           ]
//         },
//         condition: {
//           resourceTypes: ["main_frame", "script"],
//           // requestMethods: 'rule.matchConfig.methods as any',
//           // regexFilter:undefined,
//           // urlFilter:undefined,
//         },
//       }
//   ],
// }, function(){
//   console.log('zhixing')
// });

async function setcookie(event) {
  event.preventDefault();

  const cookies = await chrome.cookies.getAll({ domain:sourcedomain });

  if (cookies.length === 0) {
    return "No cookies found";
  }

  let pending = cookies.map(startSetCookie);
  await Promise.all(pending);

  // cookiesDeleted = pending.length;

  
//   chrome.cookies.set({
//     "domain": ".google.com",
//     "url": "https://www.google.com",
//     "expirationDate": 1665220620.731968,
//     // "hostOnly": false,
//     // "httpOnly": false,
//     "name": "hz99999",
//     "path": "/",
//     "sameSite": "no_restriction",
//     "secure": true,
//     // "session": false,
//     // "storeId": "0",
//     "value": "huangzhi123456"
// });
  
}

async function handleFormSubmit(event) {
  event.preventDefault();

  clearMessage();

  let url = stringToUrl(input.value);
  if (!url) {
    setMessage("Invalid URL");
    return;
  }

  let message = await deleteDomainCookies(url.hostname);
  setMessage(message);
}

function stringToUrl(input) {
  // Start with treating the provided value as a URL
  try {
    return new URL(input);
  } catch {}
  // If that fails, try assuming the provided input is an HTTP host
  try {
    return new URL("http://" + input);
  } catch {}
  // If that fails ¯\_(ツ)_/¯
  return null;
}

async function deleteDomainCookies(domain) {
  let cookiesDeleted = 0;
  try {
    const cookies = await chrome.cookies.getAll({ domain });

    if (cookies.length === 0) {
      return "No cookies found";
    }

    let pending = cookies.map(deleteCookie);
    await Promise.all(pending);

    cookiesDeleted = pending.length;
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }

  return `Deleted ${cookiesDeleted} cookie(s).`;
}

function deleteCookie(cookie) {
  // Cookie deletion is largely modeled off of how deleting cookies works when using HTTP headers.
  // Specific flags on the cookie object like `secure` or `hostOnly` are not exposed for deletion
  // purposes. Instead, cookies are deleted by URL, name, and storeId. Unlike HTTP headers, though,
  // we don't have to delete cookies by setting Max-Age=0; we have a method for that ;)
  //
  // To remove cookies set with a Secure attribute, we must provide the correct protocol in the
  // details object's `url` property.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Secure
  const protocol = cookie.secure ? "https:" : "http:";

  // Note that the final URL may not be valid. The domain value for a standard cookie is prefixed
  // with a period (invalid) while cookies that are set to `cookie.hostOnly == true` do not have
  // this prefix (valid).
  // https://developer.chrome.com/docs/extensions/reference/cookies/#type-Cookie
  const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`;

  return chrome.cookies.remove({
    url: cookieUrl,
    name: cookie.name,
    storeId: cookie.storeId,
  });
}

function startSetCookie(cookie) {
  // Cookie deletion is largely modeled off of how deleting cookies works when using HTTP headers.
  // Specific flags on the cookie object like `secure` or `hostOnly` are not exposed for deletion
  // purposes. Instead, cookies are deleted by URL, name, and storeId. Unlike HTTP headers, though,
  // we don't have to delete cookies by setting Max-Age=0; we have a method for that ;)
  //
  // To remove cookies set with a Secure attribute, we must provide the correct protocol in the
  // details object's `url` property.
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Secure
  const protocol = cookie.secure ? "https:" : "http:";

  // Note that the final URL may not be valid. The domain value for a standard cookie is prefixed
  // with a period (invalid) while cookies that are set to `cookie.hostOnly == true` do not have
  // this prefix (valid).
  // https://developer.chrome.com/docs/extensions/reference/cookies/#type-Cookie
  const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`;


  const {hostOnly,session,storeId,domain,...more} = cookie;

  const cookie1 = {
    // // "domain": ".google.com",
    // "url": targeturl,
    // "expirationDate": cookies.expirationDate,
    // // "hostOnly": false,
    // // "httpOnly": false,
    // "name": cookies.expirationDate,
    // "path": "/",
    // "sameSite": "no_restriction",
    // "secure": true,
    // // "session": false,
    // // "storeId": "0",
    // "value": "huangzhi123456"
    ...more,
    url:targeturl,
    // hostOnly:undefined,
    // session:undefined,
    // storeId:undefined,
}

console.log(cookie1)

 return chrome.cookies.set(cookie1);

  // return chrome.cookies.remove({
  //   url: cookieUrl,
  //   name: cookie.name,
  //   storeId: cookie.storeId,
  // });
}

function setMessage(str) {
  message.textContent = str;
  message.hidden = false;
}

function clearMessage() {
  message.hidden = true;
  message.textContent = "";
}
