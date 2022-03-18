const readline = require('readline')
const { stdin: input, stdout: output } = require('process');
const { userInfo } = require('os');
const rl = readline.createInterface({ input, output });


const userData = [
    {
        name: "Prajakta",
        amount: 1000,
        place:"Jalgaon",
        phone:"56541458"
    },
    {
        name: "Bhagyashri",
        amount: 2000,
        place:"Jalgaon",
        phone:"52415435"

    },
    {
        name: "Snehal",
        amount: 1000,
        place:"Jalgaon",
        phone:"42514253"
    },
    {
        name: "Jay",
        amount: 800,
        place:"Jalgaon",
        phone:"415784658"
    },
]

const services = ["user", "create account"];

const userInfos = (user) => {
    rl.question('please provide Username \n ', username => {
        user(username)
    })
}

const debit=(userPersonalInfo)=>{
    rl.question("please write amount to Debit  \n", (deb) => {
          
        if (deb > userPersonalInfo[0].amount) {
            console.log("\n not sufficient balance!! \n")
            debit(userPersonalInfo)

        }
        else
        {userPersonalInfo[0].amount=userPersonalInfo[0].amount -deb;
            
            console.log(`\n amout of Rs ${deb} is debited from your account \n remaining balance : Rs ${userPersonalInfo[0].amount}
            \n `)
            console.table(userPersonalInfo)
            console.log("\n Thank for visiting state Bank \n ")
            rl.close()
        }

    })
}

const credit=(userPersonalInfo)=>{
    rl.question("enter amount to be credited \n",(amt)=>
    {
        userPersonalInfo[0].amount=userPersonalInfo[0].amount + Number(amt);
        console.log(`\n amout of Rs ${amt} is credited into your account \n new  balance : Rs ${userPersonalInfo[0].amount}
        \n`)
        console.table(userPersonalInfo)
        
        console.log("\n Thank for visiting state Bank \n ")
        rl.close()
    })
    
}

const debcred = (userPersonalInfo) => {
    (() => {
        console.table(userPersonalInfo)
        rl.question("do you want to Debit/Credit amount y/n \n",
            answer => {
                if (answer == 'y') {
                    rl.question("1 for Debit , 2 for credit \n", answer => {
                        if (answer == 1) {
                            debit(userPersonalInfo)
                            
                        }
                        else if (answer == 2) {
                            credit(userPersonalInfo)
                        }
                        else {
                            console.log("please select correct option !! \n")
                            debcred(userPersonalInfo)
                        }
                    })
                }
                else
                    rl.close()
            })
    })()
}


const createUser=(usr)=>{
    rl.question("What is your name \n",(nam)=>{
        rl.question("Initial amount you want to add \n",(cred)=>{
            rl.question("Where do you live? \n",(place)=>{
                rl.question("What is your phone number \n",(phone)=>{
                    let data={"name":nam,"amount":Number(cred),"place":place,"phone":phone}
                    usr(data)
                })
            })
        })
    })
}

const bankServices = () => {
    console.table(services)
    rl.question("WElCOME TO STATE BANK !!! \n  please Choose from  the above Services ", (ser) => {
        if (ser == 0) {
            userInfos(user => {
                const userPersonalInfo = userData.filter(item => {
                    return item.name == user;
                })

               if(userPersonalInfo.length >= 1){
                debcred(userPersonalInfo)

               }
                   else{
                    console.log("user not found \n")
                    rl.close();
                   }
            })


        }
        else if (ser == 1) {
            createUser(usr=>
                {userData.push(usr)
                console.log("\n \n user has been added \n \n ")
                    console.table(userData)
                console.log("thaks for visiting state bank")
                rl.close()})
                
        } else {
            console.log("please choose correct option \n")
            bankServices();
        }

    })

}

const stateBank = () => {


    bankServices()

}

stateBank();