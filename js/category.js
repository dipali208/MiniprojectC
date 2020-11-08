$(document).ready(()=>{
    
    $(()=>{
        var categories=['Nature','Technology','Skills','Motivation','Life','Sports','Happiness','Travel'];
        $('#category').autocomplete({
            source: categories
        });
    });

    $('#Go').click(()=>{
        var category=$("#category").val().toLowerCase();
        console.log(category);
        
        $.ajax({
            url:"http://localhost:3000/blogs",
            method:"GET",
            success:(data)=>{
                  console.log(data.length);
                 
                  for(i=0;i<data.length;i++)
                  {
                    if(data[i].category===category)
                    {
                     console.log("in check"+data[i].category);
                     
                     
                    var blogData=
"<div class='container'><div class='row'><div class='col-sm-6 col-md-4 col-lg-3 mt-4'><div class='card'><h5 class='card-header text-center'>"+data[i].title+"</h5><div class='card-body'><h5 class='card-title text-center'>Category:"+data[i].category+"</h5><h5 class='card-title text-center'>Date: "+data[i].date+"</h5><p class='card-text'>"+data[i].description+"</p><a class='btn btn-info' target='_blank' data-target='#myModal' data-toggle = 'modal' onclick='getSpecificId()'>Read more...</a></div></div></div></div><div>";
                    
                   $("#postArea").prepend(blogData);
                        
                      
                    }
                  }                    
            },
        error:(err)=>{
            console.log("error");
        }
        })
    });    
});


function createLink(record)
{

  let readMoreLink =document.createElement('a');
  readMoreLink.textContent="Read more...";
  readMoreLink.setAttribute('target','_self');
  readMoreLink.className = "read"
    
    
    // editBtn.setAttribute('href','abc.html?id='+v.id);
    if(sessionStorage.getItem("currentPostId")==undefined)
    {
      readMoreLink.setAttribute('data-target','#myModal');
      readMoreLink.setAttribute('data-toggle','modal');
    }
    else
    {
      readMoreLink.setAttribute("href","javascript:showPost()");
    }
  
  
   
    readMoreLink.onclick = function(){
    console.log(record.id);
    sessionStorage.setItem("currentPostId",record.id);
    var ids= record.id;

    //  $.ajax({
    //   url:"http://localhost:3000/Blog"+ids,
    //   method:"GET",
    //    data:{get_param :'value'},
    //   success:(blogs) =>{
    //     console.log(blogs);
    //     $("#show").append(blogs.title);
    //     // $.each(blogs,function(key,record){
    //     //   $("#cardId").append(createView(record));
    //     // });
    //   }
    // });   
  }
  return readMoreLink;
}

function createView(record){
            // var ab= record.description;
            // console.log(ab.slice(0,200));
            // var c=ab.slice(0,200);
            // let div1 =document.createElement('div');
            // let para =document.createElement('p');
            // let para1 =document.createElement('p');
            // para.innerHTML = c;
            // para1.innerHTML = record.title;
            // let mb=createButton(record);
            
            // div1.appendChild(para);
            // div1.appendChild(para1);
            // div1.appendChild(mb);
            // return div1;

            
            let colDiv =document.createElement('div');
            colDiv.className = "col-md-4 mt-4";
            let cardDiv=document.createElement('div');
    
            cardDiv.className = "card text-center cardData";
            colDiv.appendChild(cardDiv);
    
            let div1 =document.createElement('div');
            div1.className = "card-body cardPostData";
    
            let title =document.createElement('h5');
            title.className='card-title';
          
            let category =document.createElement('p');
            category.className='card-text';
    
            let date =document.createElement('p');
            date.className='card-text';
    
            let description =document.createElement('p');
            description.className='card-text';
    
            var descriptionData= record.description;
            var filterDescription=descriptionData.slice(0,150);
            description.innerHTML = filterDescription;
            var head= record.title;
            var cate = record.category;
            var blogDate = record.date;
    
            title.innerHTML = head;
            category.innerHTML = "Category: " + cate;
            date.innerHTML = "Date: "+blogDate;
            let link=createLink(record);
            div1.appendChild(title);
            div1.appendChild(category);
            div1.appendChild(date);
            div1.appendChild(description);
            div1.appendChild(link);
    
            var content = document.getElementById("postArea");
            cardDiv.appendChild(div1);
            content.appendChild(colDiv);
                return content;
    
}

function showPost()
{
  console.log("in show post function");
  location.assign("http://127.0.0.1:5500/html/readMore.html?id="+sessionStorage.getItem("currentPostId"));
}

