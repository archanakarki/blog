//Require modules
const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000


//connecting mongoose
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

//Setting View engine to ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
// Mounting express-sanitizer middleware here
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Add postSchema to the database

const blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : {
        type : Date,
        default : Date.now
    }
});

//Remember as a post's collection or db.posts
//Mongoose model 
const Blog = mongoose.model('Blog', blogSchema);


/*Creats an instance of post*/
// let firstPost = new Post({
//         title : "This is the first post ",
//         content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet arcu at magna cursus, a consequat metus ultrices. Integer tincidunt auctor efficitur. Morbi risus nisl, suscipit a commodo quis, tempus vitae turpis. Aliquam eu neque lacinia, pharetra ligula vitae, accumsan odio. Aliquam vel faucibus tortor. Aliquam ornare, ligula quis hendrerit volutpat, diam tellus efficitur ipsum, ac porttitor tortor arcu volutpat enim. Sed facilisis venenatis ipsum in interdum. Cras mattis diam nec erat lobortis dictum."
// });

/* Saves the post to the database*/
// firstPost.save((err, newPost)=>{
//     if(err){
//         console.log("Error while creating a blog");
//     } else{
//         console.log("Post succesfully saved");
//     }
// });

/*Retrive from the database*/
// Post.find({}, (err, foundPost)=>{
//     if(err){
//         console.log("Oh no error");
//     } else {
//         console.log("This is the found post : " , foundPost)
//     }
// })

/* Create a blog */
// Blog.create({
//     title : "Productive day",
//     image : "https://images.pexels.com/photos/1684151/pexels-photo-1684151.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//     body : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet arcu at magna cursus, a consequat metus ultrices. Integer tincidunt auctor efficitur. Morbi risus nisl, suscipit a commodo quis, tempus vitae turpis. Aliquam eu neque lacinia, pharetra ligula vitae, accumsan odio. Aliquam vel faucibus tortor. Aliquam ornare, ligula quis hendrerit volutpat, diam tellus efficitur ipsum, ac porttitor tortor arcu volutpat enim. Sed facilisis venenatis ipsum in interdum. Cras mattis diam nec erat lobortis dictum."
// }, (err, newlySavedPost)=>{
//     if(err){
//         console.log(`Error while creating a blog post`)
//     } else {
//         console.log(`Succesfully saved a post`);
//     }
// });

//Routing
app.get('/', (req, res)=> res.redirect('/blogs'))
/* Restful routes */

//Index route
app.get('/blogs', (req, res)=> {
    Blog.find({}, (err, foundBlogPosts)=>{
        if(err){
            console.log("Error in finding blogs from database");
        } else{
            res.render('index', {blogs : foundBlogPosts});
        }
    });

});

//New route - opens form to add a new blog
app.get('/blogs/new', (req, res)=>{
    res.render('new');
});

//CREATE route a blog route
app.post('/blogs', (req, res)=>{
    Blog.create(req.body.blog, (err, newBlog)=>{
        if(err){
            console.log("Error while creating new blog");
            res.render('new');
        } else {
            console.log("New blog is succesfully made");
            res.redirect('/blogs');
        }
    });
});


//Show a blog post route
app.get('/blogs/:id', (req, res)=>{
   Blog.findOne(req.params._id, (err, showBlog)=>{
       if(err){
           console.log("Error is finding the specific blog");
       } else{
           res.render('show', {blog : showBlog});

       }
   });
});


//Edit route
app.get('/blogs/:id/edit', (req, res)=>{
    //find blog
    Blog.findOne(req.params._id, (err, editableBlog)=>{
        if(err){
            console.log("Error in finding editable blog");
        } else{
             //populate value
            res.render('edit', {blog : editableBlog});
        }
    });
})


//Update route
app.put('/blogs/:id', (req, res)=>{
    Blog.findOneAndUpdate(req.param._id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            console.log("Error in updating blog");
        } else{
            res.redirect(`/blogs/${req.params._id}`);
        }
    });
});


//Destroy route
app.delete('/blogs/:id', (req, res)=>{
    Blog.findOneAndRemove(req.params._id, (err)=>{
        if(err){
            console.log("Error while deleting the blog");
        } else{
            res.redirect("/blogs");
        }
    } )
})

app.listen(port, ()=>console.log(`Server is running at ${port}`))