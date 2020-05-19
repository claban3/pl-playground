# U-combinator
# U lets us do some self-application
U = lambda f: f(f)

# Take the function 
# fact = lambda n: 1 if n <= 0 else n*fact(n-1)
#
# This lambda cannot be bound to `fact, since it is defined 
# after the lambda. 
# 
# fact = ((lambda f: lambda n: 1 if n <= 0 else n*fact(n-1)) 
#         (lambda f: lambda n: 1 if n <= 0 else n*fact(n-1)))
#
# The above definition is closer to correct, but still fails since
# we are recursively referencing `fact. 
# 
# We use U(f) == f(f) to clean up the recursive reference to fact.
# 
# Why? 
# 
#
# Cleaned and finished up we have
fact = U(lambda f: lambda n: 1 if n <= 0 else n*U(f)(n-1))
# When evaluated, we have a function that takes as input 
# n, and evaluates to f(f(n-1))
print(fact(5))

# I still don't get it 

# Y-combinator
#
# We want to derive a function Y, that takes as input a 
# function F, and finds its fixed point f, such that 
# F(f) = f
#
# Y(F) == f        F(f) == f
# Y(F) == F(f)
# Y(F) == F(Y(F))
#
# We can't simple write 
#   Y = lambda F: F(Y(F))
# since we are recursively referencing Y.
#
# Instead we use eta-expansion, where for all 
# e in LAMBDA, we have 
# e == lambda x: e(x)
#
# Y = lambda F: F(lambda x: Y(F)(x))
#
# Now we apply the U-combinator to eliminate the 
# explicit self-reference.
Y = U(lambda h: lambda F: F(lambda x: U(h)(F)(x)))

print (Y(lambda f: lambda n: 1 if n <= 0 else n*f(n-1))(6))

