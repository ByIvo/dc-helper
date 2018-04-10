#!/usr/bin/env node
'use strict';

module.exports = {
  name: 'capitalized',
  action: function (name) {
    return name.toUpperCase().charAt(0) + name.slice(1);
  }
};
