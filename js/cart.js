let arr = []
let ary = []
async function view(arr) {
    let d = new URLSearchParams(window.location.search)
    let id = d.get("id")

    let data = await fetch(`https://mock-server-app-4tp9.onrender.com/cart`)
    let dee = await data.json()
    document.getElementById("data").innerHTML = v(dee)
    document.getElementById("place").innerHTML=btns(dee)
    arr = dee
    ary = dee
}

function btns(el)
{
    return`<button onclick="del(${el.id})" class="w-full sm:w-auto px-16 py-3 font-medium text-white bg-primary-orange shadow rounded-sm">PLACE
                        ORDER</button>`
}
     

    function del(el){``
    ary.forEach((el)=>{
           fetch(`https://mock-server-app-4tp9.onrender.com/cart/${el.id}`,{
            method : 'DELETE',
            headers :{
                'Content-type' : 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            ary = []
    document.getElementById("data").innerHTML = v(ary)
        })
        .catch((er)=>{
            console.log(er)
        })
    
    })
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
        icon: "success",
        title: "Thank You For Shopping"
      });
    setTimeout(()=>{
        window.location.href="index.html"
    },2000)
    }


view()
let cart = 0;
let total = 0;
let disscount = 0;
let maintotal;

function v(arr) {
    // console.log(arr);
    cart = arr.length;
    // console.log(cart);
    document.getElementById("carrt").innerText = cart;
    return arr.map((el) => {
        total += +el.price
        // console.log(total);

        document.getElementById("maintotal").innerText = "₹" + total;
        disscount = 0.10 * total;
        document.getElementById("dissco").innerText = "₹" + Math.round(disscount);
        maintotal = total - disscount;
        document.getElementById("total").innerText = "₹" + Math.round(maintotal);
        document.getElementById("line").innerText = `You will save ₹${Math.round(disscount)} on this order`


        let dis = Math.floor(
            ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100)
        return `<div class="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden">
                    <div class="flex flex-col sm:flex-row gap-5 items-stretch w-full" href="#">
                        <div class="w-full sm:w-1/6 h-28 flex-shrink-0 sm:flex-shrink">
                            <img class="h-full w-full object-contain" src="${el.imageURL}" alt="">
                        </div>
                        <div class="flex flex-col sm:gap-5 w-full p-1 pr-6">
                            <!-- product title -->
                            <div class="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
                                <div class="flex flex-col gap-0.5 w-11/12 sm:w-3/5">
                                    <p class="truncate">${el.product}</p>
                                    <span class="text-sm text-gray-500">${el.brand}</span>
                                </div>
                                <div class="flex flex-col sm:gap-2">
                                    <p class="text-sm">Delivery by Mon Sep 27 | <span class="text-primary-green">Free</span> <span class="line-through">₹40</span></p>
                                    <span class="text-xs text-gray-500">7 Days Replacement Policy</span>
                                </div>
                            </div>
                            <div class="flex items-baseline gap-2 text-xl font-medium">
                                <span>₹${el.price}</span>
                                <span class="text-sm text-gray-500 line-through font-normal">₹${el.strikedOffPrice}</span>
                                <span class="text-sm text-primary-green">${dis}%&nbsp;off</span>
                            </div>
                        </div>
                    </div>
                </div>`
    }).join("")
}