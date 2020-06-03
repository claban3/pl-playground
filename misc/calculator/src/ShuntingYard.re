/*
 * ReasonML Implementation of the Shunting-Yard Algorithm
 * 
 */
let prec = (op) => {
    switch op {
        | "*" => 4
        | "/" => 4
        | "+" => 3
        | "-" => 3
        | _ => -1
    };
};

let is_number = (x) => prec(x) < 0;
let is_op = (x) => prec(x) > 0;

let push_while = (should_move, stack) => {
    let rec push_while_inner = (moved, stack) => {
        switch (stack) {
            | [top, ...stack'] when should_move(top) => {
                push_while_inner([top, ...moved], stack');
            }
            | _ => (moved, stack)
        };
    };
    push_while_inner([], stack);
}

let shunting_yard = (tokens) => {
    let rec pusher = (stack, queue, tokens) => {
        switch tokens {
            | [] => List.rev_append(queue, stack)
            | [num, ...tokens'] when is_number(num) => {
                pusher(stack, [num, ...queue], tokens');
            }
            | [op, ...tokens'] when is_op(op) => {
                let should_move = (op_other) => {
                    is_op(op_other) && prec(op) <= prec(op_other)
                };
                let (moved, stack') = push_while(should_move, stack);
                pusher([op, ...stack'], moved @ queue, tokens');
            }
            | _ => ["error"]
        }
    };

    pusher([], [],tokens);
};

let input = ["1","+","2","-","3"];

Js.log(Array.of_list(shunting_yard(input)));
