(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var toggle, drawer, content;

toggleButton = document.getElementById('toggle');
drawerButton = document.getElementById('toggleDrawer');
content = document.getElementById('content');

function toggleVisibility() {
  content.classList.toggle('visible');
}

function toggleStyle() {
  content.classList.toggle('drawer');
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHBcXGpzXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxNQUFKLEVBQVksTUFBWixFQUFvQixPQUFwQjs7QUFFQSxlQUFlLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsZUFBZSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBZjtBQUNBLFVBQVUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQVY7O0FBRUEsU0FBUyxnQkFBVCxHQUEyQjtBQUN6QixVQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsU0FBekIsRUFEeUI7Q0FBM0I7O0FBSUEsU0FBUyxXQUFULEdBQXNCO0FBQ3BCLFVBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixRQUF6QixFQURvQjtDQUF0QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdG9nZ2xlLCBkcmF3ZXIsIGNvbnRlbnQ7XG5cbnRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUnKTtcbmRyYXdlckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGVEcmF3ZXInKTtcbmNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KCl7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTdHlsZSgpe1xuICBjb250ZW50LmNsYXNzTGlzdC50b2dnbGUoJ2RyYXdlcicpO1xufSJdfQ==
