// JS Patterns
// ===========================================
// http://toddmotto.com/avoiding-anonymous-javascript-functions
// http://benalman.com/news/2010/11/immediately-invoked-function-expression
// http://toddmotto.com/stop-toggling-classes-with-js-use-behaviour-driven-dom-manipulation-with-data-states

// IIFE
// keep things outside the global scope plz
(function(window, document, undefined) {
    'use strict';
})(window, document);


// Function Declaration
function foo() { /* code */ }


// Object Function Method
// http://base.webknit.co.uk
var Base = Base || {};

Base.functionName = function() {
    var self = $(this),
        variable = $('element');

    function init() {
        variable.click(functionOne);
        functionTwo();
    }

    function functionOne() { /*code*/ }

    function functionTwo() {
        window.hide();
    }

    init();
};

// On Doc Ready
$(function() {
    new Base.functionName();
});


// jQuery Ajax
// ===========================================

$.ajax({
    type: 'POST',
    url: '/my/url',
    data: data
});

$.ajax({
    type: 'GET',
    url: '/my/url',
    success: function(resp) {},
    error: function() {}
});


// Event Listener IE8+
// http://youmightnotneedjquery.com
// ===========================================

function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, handler);
    }
}

addEventListener(el, eventName, handler);
