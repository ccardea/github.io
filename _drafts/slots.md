---
layout: page
title: Understanding Slots
---
## Introduction
 - `__slots__` has a mixed reputation in the Python community
 - On the one hand, they are considered to be popular. Lots of people like using them.
 - Others say that they are badly understood, tricky to get right, and don't have much of an effect unless there are many instances of objects that use them.
 - This article will explain what they are, how and why to use them in a simple case, and in a case that is a little trickier.
 - It will attempt to explain some of the misunderstanding around `__slots__`.
 ## What Is `__slots__` ?
 - `__slots__` is discussed in the Python Language Reference under section 3.3.2 Customizing Attribute Access.
 - The first thing we should understand is that `__slots__` is only used within Python classes or objects.
 - `__slots__` is a class variable that is usually assigned a sequence of strings that are variable names used by instances. For example:
 ```
    class Example():
        __slots__ = ('_slot_0', '_slot_1')
 ```
 - This declaration allows us to explicitly declare data members, causes Python to reserve space for them in memory, and prevents the creation of `__dict__ ` and `weakref` attributes. It also prevents the creation of any variables that aren't declared in `__slots__`.
## Why Use `__slots__`?
- The short answer is slots are more efficient and more secure than the default Python method of data access. By default, when Python creates a new instance of a class, it creates a `__dict__` attribute for the class. The `__dict__` attribute is a dictionary whose keys are the variable names and whose values are the variable values.  For example, here is a simple class definition
```
class Example():
    
    def __init__(self):
        self.var_0 = 'This is variable 0'
        self.var_1 = 'This is variable 1'
```
An interactive session looks like this:
```
>>> x = Example()
>>> print(x.__dict__.keys())
Out: dict_keys(['var_0', 'var_1'])

>>> print(x.__dict__.values())
Out: dict_values(['This is variable 0', 'This is variable 1'])
```
We can now assign values to the variables with dot notation.
```
>>> x.var_0 = 'zero'
>>> x.var1 = 'one'
>>>  print(x.__dict__.keys())
Out: dict_keys(['var_0', 'var_1', 'var1'])

>>> print(x.__dict__.values())
Out: dict_values(['zero', 'This is variable 1', 'one'])
```
The output here is not what was expected. The underscore was left out of the var_1 assignment and as a result we now have an extra variable in our dictionary named 'var1'. With `__slots__`, a misspelled variable name results in an AttributeError. `__slots__` uses less memory space than `__dict__`, and direct memory access is faster than dictionary lookups. These are some of the reasons why you might want to use slots. 

Perhaps the better question is why _not_ use `__slots__`? Maybe you would like to permit dynamic variable creation. That can be accomplished by adding the string `'__dict__'` as the last entry in your `__slots__` declaration.

## Using `__slots__` - The Simple Case
- In the simple case, slots are easy to use. For example, here is a simple class definition:
```
class Example():
    
    __slots__ = ('_slot_0', '_slot_1')
    
    def __init__(self):
        self._slot_0 = 'This is slot 0'
        self._slot_1 = 'This is slot 1'
```
An interactive session looks like this:
```
>>> x = Example()
>>> print(x._slot_0)
Out: This is slot 0

>>> print(x._slot_1)
Out: This is slot 1

>>> x._slot_0 = 'Is _slot_1 here?'
>>> x._slot_1 = "_slot_1 is here."
>>> print(x._slot_0, "\n", x._slot_1)
Out: Is _slot_1 here? 
 _slot_1 is here.

```
That's it. To the user who is writing code, slots look and behave exactly like the default. Once we've declared and initialized our variables, an instance can reference and assign to them using dot notation.

### Using Slots Can Get A Little Tricky
- So far the example code has used a tuple for the `__slots__` declaration. The Python documentation states that any non-string iterable can be used. In this section we look at what happens when we use a list. 
- Using a list looks and works exactly like a tuple.
```
class Example():
    
    __slots__ = ['_slot_0', '_slot_1']
    
    def __init__(self):
        self._slot_0 = 'This is slot 0'
        self._slot_1 = 'This is slot 1'
```
Using the same code from the previous example will produce exactly the same results. But unlike a tuple, a list is mutable, and there may be cases when we want to access the list directly. Doing so will produce surprising results. 
```
class Example():
    
           
    def _set(self, _slot, _value):
        self.__slots__[_slot] = _value
        return None
    
    def _get(self, _slot):
        return self.__slots__[_slot]
    x = Example()
```

```
>>> print(x._slot_0)
Out: This is slot 0

>>> print(x._get(0))
Out: _slot_0

>>> x._set(0, 'zero')
>>> print(x._slot_0)
Out: This is slot 0

>>> print(x._get(0))
Out: zero
```
In the example code above, there are get and set functions that access the `__slots__` list directly. The interactive session shows that accessing `x._slot_0` works as it did before, but attempting to access `_slot_0` with the get function returns only the name of the variable. If we then use the set function to insert a value, we see that the value returned by `x._slot_0` hasn't changed, but the get function retrieves the value inserted with the set function. 

Python does not allow direct access through the `__slots__` list to data that has been set through variables declared there, but we can still use the `__slots__` list like an ordinary list. It is not known if the designers intended this behavior, since the primary function of the `__slots__` iterable is to declare variables and allocate space for them in memory. It may be useful in cases where we want to iterate over the list or return the entire list. 



