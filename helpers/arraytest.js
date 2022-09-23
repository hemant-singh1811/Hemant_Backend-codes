
let arr = [
    {
        DuserId: '98765',
        Dpassword: '12345'
    },
    {
        DuserId: '12345',
        Dpassword: '98765'
    }
]

async function check() {

    arr.forEach(element => {

        console.log(element.Dpassword);

    });

}

check()