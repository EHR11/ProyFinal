let params = new URLSearchParams(location.search)

updateItems()

function newPage(url){
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML=""
    fetch(url).then( rsp=>rsp.json()).then(data=>{
        console.log(data);
        data.payload.forEach(product=>{
            let productCard=`
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${product.thumbnails[0]}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><a href='javascript:void(0);' onclick='showProduct("${product._id})"'>${product.title}</a></h5>
                        <p class="card-text">${product.price}</p>
                        <a href='javascript:void(0);' onclick='addToCart("${cart}","${product._id}")' class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            `
            productContainer.innerHTML += productCard;
        })
        const paginationContainer = document.getElementById('page-container');
        paginationContainer.innerHTML = `
            <a href='javascript:void(0);' onclick='newPage(\`${data.prevLink||""}\`)'>${data.prevPage||""}</a>
            <p>${data.page}</p>
            <a href='javascript:void(0);' onclick='newPage(\`${data.nextLink||""}\`)'>${data.nextPage||""}</a>
        `;
    })
}

function showProduct(pid){
    let url=`/product/${pid}`
    window.location.href = url;
}

function showCart(){
    let url=`/cart/${cart}`
    window.location.href = url;
}

async function addToCart(pid){
        await fetch(`/carts/${cart}`,{
            method:"PUT",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({pid:pid,quantity:1})
        }).then( rsp=>rsp.json()).then(data=>{
            console.log(data);
            updateItems()
        })
}

function newFilter(){
    const category=document.getElementById("category").value
    const status=document.getElementById("inStock").checked.toString()
    const order=document.getElementById("order").value
    const asc=document.getElementById("asc").value
    console.log({category, inStock, order, asc});
    const query={
        category,
        status
    }
    const url=`/?limit=12&page=1&sort={"${order}":${asc}}&query=${JSON.stringify(query)}`
    console.log(url);
    document.location=url
}


async function updateItems(){
    const itemNumber=document.getElementById("itemsInCart")
    let cartObj={}
    await fetch("/carts/"+cart).then( rsp=>rsp.json()).then(data=>{
        cartObj=data.payload
    })    
    let itemsInCart=0
    cartObj.productsInCart.forEach(product=>{
        itemsInCart+=product.quantity
    })
    itemNumber.innerHTML=itemsInCart
}
