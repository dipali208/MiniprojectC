$(document).ready(()=>{
    var blogId = location.search;
    $.ajax({
  url:"http://localhost:3000/blogs"+blogId,
  method:"GET",
  success:(blogs) =>{
      console.log(blogs);
      
    console.log(blogs[0].title);
  
    
    $("#show").append("<div class='card read-more-card'><h3 class='card-title read-more-title'>"+blogs[0].title+
    "</h3><div class='card-body'><p class='card-text'><label>Category:&nbsp</label>"+blogs[0].category+
    "</p><p class='card-text'><label>Date:&nbsp</label>"+blogs[0].date+
    "</p><p class='card-text'>&nbsp&nbsp&nbsp"+blogs[0].description+
    "</p><a href='#' class='btn btn-primary'>commet</a></div></div>");
}
})
})