

// var sourcedomain = 'qiqiaoban.alibaba.com';
// var targeturl = 'https://test-i0-superapiplus.carzone360.com';


// var dd = {
//   // "domain": ".google.com",
//   // "url": "https://www.google.com",
//   "url": targeturl,
//   "expirationDate": 1665220620.731968,
//   // "hostOnly": false,
//   // "httpOnly": false,
//   "name": "hz99999999999999999999999999",
//   "path": "/",
//   "sameSite": "no_restriction",
//   "secure": true,
//   // "session": false,
//   // "storeId": "0",
//   "value": "huangzhi123456------------------"
// }

// var dd1 = "cna=KJRiG5DUICYCAdy/ILj7qb6G; nczqiqiaoban_USER_COOKIE=5DC75EB95226ABCF4F4C56C0F6A3D213CFC0B938354C04A4472CA9A2497867329DD892023D0ED545986C9040EF428818A0270D1F1E0F820AAC371B0A2067896F89E3025FF171DF7433CD6A134804EA2C094512E4A711A6F49B5DF1B882AD3F9BD484A01EB4537E90FD07D7AE78971BE8CEFA55AD0402C9A46A5CECB15FBC3340935D34C17E7E818B6D18E2DC876AECD9F59D80D8BC529ACED043BD583436B5907B20162232D8B61A8F7BCC2024E2CD5F7FFF218A46953DE7E6D1FDF12AE264F5683AC938E38A8A59AADEB061B6F60B83B2D668E90C8FB41B84FB71CCC5D7D007F55FF595FF2D733FC689C8E43F276CE54C6B46634869AB5A5EFFA71E2C16E615218D5CC206A7C6E0382964B87A58FB87E5F458F74F4B79E17A2704E050D949E28057F4F92BC11518977F44399DF6B42A566124DC272DE1A9B06ABAB85EB4DB2FEA61E9EE9AB7F78E61047B954307B7FCC3AE2536697C89E519E0812E8405E69B; SSO_LANG_V2=ZH-CN; SSO_EMPID_HASH_V2=694e57978d9528d85e340ff7c5eb2900; xlly_s=1; ac-session-id=AC_1a3955f38a4b72bba81ddffc6f58c879; RM_acu_session=AC_1a3955f38a4b72bba81ddffc6f58c879; account=123yyy; %24RM_acu_session=AC_1a3955f38a4b72bba81ddffc6f58c879; nczqiqiaoban_SSO_TOKEN_V2=45C9BA134AB62F276F2C10B4020D156486D74CADB1634C8D12489F5740488C9AA4E1B41065DF326CA431B9E120D4B844B2E566F35CA3BCCC5577DE4CBC1324B0; tfstk=cWafBQYQbRUzi8OPdV1P3IiJMR01a3YjasMuGT-WEsrfW_NqesxW8vOlR5v-7fh5.; isg=BNDQjyMqh0puP1qJNGPtUQSloRgimbTjhDQILsqgWCv-BXOvcanQc3d02c3l1Wy7; l=eBxZU-W7L9GKs4COBO5Zlurza779rIdf1sPzaNbMiInca6w5OHEg1NCECE9H5dtjgtCUie-rxukDbdIGvn1RwxDDBm21RsF-eYQd."
// // var dd1 = "cnaRiG5Dn1RwxDDBm21RsF-eYQd."

// function getval(){
//   console.log(1111);
//   return dd1;
// }
// // 要加上自己的cookie
// function onaction(){

// chrome.declarativeNetRequest.updateDynamicRules({
//   removeRuleIds: [113], // remove current rules
//   addRules: [
//     {
//         id: 113,
//         // id: '1afadsfannvadsnvadv999adsnfalnfdd9afdas9fdas9fnd9av',
//         action: {
//           type: 'modifyHeaders',
//           requestHeaders:[
//             {
//                 header: 'Cookie',
//                 // value:'_uab_collina=165880078628408553695095;',
//                 // value: JSON.stringify(dd),
//                 value: getval(),
//                 // value:'553695095',
//                 operation: 'set',
//               }
//           ]
//         },
//         condition: {
//           resourceTypes: ["main_frame", "script", "xmlhttprequest", 'other'],
//           // requestMethods: 'rule.matchConfig.methods as any',
//           // regexFilter:undefined,
//           // urlFilter:undefined,
//         },
//       }
//   ],
// }, function(){
//   console.log('zhixing1')
// });


//   chrome.cookies.set(dd);
// }

// onaction()


//   chrome.cookies.onChanged.addListener(function(cause,cookie,removed){
//     // console.log(cause)
//     // console.log(cookie)
//     // console.log(removed)

//     onaction()
//     })

