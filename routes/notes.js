const router = require('express').Router();
const Note = require('../models/m-notes'); //your collection
const Trash = require('../models/m-trash');
const Problem = require('../models/m-problem');

//main route
router.get('/', (req, res)=>{
    res.redirect('/notes')
})


//route to add new note
router.post('/add-note', async(req, res)=>{
    const { title, note, date } = req.body; 
    const newNote = Note({ title, note, date })
    await newNote.save()

    res.redirect('/notes')
})


//route to show notes       and where are redirected after save
router.get('/notes', async(req, res)=>{
    const notes = await Note.find().sort({date: 'desc'})

    res.render('all-notes', {layout: 'layouts/main', notes})
})


//route to update note
router.put('/update/:id/:currentRoute', async(req, res)=>{
    const { title, note } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, note});
    
    if(req.params.currentRoute==='notes'){
        res.redirect('/notes')
    }else{
        res.redirect('/favorites')
    }
})


//routes to delete note 
router.delete('/delete/:id/:currentRoute', async(req, res)=>{
    if(req.params.currentRoute === 'notes'){
            //add note in collection trash
    const deletedNote = await Note.findById(req.params.id)
    const trashNote = new Trash({
        title: deletedNote.title,
        note: deletedNote.note
    });
    await trashNote.save();
    //then delete from notes and favorites
    await Note.findByIdAndDelete(req.params.id);

    res.redirect('/notes')
    }else{//esto es para que al quitar una nota de "favorites" se quite el corazon de "notes"
        await Note.findByIdAndUpdate(req.params.id, { favorite: false });

        res.redirect('/favorites')
    }

});

//route show trash notes
router.get('/trash', async(req, res)=>{
    const notes = await Trash.find()
    res.render('trash-notes', {layout: 'layouts/main', notes})
});


//route delete trash
router.delete('/deleteTrash/:id', async(req, res)=>{
    await Trash.findByIdAndDelete(req.params.id)

    res.redirect('/trash');
});


//route add/remove favorites
router.get('/favorites/:id', async(req, res)=>{
    const note = await Note.findById(req.params.id)
    await Note.findByIdAndUpdate(req.params.id, { favorite: !note.favorite }); //add or remove true or false

    res.redirect('/notes')
});


//route favorites
router.get('/favorites', async(req, res)=>{
    const favoriteNote = await Note.find({ favorite: true })
    res.render('favorites-notes', {layout: 'layouts/main', favoriteNote})
});


//route restore
router.post('/restore/:id', async(req, res)=>{
    //add trash in collection notes
    const trashNote = await Trash.findById(req.params.id);
    const restoredNote = new Note({
        title: trashNote.title,
        note: trashNote.note,
        date: Date.now(),
        favorite: false
    });
    await restoredNote.save()
    //remove trash from trash
    await Trash.findByIdAndDelete(req.params.id)

    res.redirect('/trash')
});


//route search all-notes
router.get('/search', async(req, res)=>{
    const query = req.query.query;
    const notes = await Note.find({ $text: { $search: query } });
    if (notes.length > 0) {
    res.render('all-notes', { notes })
    } else {
    res.send('Nothing found');
    }
   });

//route search trash-notes
   router.get('/search-trash', async (req, res) => {
    const query = req.query.query;
    const notes = await Trash.find({ $text: { $search: query } });
    if (notes.length > 0) {
      res.render('trash-notes', { notes });
    } else {
      res.send('Nothing found');
    }
  });

//route search favorites-notes
  router.get('/search-favorites', async (req, res) => {
    const query = req.query.query;
    const notes = await Note.find({ $text: { $search: query }, favorite: true });
    if (notes.length > 0) {
      res.render('favorites-notes', { favoriteNote: notes });
    } else {
      res.send('Nothing found');
    }
  });
  

//route delete all in trash
  router.delete('/delete-all-trash', async (req, res) => {
    await Trash.deleteMany({});
    res.redirect('/trash');
  });


//route report problems
router.get('/report-problems', (req, res)=>{
    res.render('report-problems', {layout: 'layouts/main'})
})
  

//route which receive problem
router.post('/receive-problem', async(req, res)=>{
    const { problem, date } = req.body;
    const newProblem = new Problem({
        problem, 
        date
    });
    await newProblem.save()

    res.send(`<h1>Your message will be ignored successfully</h1>`)
})





module.exports = router;