---
layout: page
title: Understanding Slots
---
## Introduction
 - `__slots__` has a mixed reputation in the Python community
 - On the one hand, they are considered to be popular. Lots of people like using them.
 - Others say that they are badly understood, tricky to get right, and don't have much of an effect unless there are many instances of objects that use them.
 - This article will explain what they are, how and why to use them in a simple case, and in a case that is a little trickier.
 - It will attempt to clear the air and explain some of the misunderstanding around `__slots__`.
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
- The short answer is, they are more efficient and more secure than the default Python method of data access. By default, when Python creates a new instance of a class, it creates a `__dict__` attribute for the class. The `__dict__` attribute is a dictionary whose keys are the variable names and whose values are the variable values.  For example, here is a simple class definition
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
The output here is not what was expected. The underscore was left out of the var_1 assignment and as a result we now have an extra variable in our dictionary named 'var1'. With `__slots__`, this would result in an AttributeError. The dictionary uses more memory space than `__slots__`, and direct memory access is faster than dictionary lookups. These are some of the reasons why you might want to use slots. 

Perhaps the better questions is why not use `__slots__`? Maybe you would like to permit dynamic variable creation. That can be accomplished by adding the string `'__dict__'` as the last entry in your `__slots__` declaration.

### __slots__ Declaration
- values must be strings
- values must be identifiers
- cannot contain spaces or other characters that are not allowed in identifiers
- link to identifiers?
- The declaration causes Python to reserve memory for each slot and prevents it from creating the default `__dict__`
### Variables Declaration
- Tuples are immutable and cannot be assigned to after they've been created
- We need a method of accessing the `__slots__`
- Access to `__slots__` is provided by initializing variables with the same names as the slots
- We can now access slots by assignment and referencing
- Attempting to access the slots tuple directly returns only the field names
- It is important to understand that variables _field0 and _field1 are _descriptors_. They do not store their values in the `__slots__` tuple. They use memory which has been reserved by Python through the `__slots__` declaration.
- Classes with a `__slots__` declaration cannot have class variables that are not declared in `__slots__`
- This prevents the type of error that can occur with the default `__dict__`.
- It is possible to override this behavior by including `__dict__` as the last item in the `__slots__` declaration.
### Using A List For `__slots__`
- Python allows any sequence type to be used for slots.
- Behavior changes depending on what type is used.
- Since Python lists are mutable, we can access the `__slots__` list directly.
- The behavior of the descriptors doesn't change. 
- We can assign to and retrieve data from the `__slots__` list directly, but this is not the same data that may have been assigned through descriptors.
### Use Cases For `__slots__` List
- Using a list for `__slots__` allows us to access the list directly, to get or set values by iterating over the list, and to return the entire list with it's values. None of this is possible with descriptors.
- It may be useful in some cases to have both direct access and descriptors.
- For example, in a class that writes data to a file, it's easier to collect data by assigning values to descriptors. But when the same class reads data from the file, it's more efficient to use direct access.
### Slots Advantages
- Using `__slots__` is similar to how variables are declared and used in languages like C and C++.
- They may offer some advantages in size (less memory used), performance, and security.
- These improvements are small, and it may be more a matter of preference for individual programmers.

