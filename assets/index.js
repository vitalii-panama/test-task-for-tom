import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

const getDefaultRequestConfig = () => {
    return JSON.parse(
      JSON.stringify({
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;'
        }
      })
    );
}
const cartAdd = async e => {
    console.log('adding to cart')
    const id = e.target.closest('.product').getAttribute('data-id')
    if (!id) return
    const config = getDefaultRequestConfig();
  
    config.method = 'POST';
    config.body = JSON.stringify({
      id: id,
      quantity: 1
    });
    const postToCart = await fetch('/cart/add.js', config)
    if (!postToCart.ok) return
    console.log('added to cart')
    const cart = await fetch('/cart.js')
    const cartData = await cart.json()
    console.log(cartData)
}
const initCardSlider = () => {
    const el = document.querySelector('.js-slider-cards')
    new Swiper(el, {
        slidesPerView: 1,
        breakpoints: {
            900: {
              slidesPerView: 4
            }
        }
    })
}
const initProductSlider = () => {
    const el = document.querySelector('.js-slider-products')
    new Swiper(el, {
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.product-slider-next',
            prevEl: '.product-slider-prev',
        },
        breakpoints: {
            900: {
              slidesPerView: 3
            }
        }
    })
}
initCardSlider()
initProductSlider()
window.cartAdd = cartAdd