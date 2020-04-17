A javascipt app that uses Firebase Database.

The webpage displays a list of recipes stored in the free 'Firebase' database. 

A project was created in Firebase named Modern-JS to set up the database.
Firebase provided the code that has been included in lines 28 to 47 of the index.html file.
This enables and configures the interaction from the JS app to the free database.

addRecipe and deleteRecipe constants store the functions required to add and delete recipe respectively. 

Line 48 of index.html file provides a handle to the database to be accessed in JS.

The data-id being used is the refernce the Firebase DB provides to identify each document in the collection i.e each 'recipe' in the "recipes". 

Methods like .collection, .add, .remove has been used on the database using the handle to add and remove items. 

On adding and removing items, the DOM does not get updated in real time but the database is.

To achieve real time update on the DOM ".onSnapshot" method of Firebase has been used which tracks any and all changes that happens in the database. 