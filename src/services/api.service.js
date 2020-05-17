class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const requestStr = this.url + "/posts.json";
      const requestOptions = {
        method: "post",
        body: JSON.stringify(post),
      };
      const request = new Request(requestStr, requestOptions);

      const response = await fetch(request);
      return await response.json();
    } catch (e) {
      console.log("Error", e);
    }
  }
}

export const apiService = new ApiService("https://simple-js.firebaseio.com");
