import _ from "lodash";
import moment from "moment";
import localStorage from "local-storage";
import fakecc from 'fake_credit_card';
import { 
    isValid, 
    isExpirationDateValid, 
    isSecurityCodeValid, 
    getCreditCardNameByNumber 
} from 'credit-card';
const random = require('random-name');

// ###############################################
// index.html
console.log('index.html')
const a = document.getElementById('#sign-unknown');
if (a) {
    a.addEventListener('click',function(e){
        let firstName = random.first();
        let lastName = random.last();
        console.log('First name - ' + firstName);
        console.log('Last name - ' + lastName);
        console.log('random name printed');
        
        const val = {'firstName': firstName,
                    'lastName': lastName,
                    'password': null,
                    'anonymous': true}
        localStorage.setItem('user1', JSON.stringify(val));
        const reconstructed_val2 = JSON.parse(localStorage.getItem('data'));
        console.log(reconstructed_val2);

        window.location.href = a.href;
        
    })
}



// ###############################################
// sign-up.html


// sign-in.html
// read local storage




// ###############################################
// home.html
// notice board
const myColor = document.getElementById("notice");
if (myColor) {
    setInterval(function() {
        let className = myColor.getAttribute("class");
        if (className === "color1") {
        myColor.setAttribute("class","color2");
        } else {
        myColor.setAttribute("class","color1");
        }
    }, 1000);
};
// close notice
let myNotice = document.getElementById("notice");
if (myNotice){
    myNotice.addEventListener("click", (event)=>{
        console.log('notice clicked')
        console.log("target id:", event.target.id);
        if (event.target.id === "close"){
            console.log(myNotice);
            myNotice.style.display = "none";
        };
    });
};

// #####################################################
// ########       add minus cart-icon         ##########
let cartQuantity = document.getElementById("num-items");
let ringfitNum = document.getElementById("ringfit-num");
let switchNum = document.getElementById("switch-num");

// switch
const addbtn_switch = document.getElementById("switch-add");
if (addbtn_switch) {
    addbtn_switch.addEventListener("click",()=>{
        let x = parseInt(ringfitNum.textContent);
        let y = parseInt(switchNum.textContent);
        y++;
        switchNum.textContent = y
        console.log("switchNum",y);
        cartQuantity.innerText =  x + y;
        // total.innerText = calculateTotal(x, y);
    })
}


const minusbtn_switch = document.getElementById("switch-minus");
if (minusbtn_switch) {
    minusbtn_switch.addEventListener("click",()=>{
        let x = parseInt(ringfitNum.textContent);
        let y = parseInt(switchNum.textContent);
        if (y >= 1) {
            y--;
            switchNum.textContent = y;
        } else {
            switchNum.textContent = 0;
        };

        cartQuantity.innerText =  x + y;
        // total.innerText = calculateTotal(x, y);
    });
};


// ringfit
const addbtn_ringfit = document.getElementById("ringfit-add");
if (addbtn_ringfit) {
    addbtn_ringfit.addEventListener("click", () => {
        let x = parseInt(ringfitNum.innerHTML);
        let y = parseInt(switchNum.innerHTML);
        x++;
        ringfitNum.innerHTML = x;
        console.log("ringfitNum",x);
        cartQuantity.innerText =  x + y;
        // total.innerText = calculateTotal(x, y);
    });
};

const minusbtn_ringfit = document.getElementById("ringfit-minus");
if (minusbtn_ringfit) {
    minusbtn_ringfit.addEventListener("click", ()=>{
        let x = parseInt(ringfitNum.textContent);
        let y = parseInt(switchNum.textContent);
        if (x >= 1) {
            x--;
            ringfitNum.innerHTML = x;
        } else {
            ringfitNum.innerHTML = 0;
        };
        cartQuantity.innerText =  x + y;
        // total.innerText = calculateTotal(x, y);
    });
};


// ###################################################
// cart-page
let total = document.getElementById("total");
function calculateTotal(a,price1,b,price2) {
    return "Total: $" + Math.round(a*price1 + b*price2);
// return "$" + Math.round(a*78.80 + b*298.80);
};
// should get cart items from local storage !!!!!!!
// here is a test
if (cartQuantity==0) {
    let emptyCart = document.createElement('div');
    emptyCart.innerHTML = 'You don\'t have any items in your cart.';
    emptyCart.style.color = '#707070';
    emptyCart.style.fontSize = '30px';
    emptyCart.style.textAlign = 'center';
    document.getElementById('cart').appendChild(emptyCart);
} else {
    console.log('you should print items from local storage');
    // let yourCart = document.createElement()
}



// check out -> card
// ###################################################
// card-generator
let card = fakecc.flag(fakecc.flags.VISA).withCvv[0];
let number = card.number;
let expiration = card.expiration;
let cvv = card.cvv;

// // const nameDefault = document.getElementById('user').innerHTML;
// const name = document.getElementById('cardholder').innerHTML;
// name.addEventListener('input', function () {
//     if (name.value.length == 0) {
//         document.getElementById('cardname').innerHTML = nameDefault;
//     } else {
//         document.getElementById('cardname').innerHTML = this.value;
//     }
// });


// ############################################
// card-validator
// var validation = CreditCard.validate(card);

