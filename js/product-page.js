$(document).ready(function() {

    $('#banner.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        dots: false,
        items: 1,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:false
    });

    $('#topSelection .owl-carousel').owlCarousel({
        loop: false,
        nav: true,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
            },
            600:{
                items:3,
            },
            768:{
                items:4,
            },
            1000:{
                items:7,
            }
        }
    });

    $('#recommended .owl-carousel').owlCarousel({
        loop: false,
        nav: true,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
            },
            600:{
                items:3,
            },
            768:{
                items:4,
            },
            1000:{
                items:6,
            }
        }
    });

    $(window).scroll(function(){
        if(scrollY > 150) {
            $('header').addClass('shadow-lg');
        } else {
            $('header').removeClass('shadow-lg');
        }
    });

    // arrow dropdown rotate on hover
    $('.userDropDown').hover(function() {
        $('.userDropDown span').toggleClass('rotateDropDown');
    }, function() {
        $('.userDropDown span').toggleClass('rotateDropDown');
    });

    $('.moreDropDown').hover(function() {
        $('.moreDropDown span').toggleClass('rotateDropDown');
    }, function() {
        $('.moreDropDown span').toggleClass('rotateDropDown');
    });

    // dropdown hovers
    $('.userDropDown').hover(function(){
        $('.userDropDownMenu').toggleClass('active');
    }, function() {
        $('.userDropDownMenu').toggleClass('active');
    });

    $('.moreDropDown').hover(function(){
        $('.moreDropDownMenu').toggleClass('active');
    }, function() {
        $('.moreDropDownMenu').toggleClass('active');
    });

    $('.userDropDownMenu').hover(function(){
        $(this).addClass('active');
    }, function() {
        $(this).toggleClass('active');
    });

    $('.moreDropDownMenu').hover(function(){
        $(this).addClass('active');
    }, function() {
        $(this).toggleClass('active');
    });
    // dropdown hovers

    // js-image-zoom 
    var zoom_img = document.querySelector('.zoomimg');
    var options = {
        width: 300,
        zoomWidth: 600,
        scale: 0.5,
        zoomStyle: 'height:500px;width:12000px;border-radius:2px;',
        zoomLensStyle: 'opacity: 0.3;height: 10px;width: 20px;background-color: black;',
        offset: {vertical: 20, horizontal: 30},
        // zoomPosition: 'right',
        zoomContainer: document.querySelector('.zoomimg')
    };
    new ImageZoom(document.querySelector('.image-box'), options);

    $('#qtyUp').on('click',function(e){
        if($('#qtyInput').val()>=1 && $('#qtyInput').val()<=10){
            $('#qtyInput').val(function(i, oldval){
                    return ++oldval;
                });
            }
    });

    $('#qtyDown').on('click',function(){
        if($('#qtyInput').val()>=2 && $('#qtyInput').val()<=11){
            $('#qtyInput').val(function(i, qtynos){
                return --qtynos;
            })
        }
    });


    // personal info edit buttons
    $('#editPersonalBtn').click(function() {
        // change button text
        $(this).text() == 'Edit' ? $(this).text('Cancel') : $(this).text('Edit')
  
        $('#personalSaveBtn').toggleClass('hidden');
        $('#personalInputs .inputs').toggleClass('bg-gray-100').toggleClass('cursor-not-allowed');
        toggleInputs('#personalInputs');
        $('#radioInput .inputs').toggleClass('text-gray-500').toggleClass('cursor-not-allowed');
        $('#radioInput label').toggleClass('cursor-not-allowed');
        toggleInputs('#radioInput');

    });
    // personal info edit buttons

    const toggleEdit = (editBtn,saveBtn,inputs) => {
        $(editBtn).click(function() {
            $(this).text() == 'Edit' ? $(this).text('Cancel') : $(this).text('Edit')
            $(saveBtn).toggleClass('hidden');
            $(inputs).toggleClass('bg-gray-100').toggleClass('cursor-not-allowed');
            toggleInputs(inputs);
        });
    }

    const toggleInputs = (inputs) => {
        $(`${inputs} input`).toggleClass('cursor-not-allowed').toggleClass('text-gray-500');
            $(`${inputs} input`).prop("disabled") ?
                $(`${inputs} input`).prop('disabled', false) :
                $(`${inputs} input`).prop('disabled',true)
    }

    toggleEdit('#emailEditBtn','#emailSaveBtn','#emailInputs');
    toggleEdit('#mobEditBtn','#mobSaveBtn','#mobInputs');
});





let arr = []

// document.getElementById("productForm").addEventListener("submit",(e)=>{
//     e.preventDefault()
//     let obj = {
//         title : document.getElementById("title").value,
//         img : document.getElementById("img").value,
//         price : document.getElementById("price").value
//     }
//     fetch("http://localhost:3000/product",{
//         method : 'POST',
//         headers :{
//             'Content-type' : 'application/json'
//         },
//         body : JSON.stringify(obj)
//     })
//     .then((res)=>res.json())
//     .then((res)=>{
//         console.log(res)
//     })
//     .catch((er)=>{
//         console.log(er)
//     })
// })

function fet(){
    fetch("https://mock-server-app-4tp9.onrender.com/product")
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        arr = res
       document.getElementById("data").innerHTML = view(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}



function view(arr){
    console.log(arr)
   return arr.map((el)=>{
    let dis= Math.floor(
        ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100)
        return `<div class="py-6" style="width: 30%;">
                            <article class="card">
                                <header class="card__thumb">
                                    <a href="single-product-page.html?id=${el.id}"><img
                                            src="${el.imageURL}" /></a>
                                </header>
                                <date class="card__date">
                                    <span class="card__date__day">${dis}%</span>
                                    <br />
                                    <span class="card__date__month">off</span>
                                </date>
                                <div class="card__body">
                                    <div class="card__category"><a href="#">"${el.category}"</a></div>
                                    <h2 class="card__title"><a href="#">${el.product}</a></h2>
                                    <div class="card__subtitle">&nbsp;&nbsp;₹${el.price}&nbsp;&nbsp; <span style="text-decoration:line-through; color:gray">
                                    ₹${el.strikedOffPrice}</span><br>
                                    <div class="my">
                                    <div class="rating">4.3&nbsp;<i class="fa-solid fa-star"></i></div>
                                    <span class="ra">(86,238 Ratings) (8,457 Reviews)</span>
                                    </div>
                                    <img class="flip" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"/>
                                    </div>
                                    <p class="card__description">${el.brand}</p>
                                </div>
                                
                                <footer class="card__footer">
                                    <span class="icon ion-clock">
                                    <span class="icon ion-chatbox"></span><a href="#"></a>
                                </footer>
                            </article>
                        </div>`
    }).join("")
}



fet()

// function del(i){

//     fetch(`http://localhost:3000/product/${i}`,{
//         method : 'DELETE',
//         headers :{
//             'Content-type' : 'application/json'
//         }
//     })
//     .then((res)=>res.json())
//     .then((res)=>{
//         console.log(res)
//     })
//     .catch((er)=>{
//         console.log(er)
//     })



// }

// function edit(i){
//     document.getElementById("update").style.display = "block"
//     fetch(`http://localhost:3000/product/${i}`)
//     .then((res)=>{
//         return res.json()
//     })
//     .then((res)=>{
         
//         document.getElementById("title").value = res.title
//         document.getElementById("price").value = res.price
//         document.getElementById("img").value = res.img
//         document.getElementById("update").addEventListener("click",()=>{
//             let obj = {
//                 title : document.getElementById("title").value,
//                 img : document.getElementById("img").value,
//                 price : document.getElementById("price").value
//             }
//             fetch(`http://localhost:3000/product/${res.id}`,{
//                 method : "PUT",
//                 headers : {
//                     'Content-Type' : "application/json"
//                 },
//                 body : JSON.stringify(obj)
//             })
//             .then((res)=>{
//                 return res.json()
//             })
//             .then((res)=>{
//                 console.log(res)
//             })
//         })
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }


// function single(id){
//     window.location.href = "singleProduct.html"
//     localStorage.setItem("id",JSON.stringify(id))
// }

document.getElementById("sort").addEventListener("change",()=>{
   console.log(document.getElementById("sort").value)
    if(document.getElementById("sort").value=="asc")
    {
        let low = arr.sort((a,b)=>+a.price - +b.price)
        document.getElementById("data").innerHTML = view(low )
    }
    else if(document.getElementById("sort").value=="desc")
    {
        let d = arr.sort((a,b)=>+b.price-+a.price)
        document.getElementById("data").innerHTML = view(d)
    }
})