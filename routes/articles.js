const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new',(req,res)=>{
    res.render('articles/new', {article:new Article()})
})
router.get('/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    if(article==null) res.redirect('/')
    res.render('articles/show', {article: article});
  })
router.post('/',async(req,res)=>{
     let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
      })
        
      try{
        article =  await article.save()
      res.redirect(`/articles/${article.id}`)
      }catch(err){
        console.log(err);
        res.render('articles/new', {article: article})
      }
})
router.delete('/articles/:id', async (req, res) => {
  try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
          res.status(404).send('Article not found');
      } else {
          res.redirect('/'); // Redirect to the home page after successful deletion
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});
module.exports = router