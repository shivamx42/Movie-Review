const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const https=require("https");
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let movies=[];

app.get("/",function(req,res){
    res.render("home",{
        
        newMovies: movies
    });
});


app.get("/review",function(req,res){
    res.render("review");
});



app.post("/review", function(req, res){
    const newReview={
        newTitle: req.body.newTitle,
        newReview: req.body.newReview,
        newPublisher: req.body.publishedBy,
    }

    
    const existingMovie = movies.find(movie => movie.title === newReview.newTitle);

    if (existingMovie) {
        
        existingMovie.reviews.push(newReview);
    } else {
        
        const newMovie = {
            title: newReview.newTitle,
            reviews: [newReview]
        }
        movies.push(newMovie);
    }

    res.render("form-success",{
        content: "Your Reviews are successfully stored"
    });
});


app.get("/about",function(req,res){
    res.render("about");
});


app.get("/contact",function(req,res){
    res.render("contact");
});


app.post("/contact",function(req,res){

    const formData={
        members:[
            {
                email_address: req.body.email,
                status: "subscribed",

                merge_fields: {
                    FNAME: req.body.first_name,
                    LNAME: req.body.second_name
                }
            }
        ]
    }

    const jsonData=JSON.stringify(formData);

    const url="https://us21.api.mailchimp.com/3.0/lists/"+process.env.LIST_ID

    const options={
        method:"POST",
        auth:"temp:"+process.env.API_KEY
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.render("form-success",{
                content: "Form Submitted Successfully"
            })
        }

        else res.render("form-failure");
    });

    request.write(jsonData);
    request.end();

});




app.get("/read/:movieTitle", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.movieTitle);

    
    const movie = movies.find(movie => _.lowerCase(movie.title) === requestedTitle);

    if(movie){
        res.render("read",{
            movieTitle: movie.title,
            reviews: movie.reviews
        });
    } else {
        
        res.render("read-failure");
    }
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});







