

const obj1 = {
    name:"Raju",
    sname:"Maurya",
    method: ()=> {
        let a = 10
        let b = 20
        console.log(a+b)
        console.log(this)
    }
}

obj1.method()