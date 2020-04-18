const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
    let time = (recipe.created_at.toDate());
    let html = `
        <li data-id="${id}">
            <div>${recipe.title}</div>
            <div>${time}</div>
            <button class="btn btn-danger btn-sm my-2">Delete</button>
        </li>
    `;

    // console.log(html);
    list.innerHTML +=  html;
}

//following function is to be used for removing content from DOM
const deleteRecipe = (id) => {
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe => {
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    });
};


            // //get documents from database
            //         db.collection('recipes').get().then((snapshot) => {
            //             //when we have the data
            //             // console.log(snapshot.docs[0].data());
            //             snapshot.docs.forEach(doc => {
            //                 // console.log(doc.id);
            //                 addRecipe(doc.data(), doc.id);
            //             });
            //         }).catch((err) => {
            //             console.log(err);
            //         });




//get docuemnts with real time listener
db.collection('recipes').onSnapshot(snapshot => { //    onSnapshot method tells the firebase to take a snapshot everytime there is a/any change made to the document....
    // console.log(snapshot.docChanges()); //the .docChanges method on snapshot logs the changes that happened...
    snapshot.docChanges().forEach(change => {
        const doc = change.doc; // returns the actual doc the changed happened to
        console.log(doc);
        if(change.type === 'added'){
            addRecipe(doc.data(), doc.id);
        } else if(change.type === 'removed'){
            deleteRecipe(doc.id);
        }
    })
});         

//add documents to the database using the form:
form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date(); //the documents (each entry) contains a created_at property....this line stores the time when an entry would be made

    //the following is a an object created that is to be passed into the database as the database accepts data in obejct format

    const recipe = {
        title: form.recipe.value,
        created_at:  firebase.firestore.Timestamp.fromDate(now) //firebase stores the created_at in it's own format...this line converts the date of entry to firebase's format
    };


    //db refers to the database....collection method on db takes in the name of the collection used in the firestore database ...the add method on the collection takes in an  obejct ( created above this snippet) that is to be added to the database....this method returns a promise and hence the then method can be used on it once it is resolved
    db.collection('recipes').add(recipe).then(() => {
        console.log('recipe added');
    }).catch((err) => {
        console.log(err);
    });

});


//deleting data (from database)
list.addEventListener('click', e => {
    // console.log(e);

    // the following code checks if a mouse click occured on a button
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id'); // finds the unique id of the document/entry/item which is to be deleted
        // console.log(id); // use this to see the id of each item on clicking the corresponding delete button
        db.collection('recipes').doc(id).delete().then(() => {
            console.log('recipe deleted');
        });
    }
});