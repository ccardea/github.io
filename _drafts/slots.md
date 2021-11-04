---
layout: page
title: Understanding Slots
---
## Introduction
  `__slots__` has a mixed reputation in the Python community. On the one hand, they are considered to be popular. Lots of people like using them. Others say that they are badly understood, tricky to get right, and don't have much of an effect unless there are many instances of objects that use them. This article will explain what they are, how, and why to use them, and when not to use them.

 ## What Are `__slots__` ?
  `__slots__` are discussed in the Python Language Reference under section 3.3.2, Customizing Attribute Access. The first thing we should understand is that `__slots__` is only used in the context of Python classes. `__slots__` is a class variable that is usually assigned a sequence of strings that are variable names used by instances. For example:
 ```
    class Example():
        __slots__ = ('_slot_0', '_slot_1')
 ```
 This declaration allows us to explicitly declare data members, causes Python to reserve space for them in memory, and prevents the creation of `__dict__ ` and `__weakref__` attributes. It also prevents the creation of any variables that aren't declared in `__slots__`.

## Why Use `__slots__`?
The short answer is slots are more efficient in terms of memory space and speed of access, and a bit safer than the default Python method of data access. By default, when Python creates a new instance of a class, it creates a `__dict__` attribute for the class. The `__dict__` attribute is a dictionary whose keys are the variable names and whose values are the variable values.  For example, here is a simple class definition:
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
dict_keys(['var_0', 'var_1'])

>>> print(x.__dict__.values())
dict_values(['This is variable 0', 'This is variable 1'])
```
We can now assign values to the variables with dot notation.
```
>>> x.var_0 = 'zero'
>>> x.var1 = 'one'
>>>  print(x.__dict__.keys())
dict_keys(['var_0', 'var_1', 'var1'])

>>> print(x.__dict__.values())
dict_values(['zero', 'This is variable 1', 'one'])
```
The output here is not what was expected. The underscore was left out of the var_1 assignment and as a result we now have an extra variable in our dictionary named 'var1'. With `__slots__`, a misspelled variable name results in an AttributeError. `__slots__` uses less memory space than `__dict__`, and direct memory access is faster than dictionary lookups. These are some of the reasons why you might want to use slots. 


## Slots Basics
In the basic case, slots are easy to use. For example, here is a simple class definition:
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
This is slot 0

>>> print(x._slot_1)
This is slot 1

>>> x._slot_0 = 'Is _slot_1 here?'
>>> x._slot_1 = "_slot_1 is here."
>>> print(x._slot_0, "\n", x._slot_1)
Is _slot_1 here? 
 _slot_1 is here.

```
That's it. To the user who is writing code, slots look and behave exactly like the default. Once we've declared and initialized our variables, we can reference and assign to them using dot notation.

## Using A List For Slots
The previous example used a tuple for the `__slots__` declaration. The Python documentation states that any non-string iterable can be used. This section describes how slots behavior can change when using a list for the declaration. 

For the most part, using a list for the `__slots__` declaration looks and works exactly like using a tuple.
```
class Example():
    
    __slots__ = ['_slot_0', '_slot_1']
    
    def __init__(self):
        self._slot_0 = 'This is slot 0'
        self._slot_1 = 'This is slot 1'
```
Using the same code as the previous interactive session will produce exactly the same results. But unlike a tuple, a list is mutable, and there may be cases when we want to access the list directly. For example, we can implement get and set functions that access the list directly, as shown below.
```   
    def _set(self, _slot, _value):
        self.__slots__[_slot] = _value
        return None
    
    def _get(self, _slot):
        return self.__slots__[_slot]
   
```
Attempting to use both dot notation and getters and setters will produce results that may be surprising. The example code below uses both previous examples.
```
>>>  x = Example()
>>> print(x._slot_0)
This is slot 0

>>> print(x._get(0))
_slot_0

>>> x._set(0, 'zero')
>>> print(x._slot_0)
This is slot 0

>>> print(x._get(0))
zero
```
This session shows that accessing `x._slot_0` works as it did before, but attempting to access `_slot_0` with the get function returns only the name of the variable. If we then use the set function to insert a value, we see that the value returned by `x._slot_0` hasn't changed, but the get function retrieves the value inserted with the set function. 

Python does not allow access through the list to data that has been set through `__slots__` variables, and we cannot overwrite data set through `__slots__` variables by writing to the list directly. But we can still use the list like any other list without altering the variable names or the data they contain.  


## Default Values 
The following text appears in the Python Language Reference section 3.3.2.4.1:

> `__slots__ `are implemented at the class level by creating descriptors ... for each variable name. As a result, class  attributes cannot be used to set default values for instance variables defined by `__slots__`; otherwise, the class  attribute would overwrite the descriptor assignment.

That instruction was a source of confusion for this author. It is not necessary to explicitely implement descriptors in order to use slots. The point is that default values may not be set using class attributes.

```
class Example():
    
    __slots__ = ['_slot_0', '_slot_1']
    
    _slot_0 = 'This is slot 0'
    _slot_1 = 'This is slot 1'  

Out:   ValueError: '_slot_0' in __slots__ conflicts with class variable
```
Likewise,
```
class Example():
    
    __slots__ = ['_slot_0', '_slot_1']
    
    __slots__[0] = 'This is slot 0'
    __slots__[1] = 'This is slot 1'

Out:  TypeError: __slots__ must be identifiers
```
If desired, default values for `__slots__` variables may be set in the class `__init__()` method, as shown in previous examples, but it is not necessary to do so. Values may be assigned to slots variables that have not been initialized with default values.
```
class Example():
    
    __slots__ = ['_slot_0', '_slot_1']
    
    def __init__(self):   
        return None

>>> x = Example()
>>> x._slot_0 = 'zero'
>>> print(x._slot_0)
Out: zero
```
## Why Not Use Slots?

There may be cases when you might not want to use `__slots__`; for example, if you would like for your class to use dynamic atttribute creation or weak references. In those cases, you can add `'__dict__'` or `'__weakref__'` as the last element in the `__slots__` declaration.

Certain Python objects may depend on the `__dict__` attribute. Descriptor classes depend on the `__dict__` attribute being present in the owner class.  The functools.cached_property() also requires an instance dictionary to function correctly. Programmers may want to avoid `__slots__` in any case where another Python object requires `__dict__` or `__weak_ref__`to be present.

## Beyond The Basics
There are a few things to be aware of when going beyond the basics.  Slots variables declared in parents are available in child classes. However, child subclasses will get a `__dict__` and `__weakref__` unless they also define `__slots__`, which should only contain names of additional slots. Multiple inheritance with multiple slotted parent classes can be used, but only one parent is allowed to have attributes created by slots. The other bases must have empty slot layouts. For additional details, please see the Python Language Reference, section 3.3.2.4.1.


