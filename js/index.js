let productData = []

/**Product List container*/
let productListHTML = ""
let productListEl = document.getElementById("product-List")

/**fetch product data*/
async function fetchData(){
    const res = await fetch("/database/productData.json")
    const data = await res.json()
    productData= data
    await data.forEach(element => {
        // console.log(element)
        productListHTML += ` 
        <div class="product-card" id=${element.id}>
                <div class="product-image">
                    <img src="${element.image}" />
                </div>
                <div class="product-desc">
                    <div class="product-catogory">
                       ${element.category}
                    </div>
                    <div class="product-price-addCart">
                        <p class="product-price">$${element.price}</p>
                        <div class="icon" >
                            <i class="fa-solid fa-heart" data-cart=${element.id}></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    productListEl.innerHTML = productListHTML
    // console.log(productListHTML) 
    return data
}
fetchData()



/************************
        cart secton
****************************/
const cartCloseBtnEl = document.getElementById("cart-close-btn")
const cartIdEl = document.getElementById("cartId")
const cartIdDisplayBtn = document.getElementById("cartIdDisplayBtn")

cartCloseBtnEl.addEventListener("click",()=>{
    cartIdEl.classList.add("card-hidden")
    cartIdDisplayBtn.classList.remove("active")
})

cartIdDisplayBtn.addEventListener("click",()=>{
    cartIdEl.classList.toggle("card-hidden")
    cartIdDisplayBtn.classList.toggle("active")
})

const cartArray = []



document.addEventListener("click",(e)=>{
    const cartId = e.target.dataset.cart

    if(cartId){
        console.log(cartId)
        const addCartProduct = productData.filter(el => el.id == cartId)[0]
        const ProductNumber = {
                ...addCartProduct,
                cartQuantity : 1,
                totalPrice : addCartProduct.price
        }
        if(!cartArray.some(el => el.id == cartId)){
            cartArray.push(ProductNumber)
        }   
    }

    const incrementQty = e.target.dataset.qtyinc
    const decrementQty = e.target.dataset.qtydec
    if(incrementQty){
        const index = cartArray.findIndex(el => el.id == incrementQty)
        // console.log(index)
        let newQty = cartArray[index].cartQuantity
        newQty++
        cartArray[index].cartQuantity = newQty

        //total price
        let newtotalPrice = cartArray[index].price * newQty
        cartArray[index].totalPrice = newtotalPrice.toFixed(2)


    }
    if(decrementQty){
        const index = cartArray.findIndex(el => el.id == decrementQty)
        // console.log(index)
        let newQty = cartArray[index].cartQuantity
        
        if(newQty > 1){
            newQty--
            cartArray[index].cartQuantity = newQty

            //total price
        let newtotalPrice = cartArray[index].price * newQty
        cartArray[index].totalPrice = newtotalPrice.toFixed(2)
        }

        
    }

    //render cart 
    addCartProductfunction()
    //render number of product inset in the add
    document.getElementById("numberofCartId").textContent = cartArray.length
    //total price
    const totalPrice = cartArray.reduce((acc,curr) => acc + parseFloat(curr.totalPrice),0)
    document.getElementById("cart-total-paymentId").textContent = totalPrice.toFixed(2)
    //total qty
    const totalQty =cartArray.reduce((acc,curr) => acc + parseFloat(curr.cartQuantity),0)
    document.getElementById("cart-qty-qtyId").textContent = totalQty
    

    //display if some product available in cart
    if(cartArray[0]){
        document.getElementById("productTotalQty-TotalPrice").style.display = "block"
    }else{
        document.getElementById("productTotalQty-TotalPrice").style.display = "none"
    }
})

let cartProductBodyID = document.getElementById("cart-product-bodyID")


function  addCartProductfunction(){
    let cartProductListHTML ="" ;
    cartArray.forEach(el => {
        cartProductListHTML += `
                <div class="cart-product">
                        <div class="cart-product-left">
                            <img src="${el.image}"/>
                        </div>
                        <div class="cart-product-right">
                            <h3>${el.category}</h3>
                            <p>${el.price}</p>
                            <div class="cart-product-quantiy-totalPrice-container">
                                <div class="cart-product-quantiy">
                                    <div class="cart-product-minus" data-qtydec=${el.id}>-</div>
                                    <div class="cart-product-num">${el.cartQuantity}</div>
                                    <div class="cart-product-plus" data-qtyinc=${el.id}>+</div>
                                </div>
                                    
                                <div >
                                    Total : <span id="totalqtyPrice">${el.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
        
        `
    })
    // console.log(cartProductListHTML)
    cartProductBodyID.innerHTML = cartProductListHTML
}
addCartProductfunction()


