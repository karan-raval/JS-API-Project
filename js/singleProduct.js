async function view(){
  let d = new URLSearchParams(window.location.search)
  let id = d.get("id")
  
   let data = await fetch(`https://mock-server-app-4tp9.onrender.com/product/${id}`)
   let dee = await data.json()
   document.getElementById("data").innerHTML = v(dee)
   document.getElementById("to").innerHTML = color(dee)
   document.getElementById("all-btns").innerHTML = btnss(dee)
}

view()

function btnss(el)
{
  return` <a href="cart.html?id=${el.id}" class="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow"><button type="submit">
                        <span class="material-icons">shopping_cart</span>
                        ADD TO CART
                    </button></a>
                    <button class="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow" type="submit" onclick="post('${el.id}')">
                        <span class="material-icons">flash_on</span>
                        BUY NOW
                    </button>`
}





function v(el){
   
  let dis= Math.floor(
    ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100)
  document.getElementById("price").innerHTML ="₹"+el.price; 
  document.getElementById("noprice").innerHTML ="₹"+el.strikedOffPrice; 
  document.getElementById("tit").innerHTML =el.product; 
  document.getElementById("diss").innerHTML =dis+"% off"; 
        return `
          <img class="w-full h-full object-contain zoomimg" src="${el.imageURL}"alt="">`
}
function a()
{
  window.location.href="cart.html"
}
function color(el)
{
  return`<li class="w-14 h-14 border cursor-pointer"><img class="w-full h-full object-contain" src="${el.imageURL}" alt=""></li>
                    <li class="w-14 h-14 border cursor-pointer"><img class="w-full h-full object-contain" src="${el.imageURL}" alt=""></li>
                    <li class="w-14 h-14 border cursor-pointer"><img class="w-full h-full object-contain" src="${el.imageURL}" alt=""></li>`
}
let cart;



async function post(el){
  let count = 0
  let d = await fetch(`https://mock-server-app-4tp9.onrender.com/cart`)
  let s = await d.json()
  
  s.forEach(element => {
     if(element.id == el){
       count++
     }
  });
  // console.log(count)

  if(count>0){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Product Is Alredy In Cart"
    });
  }else{
 fetch(`https://mock-server-app-4tp9.onrender.com/product/${el}`)
  .then((res)=>{
    return res.json()
  })
  .then((res)=>{
    fetch("https://mock-server-app-4tp9.onrender.com/cart",{
        method : 'POST',
        headers :{
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(res)
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
    })
    .catch((er)=>{
        console.log(er)
    })
  })
}
}