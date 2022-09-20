// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function Console() {}

Console.Type = {
  LOG: 'log',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  GROUP: 'group',
  GROUP_COLLAPSED: 'groupCollapsed',
  GROUP_END: 'groupEnd',
};

Console.addMessage = function (type, format, args) {
  chrome.extension.sendRequest({
    command: 'sendToConsole',
    tabId: chrome.devtools.tabId,
    args: escape(JSON.stringify(Array.prototype.slice.call(arguments, 0))),
  });
};

// Generate Console output methods, i.e. Console.log(), Console.debug() etc.
(function () {
  const console_types = Object.getOwnPropertyNames(Console.Type);
  for (let type = 0; type < console_types.length; ++type) {
    const method_name = Console.Type[console_types[type]];
    Console[method_name] = Console.addMessage.bind(Console, method_name);
  }
})();

function ChromeFirePHP() {}

ChromeFirePHP.handleFirePhpHeaders = function (har_entry) {
  const response_headers = har_entry.response.headers;
  const wf_header_map = {};
  let had_wf_headers = false;

  for (var i = 0; i < response_headers.length; ++i) {
    const header = response_headers[i];
    if (/^X-Wf-/.test(header.name)) {
      wf_header_map[header.name] = header.value;
      had_wf_headers = true;
    }
  }

  const proto_header = wf_header_map['X-Wf-Protocol-1'];
  if (!had_wf_headers || !this._checkProtoVersion(proto_header)) return;

  const message_objects = this._buildMessageObjects(wf_header_map);
  message_objects.sort(function (a, b) {
    const aFile = a.File || '';
    const bFile = b.File || '';
    if (aFile !== bFile) return aFile.localeCompare(bFile);
    const aLine = a.Line !== undefined ? a.Line : -1;
    const bLine = b.Line !== undefined ? b.Line : -1;
    return aLine - bLine;
  });

  const context = { pageRef: har_entry.pageref };
  for (var i = 0; i < message_objects.length; ++i) this._processLogMessage(message_objects[i], context);
  if (context.groupStarted) Console.groupEnd();
};

ChromeFirePHP._processLogMessage = function (message, context) {
  const meta = message[0];
  if (!meta) {
    Console.error('No Meta in FirePHP message');
    return;
  }

  const body = message[1];
  const type = meta.Type;
  if (!type) {
    Console.error('No Type for FirePHP message');
    return;
  }

  switch (type) {
    case 'LOG':
    case 'INFO':
    case 'WARN':
    case 'ERROR':
      if (!context.groupStarted) {
        context.groupStarted = true;
        Console.groupCollapsed(context.pageRef || '');
      }
      Console.addMessage(Console.Type[type], '%s%o', meta.Label ? `${meta.Label}: ` : '', body);
      break;
    case 'EXCEPTION':
    case 'TABLE':
    case 'TRACE':
    case 'GROUP_START':
    case 'GROUP_END':
      // FIXME: implement
      break;
  }
};

ChromeFirePHP._buildMessageObjects = function (header_map) {
  const normal_header_prefix = 'X-Wf-1-1-1-';

  return this._collectMessageObjectsForPrefix(header_map, normal_header_prefix);
};

ChromeFirePHP._collectMessageObjectsForPrefix = function (header_map, prefix) {
  const results = [];
  const header_regexp = /(?:\d+)?\|(.+)/;
  let json = '';
  for (let i = 1; ; ++i) {
    const name = prefix + i;
    const value = header_map[name];
    if (!value) break;

    const match = value.match(header_regexp);
    if (!match) {
      Console.error(`Failed to parse FirePHP log message: ${value}`);
      break;
    }
    const json_part = match[1];
    json += json_part.substring(0, json_part.lastIndexOf('|'));
    if (json_part.charAt(json_part.length - 1) === '\\') continue;
    try {
      const message = JSON.parse(json);
      results.push(message);
    } catch (e) {
      Console.error(`Failed to parse FirePHP log message: ${json}`);
    }
    json = '';
  }
  return results;
};

ChromeFirePHP._checkProtoVersion = function (proto_header) {
  if (!proto_header) {
    Console.warn('WildFire protocol header not found');
    return;
  }

  const match = /http:\/\/meta\.wildfirehq\.org\/Protocol\/([^\/]+)\/(.+)/.exec(proto_header);
  if (!match) {
    Console.warn('Invalid WildFire protocol header');
    return;
  }
  const proto_name = match[1];
  const proto_version = match[2];
  if (proto_name !== 'JsonStream' || proto_version !== '0.2') {
    Console.warn('Unknown FirePHP protocol version: %s (expecting JsonStream/0.2)', `${proto_name}/${proto_version}`);
    return false;
  }
  return true;
};

chrome.devtools.network.addRequestHeaders({
  'X-FirePHP-Version': '0.0.6',
});

chrome.devtools.network.getHAR(function (result) {
  const { entries } = result;
  if (!entries.length) {
    Console.warn('ChromeFirePHP suggests that you reload the page to track' + ' FirePHP messages for all the requests');
  }
  for (let i = 0; i < entries.length; ++i) ChromeFirePHP.handleFirePhp_headers(entries[i]);

  chrome.devtools.network.onRequestFinished.addListener(ChromeFirePHP.handleFirePhpHeaders.bind(ChromeFirePHP));
});



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



