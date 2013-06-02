'use strict';

this.App = {};
App.model = {};
App.list = {};
App.view = {};
App.ctrl = {};

P.persist = P.persist<%= persist %>;

window.onerror = function (errorMsg, url, lineNumber) {
    console.log(errorMsg, url, lineNumber);
};
