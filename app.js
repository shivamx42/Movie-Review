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

const homeContent="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quis quo harum eius, ipsa officia quibusdam accusamus quisquam, culpa voluptate libero veritatis incidunt laudantium debitis similique assumenda dolorem. Nostrum perferendis molestias quos molestiae nesciunt quas! Nostrum totam dolor ullam est et ut excepturi provident assumenda vel laboriosam quisquam repellat aut recusandae odit ea expedita dignissimos, veritatis nam doloremque pariatur officia nisi blanditiis soluta minima. Quia totam tempora porro fuga id, asperiores explicabo earum provident ea, vitae, voluptate dolores aliquam amet? Unde totam sed veritatis odit voluptas deserunt. Cum quos vel laudantium asperiores, sint animi odit corrupti hic sapiente libero temporibus, aut perspiciatis cumque nihil corporis numquam quod praesentium eaque magnam dignissimos. Quod, odit. Totam tempore nisi deleniti, porro tenetur delectus nobis veritatis harum. Reprehenderit similique sunt corporis dicta, cumque sint, vel perspiciatis esse repudiandae sit consectetur eos quis molestias? Voluptates autem debitis vel aperiam asperiores repudiandae dolor, quam rem laudantium sed corporis minima! Earum mollitia eveniet vero quaerat culpa suscipit tempora praesentium quo vel corporis id omnis rerum aspernatur nostrum non distinctio, at labore? Alias suscipit at itaque officiis perferendis animi impedit tempora sapiente repellendus autem perspiciatis hic et quisquam a nulla pariatur, quibusdam nemo deleniti illo nostrum, nesciunt vero earum unde. Recusandae eveniet mollitia nesciunt tenetur doloribus exercitationem quisquam, minus facere illum nihil accusantium commodi rerum aliquam sequi quod incidunt quas ad earum quae dolorum dolore, ratione sed esse. Corporis fugiat error sed nam incidunt, et obcaecati quos, eveniet quo asperiores labore commodi maiores ipsam voluptatum alias molestias accusantium maxime veniam repellendus cumque sit, quam blanditiis explicabo! Officiis aut nostrum esse doloremque quas ullam labore accusantium magnam! Explicabo laborum dignissimos temporibus inventore culpa, porro tempora at aperiam placeat enim sint consequatur molestiae illum ullam saepe distinctio repudiandae molestias suscipit architecto sequi veniam ut dolor voluptatibus minima. Pariatur, minima architecto!"

const aboutContent="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, velit, in numquam cumque aliquid asperiores accusantium, quidem facilis suscipit voluptas saepe distinctio fuga est fugiat. Assumenda et iusto quae! Esse est numquam explicabo aperiam odio facilis optio deleniti sequi qui earum doloribus voluptatem excepturi illo perferendis, aspernatur maxime dolorem provident. Deleniti libero et sunt error ipsam natus explicabo cum nostrum tempora assumenda molestiae odit incidunt vel repudiandae veniam id ullam inventore fugiat, rerum voluptatibus. Maxime cupiditate ullam dignissimos voluptates, asperiores praesentium aliquam doloribus id rem tempora quia molestias eum dicta sint. Ea esse porro, exercitationem aperiam adipisci sed a nulla earum quod delectus consequatur incidunt pariatur quisquam accusantium officia quibusdam tempora ipsa tempore nam ut officiis minima! Sequi cupiditate adipisci totam dolores debitis ab. Repellendus autem perferendis quo amet nisi nulla modi delectus, doloribus itaque sunt iure hic quaerat blanditiis, nostrum, iste debitis in! Similique, autem aliquam! Voluptatum, accusamus accusantium!"


const contactContent="Lorem ipsum dolm aperiam adipisci sed a nulla earum quod delectus consequatur incidunt pariatur quisquam accusantium officia quibusdam tempora ipsa tempore nam ut officiis minima! Sequi cupiditate adipisci totam dolores debitis ab. Repellendus autem perferendis quo amet nisi nulla modi delectus, doloribus itaque sunt iure hic quaerat blanditiis, nostrum, iste debitis in! Similique, autem aliquam! Voluptatum, accusamus accusantium!"



app.get("/",function(req,res){
    res.render("home",{
        homeContent: homeContent,
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
    res.render("about",{
      aboutUsContent: aboutContent
    });
});


app.get("/contact",function(req,res){
    res.render("contact",{
      contactUsContent: contactContent
    });
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







