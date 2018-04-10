#!/usr/bin/env node
'use strict';

module.exports = {
  name: 'urlify',
  action: function (name) {
    var urlName = '';

    for(var i=0; i<name.length;i++) {
      if(name.charCodeAt(i) < 97) {

        urlName += '-' + name.charAt(i).toLowerCase();
      } else {
        urlName += name.charAt(i);
      }
    }

    return urlName;
  }
};
