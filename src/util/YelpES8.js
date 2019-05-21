let Yelp = {
  yelpKey: "UEJyjSpuLD9XHz9klpgBCoz6W0ueaTcaJDDv0YDvZ7-nBHczxqXN1ECDF4ZQNtNpJHkhlG_fvS25z5K7BEEDEzmTvPFMqCtoGLM0HCzQBi_OQYejK0Ul-ftt3VzgXHYx",
  url: "https://api.yelp.com/v3/businesses/search?",
  CORS: "https://cors-anywhere.herokuapp.com/",

  async search(term, location, sortBy) {
    console.log(`Querying Yelp with: term -> ${term}, location -> ${location} and sort -> ${sortBy}`);
    let params = `term=${term}&location=${location}&sort_by=${sortBy}`;
    let headers = {headers: {"Authorization": `Bearer ${this.yelpKey}`}};
    try {
      let queryResult = await fetch(`${this.CORS}${this.url}${params}`, headers);
      let responseJson = await queryResult.json();
      if (responseJson.hasOwnProperty("businesses")) {
        let businesses = responseJson.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zip_code: business.location.zip_code,
            category: business.price,
            rating: business.rating,
            reviewCount: business.review_count
          }
        })
        return businesses
      }
    }
    catch(e) {
      console.log(e);
    } 
  }
}

export default Yelp
  