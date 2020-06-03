// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function prec(op) {
  switch (op) {
    case "+" :
    case "-" :
        return 3;
    case "*" :
    case "/" :
        return 4;
    default:
      return -1;
  }
}

function is_number(x) {
  return prec(x) < 0;
}

function is_op(x) {
  return prec(x) > 0;
}

function push_while(should_move, stack) {
  var _moved = /* [] */0;
  var _stack = stack;
  while(true) {
    var stack$1 = _stack;
    var moved = _moved;
    if (!stack$1) {
      return /* tuple */[
              moved,
              stack$1
            ];
    }
    var top = stack$1[0];
    if (!Curry._1(should_move, top)) {
      return /* tuple */[
              moved,
              stack$1
            ];
    }
    _stack = stack$1[1];
    _moved = /* :: */[
      top,
      moved
    ];
    continue ;
  };
}

function shunting_yard(tokens) {
  var _stack = /* [] */0;
  var _queue = /* [] */0;
  var _tokens = tokens;
  while(true) {
    var tokens$1 = _tokens;
    var queue = _queue;
    var stack = _stack;
    if (!tokens$1) {
      return List.rev_append(queue, stack);
    }
    var tokens$prime = tokens$1[1];
    var num = tokens$1[0];
    if (prec(num) < 0) {
      _tokens = tokens$prime;
      _queue = /* :: */[
        num,
        queue
      ];
      continue ;
    }
    if (prec(num) <= 0) {
      return /* :: */[
              "error",
              /* [] */0
            ];
    }
    var should_move = (function(num){
    return function should_move(op_other) {
      if (prec(op_other) > 0) {
        return prec(num) <= prec(op_other);
      } else {
        return false;
      }
    }
    }(num));
    var match = push_while(should_move, stack);
    _tokens = tokens$prime;
    _queue = Pervasives.$at(match[0], queue);
    _stack = /* :: */[
      num,
      match[1]
    ];
    continue ;
  };
}

var input = /* :: */[
  "1",
  /* :: */[
    "+",
    /* :: */[
      "2",
      /* :: */[
        "-",
        /* :: */[
          "3",
          /* [] */0
        ]
      ]
    ]
  ]
];

console.log($$Array.of_list(shunting_yard(input)));

exports.prec = prec;
exports.is_number = is_number;
exports.is_op = is_op;
exports.push_while = push_while;
exports.shunting_yard = shunting_yard;
exports.input = input;
/*  Not a pure module */