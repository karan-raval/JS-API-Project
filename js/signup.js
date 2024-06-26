

document.getElementById("signupForm").addEventListener("submit",(e)=>{
    e.preventDefault()

    let obj = {
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        pass : document.getElementById("password").value
    }
    console.log(obj.email)
    fetch(`https://mock-server-app-4tp9.onrender.com/user?email=${obj.email}`)
    .then((res)=>res.json())
    .then((res)=>{
        if(res.length>0){
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
                title: "User Is Already Registered"
              });
        }else{
            fetch("https://mock-server-app-4tp9.onrender.com/user",{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(obj)
            })
            .then((res)=>res.json())
            .then((res)=>{
                if(res){
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
                        title: "Signed in successfully"
                      });
                    setTimeout(()=>{
                        window.location.href = "login.html"
                    },2000)
                }
            })
        }
    })
})