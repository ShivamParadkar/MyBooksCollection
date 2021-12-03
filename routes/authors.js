const express = require('express')
const router = express.Router()
const Author = require('../modles/authour')

//All Authors route
router.get('/', async (req, res) => {
  let searchOption = {}
  if(req.query.name !=null && req.query.name !== ''){
     searchOption.name = new RegExp(req.query.name, 'i')
  }
  try{
        const authors = await Author.find(searchOption)
        res.render('authors/index',{authors: authors,
          searchOption: req.query
        })
  }catch{
      res.redirect('/');
  }
})

//new Author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author:new Author() });
})


//create Author route
router.post('/', async (req, res) => {
  const author = new Author({
    name:req.body.name
  });
  try {
      const newAuthor = await author.save();
      // res.render(`authors/${newAutthor.id}`)
      res.render(`authors`)
  } catch {
    res.render('authors/new',{
      author: author,
      errorMessage : 'Error saving author'
    })
  }
})

module.exports = router