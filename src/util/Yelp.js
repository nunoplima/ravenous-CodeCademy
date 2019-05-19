let Yelp = {
  apiKey: "UEJyjSpuLD9XHz9klpgBCoz6W0ueaTcaJDDv0YDvZ7-nBHczxqXN1ECDF4ZQNtNpJHkhlG_fvS25z5K7BEEDEzmTvPFMqCtoGLM0HCzQBi_OQYejK0Ul-ftt3VzgXHYx",
  url: "https://api.yelp.com/v3/businesses/search?",
  CORS: "https://cors-anywhere.herokuapp.com/",

  search(term, location, sortBy) {
    let params = `term=${term}&location=${location}&sort_by=${sortBy}&limit=6`;
    return fetch(this.CORS + this.url + params, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.hasOwnProperty("businesses")) {
        return jsonResponse.businesses.map((business) => {
          return {
            url: business.url,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude,
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.price,
            rating: business.rating,
            reviewCount: business.review_count
          }
        })
      } 
    });
  }
};

export default Yelp;