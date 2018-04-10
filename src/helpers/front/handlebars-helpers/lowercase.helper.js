#!/usr/bin/env node
'use strict';

module.exports = {
  name: 'lowercase',
  action: function (name) {
    return name.toLowerCase();
  }
};
