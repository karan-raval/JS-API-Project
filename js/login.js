document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault()

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let d=await fetch("https://mock-server-app-4tp9.onrender.com/user",)
    let data=await d.json()
    let val=data.filter((el)=>el.email==email)
    if(val.length==0)
        {
            swal("You Have to Login First", "Invalid Email", "error")
            setTimeout(()=>{
                 window.location.href="signup.html"
            },3000)
        }else{
            if(val[0].pass==pass){
                
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
                    title: "Login in successfully"
                  });
                setTimeout(()=>{
                    window.location.href = "index.html"
                },500)
            }else{
                sweetAlert("Oops...", "Wrong password!", "error");
            }
        }
})