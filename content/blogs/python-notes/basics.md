---
title: "Byte sized Python - Basics"
date: 2022-04-24T21:52:20+05:30
showToc: true
draft: true
tags: ["python", "byte sized", "cheatsheet"]
cover:
    image: "images/python-1.svg"
---

Learning a new language can seem both easy and hard. There are concepts that seem to translate from a language you already know but there are some completely new things as well. This is generally the case with Python, even if you are an absolute beginner in programming. A lot of Python basics can be translated directly to english as well but the advanced concepts, not so much. Dedicate the next 30 mins to reading and hopefully learning about Python just through code snippets.

Hello World! That’s where we like to start:

```python
print("Hello World!")
```

Comments in python start with a #, I am going to use them a lot, hope you’ll too ;)

```python
# This is a comment
print("Hello World!") # print is a builtin function
```

Variables are easy in python, dynamic typing so just write what you need.

```python
a = 10
b = "Yo Yo"
c = a
e, f = 10, 11
g = 12; h = 13
```

Continuing with the above variables, let’s print them and learn more about print…

```python
print(a, b, c) # Pass as many arguments as you want to print
print(a, b, c, sep=",") # Optional Argument sep to assign a separting character
print(a, b, c, end="...") # Optional Argument end to assign an ending character
```

```bash
10 Yo Yo 10
10,Yo Yo,10
10 Yo Yo 10...
```

Variables are of different types, some important ones are

```python
this_int = 1 # Integers or int
this_float = 1.1 # Floats or float
this_string = "Hello" # Strings or str
this_bool = True # Bool or bool
this_list = [1, 2, 3] # Arrays/Lists or list
this_dictionary = {
	"foo": 1,
	2: "bar"
} # Always useful Hashmaps/Dictionaries or dict
this_tuple = (1, 2, 3) # Tuples/(Immutable Arrays)? or tuple 
this_none = None # Nothing or None
```

Other way to define these are using builtin functions

```python
this_int = int(1)
this_float = float(1.1)
this_string = str("Hello")
this_bool = bool(True)
this_list = list([1, 2, 3])
this_dictionary = dict({
	"foo": 1,
	2: "bar"
})
this_tuple = tuple((1, 2, 3))
```

and this is how to convert types as well

```python
a = 1 # an int -> 1
a = bool(a) # now a boolean -> True

```

and you can operate with these variables using:

```python
a = 1
b = 2
print("a + b =", a + b) # 3
print("a - b =", a - b) # -1
print("a / b =", a / b) # 0.5
print("a // b =", a // b) # 0 - Integer division
print("b ** b =", b ** b) # 4 - Exponentiation
print("a % b =", a % b) # 1 - Remainder, Modulo
print("a * b =", a * b) # 2
print("a < b =", a < b) # True
print("a > b =", a > b) # False
print("a <= b =", a <= b) # True
print("a >= b =", a >= b) # False
```

Some other not so obvious operations

```python
print("not a =", not a) # False -> like ! -> opposite of bool(a)
print("a or b =", a or b) # 1 -> a or b => a if bool(a) == True else b
print("a and b =", a and b) # 2 -> a and b => a if bool(a) == False else b
```
{{<collapse summary="You can also chain comparision operations in Python" >}}

    ```python
    a, b = 5, 10

    print("0 < a < b =", 0 < a < b)
    # x < y < z is equivalent to x < y and y < z
    print("6 < a < b =", 6 < a < b)
    # (6 < a) and (a < b)
    print("6 > a < b =", 6 > a < b)
    # (6 > a) and (a < b)
    # No relation is established between 6 and b
    ```
{{</collapse>}}

Before we move to the next important operator, we need to understand more about object identity and `id()`
Each `object` in Python has an identity (you can think of it as an integer memory address). These identities can help us differentiate between objects that variables might hold.
`id()` builtin function helps us get that identity.

```python
a = 16
b = "Hello"
print(id(a), id(b)) # Different objects so different ids

c = d = [1, 2, 3]
print(id(c), id(d)) # Same id because pointing to same object
```

and to check whether two variables are pointing to the same object or not, we use the `is` operator

```python
a = b = [1, 2, 3]
print(a is b) # True - id(a) == id(b)
```

Once we know what `id` of an object is, it becomes very easy to understand the next super important concept: Mutable vs Immutable Types
