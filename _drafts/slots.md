---
layout: page
title: Understanding Slots
---
## What Are Slots
- Alternative data handling
### Python Default 
- __dict__ demonstration
- show dictionary contents
- show error caused by spelling error
- Descriptors - link to How To
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
- No class variables can be created that haven't been declared in `__slots__`
- Attempting to access the slots tuple directly returns only the field names
- It is important to understand that variables _field0 and _field1 are _descriptors_. They do not store their values in the `__slots__` tuple. They use memory which has been reserved through the `__slots__` declaration.
- Classes with a `__slots__` declaration cannot have class variables that are not declared in `__slots__`
- It is possible to override this behavior by including `__dict__` as the last item in the `__slots__` declaration.
### Using A List For `__slots__`
- Python allows any sequence type to be used for slots.
- Behavior changes depending on what type is used.
- Since Python lists are mutable, we can access the `__slots__` list directly.
- The behavior of the descriptors doesn't change. 
- We can assign to and retrieve data from the `__slots__` list directly, but this is not the same data that may have been assigned through descriptors.
### Use Cases For `__slots__` List
- 

