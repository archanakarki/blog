//Require modules
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000

//connecting mongoose
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useUnifiedTopology', true);

//Setting View engine to ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


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
app.get('/', (req, res)=> res.send("Hello World"))
/* Restful routes */
app.get('/blogs', (req, res)=> res.render('index'));

app.listen(port, ()=>console.log(`Server started at ${port}`))