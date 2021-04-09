(function () {
  let ready = false
  let imagesLoaded = 0
  let totalImages = 0
  let photosArray = []

  const ElimageContainer = document.getElementById('image-container')
  const Elloader = document.getElementById('loader')

  let count = 30
  const apiKey =
    "57aeced2e945f6e95075a229fb6051a9d904954dc321338e1b759630b9b39a64"
  let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

  async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json()

      displayPhotos()
    } catch (error) {
        console.log(error)
    }
  }

  function imageLoaded() {
    imagesLoaded++
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages) {
      ready = true
      Elloader.hidden = true
      count = 30
      apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

    }
  }

  function setAttributes(element, attributes) {

    for (const key in attributes) {
      element.setAttribute(key, attributes[key])
    }
  }

  function templateDisplay(photo) {
    
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded)

    item.appendChild(img);
    ElimageContainer.appendChild(item);
  }

  function displayPhotos() {
    totalImages = photosArray.length 
    console.log('totalImages', totalImages);
    photosArray.forEach(templateDisplay)
  }

  window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
  });
  
  getPhotos();
})();
