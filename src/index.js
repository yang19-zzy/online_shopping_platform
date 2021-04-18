import _ from "lodash";
import fakecc from 'fake_credit_card';
import { 
    isValid, 
    isExpirationDateValid, 
    isSecurityCodeValid, 
    getCreditCardNameByNumber 
} from 'credit-card';
const random = require('random-name');

let currentLocation = window.location.href.split('/');
let currentPage = currentLocation[currentLocation.length-1];
console.log(currentPage);
// ###############################################
// index.html

if (currentPage=="" || currentPage=='index.html'){
    const anomymousBtn = document.getElementById('sign-unknown');
    anomymousBtn.addEventListener('click',function(e){
    let firstName = random.first();
    let lastName = random.last();
    console.log('First name - ' + firstName);
    console.log('Last name - ' + lastName);
    console.log('random name printed');
    let accountName = firstName + lastName;
    
    const data = {'username': null,
                'firstName': firstName,
                'lastName': lastName,
                'password': null,
                'anonymous': true,
                'cart': null,
                'address': null
                }
    localStorage.setItem(accountName, JSON.stringify(data));
    localStorage.setItem('accountName',accountName);
    const reconstructed_val2 = JSON.parse(localStorage.getItem(accountName));
    console.log(reconstructed_val2.firstName);
    
    window.location.href = document.getElementById('redirect').href;
    
    })

} else if (currentPage == 'sign-up.html') {
    // ###############################################
    // sign-up.html
    const signUpBtn = document.getElementById('btn-sign-up');
    signUpBtn.addEventListener('click', function(e){
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let password2 = document.getElementById('password2').value;
        console.log(password);
        console.log(password2);
        if (password === password2) {
            const data = {
                'username': username,
                'firstName': null,
                'lastName': null,
                'password': password,
                'anonymous': false,
                'cart': null,
                'address': null
            };
            localStorage.setItem(username, JSON.stringify(data));
            localStorage.setItem('accountName', username);
            window.alert('Singed up successfully!');
            window.location.href = document.getElementById('redirect').href;
        } else {
            window.alert('Please check your passward!')
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password2').value = '';
        }
    })
    
} else if (currentPage == 'sign-in.html') {
    // sign-in.html
    // read local storage (did at the top of the file)
    const signInBtn = document.getElementById('btn-sign-in');
    console.log(signInBtn);
    const checkPasswordUsername=()=>{
        window.alert('Please check your passward or username!')
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
    signInBtn.addEventListener('click', function(e){
        let username = document.getElementById('username').value;
        console.log(username);
        let password = document.getElementById('password').value;
        let accountData = JSON.parse(localStorage.getItem(username));
        if (accountData){
            let passwardCheck = accountData.password;
            let usernameCheck = accountData.username;
            console.log(passwardCheck);
            console.log(usernameCheck);
            if (passwardCheck == password && usernameCheck==username) {
                localStorage.setItem('accountName', username);
                window.alert('Singed in successfully!');
                window.location.href = document.getElementById('redirect').href;
            } else {
                checkPasswordUsername();
            }
        } else {
            window.alert('No account found! Please sign up first!')
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            window.location.href = document.getElementById('redirect-2').href;
        }

    })


} else if(currentPage == 'home.html') {
    // ###############################################
    // home.html
    // notice board
    const myColor = document.getElementById("notice");
    setInterval(function() {
        let className = myColor.getAttribute("class");
        if (className === "color1") {
        myColor.setAttribute("class","color2");
        } else {
        myColor.setAttribute("class","color1");
        }
    }, 1000);
    
    // close notice
    let myNotice = document.getElementById("notice");
    myNotice.addEventListener("click", (event)=>{
        console.log('notice clicked')
        console.log("target id:", event.target.id);
        if (event.target.id === "close"){
            console.log(myNotice);
            myNotice.style.display = "none";
        };
    });
    
    // #####################################################
    // ########       add minus cart-icon         ##########
    function calculateTotal(a,price1,b,price2) {
        return a*price1 + b*price2;
    }
    function getItemDescription(id){
        let itemDescription = {};
        const item = document.getElementById(id);
        itemDescription['img'] = item.children[0].outerHTML
        itemDescription['name'] = item.children[1].outerHTML
        itemDescription['price'] = item.children[2].outerHTML
        return itemDescription;
    }
    function getRidOffDollarSign(myPrice){
        return myPrice.replace('$','');
    }
    function cartUpdate(){
        total = calculateTotal(y, parseFloat(priceSwitch), x, parseFloat(priceRingfit));
        currentCart.cartQuantity = x + y;
        currentCart.switch.quantity = y;
        currentCart.ringfit.quantity = x;
        currentCart.total = total;
    }

    let cartQuantity = document.getElementById("num-items");
    let ringfitNum = document.getElementById("ringfit-num");
    let switchNum = document.getElementById("switch-num");
    
    const itemSwitch = getItemDescription('switch');
    const itemRingfit = getItemDescription('fit-ring');
    
    const priceSwitchDollar = document.getElementById('switch').children[2].innerText;
    const priceRingfitDollar = document.getElementById('fit-ring').children[2].innerText;
    console.log(priceRingfitDollar);
    const priceSwitch = parseFloat(getRidOffDollarSign(priceSwitchDollar));
    const priceRingfit = parseFloat(getRidOffDollarSign(priceRingfitDollar));
    
    let x = parseInt(ringfitNum.textContent);
    let y = parseInt(switchNum.textContent);
    console.log(x);
    let total = calculateTotal(y, parseFloat(priceSwitch), x, parseFloat(priceRingfit));

    let currentCart = {
        'cartQuantity': parseInt(cartQuantity.innerText),
        'switch':{
                'description': itemSwitch,
                'quantity':y
            },
        'ringfit':{
                'description': itemRingfit,
                'quantity':x
            },
        'total': total
    }
    console.log(currentCart);

            
    // switch
    const addbtn_switch = document.getElementById("switch-add");
    addbtn_switch.addEventListener("click",()=>{
        y++;
        switchNum.textContent = y
        console.log("switchNum",y);
        cartQuantity.innerText =  x + y;
        cartUpdate();
    })
    
    const minusbtn_switch = document.getElementById("switch-minus");
    minusbtn_switch.addEventListener("click",()=>{
        if (y >= 1) {
            y--;
            switchNum.textContent = y;
        } else {
            switchNum.textContent = 0;
        };

        cartQuantity.innerText =  x + y;
        cartUpdate();
    })

    // ringfit
    const addbtn_ringfit = document.getElementById("ringfit-add");
    addbtn_ringfit.addEventListener("click", () => {
        x++;
        ringfitNum.innerHTML = x;
        console.log("ringfitNum",x);
        cartQuantity.innerText =  x + y;
        cartUpdate();
    })

    const minusbtn_ringfit = document.getElementById("ringfit-minus");
    minusbtn_ringfit.addEventListener("click", ()=>{
        if (x >= 1) {
            x--;
            ringfitNum.innerHTML = x;
        } else {
            ringfitNum.innerHTML = 0;
        };
        cartQuantity.innerText =  x + y;
        cartUpdate();
    })

    // click on cart to save your items
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', function(e){
        let currentUser = localStorage.getItem('accountName');
        console.log(currentUser);
        let accountData = JSON.parse(localStorage.getItem(currentUser));
        accountData.cart = currentCart;
        localStorage.setItem(userName, JSON.stringify(data));
        window.location.href = document.getElementById('redirect-3').href;

    })



} else if (currentPage == 'cart.html') {
    // ###################################################
    function appendItems(itemStr) {
        let itemDescription = cartItems[itemStr];
        if (itemDescription.quantity !== 0) {
            let myItem = document.createElement('div');
            myItem.setAttribute('class','item');
            
            let itemImg = document.createElement(null);
            let itemName = document.createElement(null);
            let itemPrice = document.createElement(null);
            let itemQuantity = document.createElement('div');
            itemImg.innerHTML = itemDescription.description.img;
            itemName.innerHTML = itemDescription.description.name;
            itemPrice.innerHTML = itemDescription.description.price;
            itemQuantity.innerHTML = 'Quantity: ' + itemDescription.quantity.toString();

            myItem.appendChild(itemImg);
            myItem.appendChild(itemName);
            myItem.appendChild(itemPrice);
            myItem.appendChild(itemQuantity);
            
            cartSection.appendChild(myItem);
        }
    }
    
    // cart-page
    let currentUser = localStorage.getItem('accountName');
    console.log(currentUser);
    const accountData = JSON.parse(localStorage.getItem(currentUser));
    const cartItems = accountData.cart;
    console.log(cartItems);

    let cartSection = document.getElementById('cart');
    let totalSection = document.getElementById('total');

    if (cartItems.cartQuantity==0) {
        let emptyCart = document.createElement('h1');
        emptyCart.innerHTML = 'You don\'t have any items in your cart.';
        cartSection.appendChild(emptyCart);
    } else {
        console.log('you should print items from local storage');        
        appendItems('switch');
        appendItems('ringfit');

        // present total price
        let totalPrice = document.createElement('h1');
        totalPrice.innerHTML = 'Total price: $' + cartItems.total.toString();

        totalSection.appendChild(totalPrice);
    }

    // click on Go Check Out btn
    const payBtn = document.getElementById('pay');
    payBtn.addEventListener('click', function(e){
        window.location.href = document.getElementById('redirect-4').href;
    })

} else if (currentPage == 'pay.html') {
    // check out
    let currentUser = localStorage.getItem('accountName');
    console.log(currentUser);
    let accountData = JSON.parse(localStorage.getItem(currentUser));

    // card info generator
    let card = fakecc.flag(fakecc.flags.VISA).withCvv[0];
    console.log(card);

    // fake name generator
    let fakeFirst = random.first();
    let fakeLast = random.last();
    accountData.firstName = fakeFirst;
    accountData.lastName = fakeLast;
    

    // if clicked on auto fill
    const autoFill = document.getElementById('auto-fill');
    autoFill.addEventListener('click',function(e){
        let firstname = document.getElementById('firstname');
        let lastname = document.getElementById('lastname');
        let address = document.getElementById('address');
        let city = document.getElementById('city');
        let state = document.getElementById('state');
        let phone = document.getElementById('phone');
        let zip = document.getElementById('zip');

        firstname.children[1].setAttribute('value', fakeFirst);
        lastname.children[1].setAttribute('value',fakeLast);
        address.children[1].setAttribute('value','School of Information');
        city.children[1].setAttribute('value', 'Ann Arbor');
        state.children[1].setAttribute('value','MI');
        phone.children[1].setAttribute('value','(734)***-****');
        zip.children[1].setAttribute('value','48109');

        let cardNumber = document.getElementById('card-number');
        let cardCvv = document.getElementById('card-cvv');
        let cardHolder = document.getElementById('cardholder');
        let cardExp = document.getElementById('card-expiration');

        cardNumber.children[1].setAttribute('value', card.number);
        cardCvv.children[1].setAttribute('value', card.cvv);
        cardHolder.children[1].setAttribute('value', fakeFirst + ' ' + fakeLast);
        cardExp.children[1].setAttribute('value',card.expiration);
    })

    // click on pay
    const payBtn = document.getElementById('pay');
    payBtn.addEventListener('click',function(){
        accountData['payment'] = 'complete';
        console.log(accountData);
        localStorage.setItem(currentUser,JSON.stringify(accountData));
        window.alert('Order Complete!');
    })

    // ############################################
    // card-validator
    // var validation = CreditCard.validate(card);


} else {
    console.log('Error!');
    window.alert('Error!')
}






