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

      return useRequest(requestStr, requestOptions);
    } catch (e) {
      console.log("Error", e);
    }
  }

  async fetchPosts() {
    try {
      const requestStr = this.url + "/posts.json";
      const requestOptions = {
        method: "get",
      };

      return useRequest(requestStr, requestOptions);
    } catch (e) {
      console.log(e);
    }
  }
}

async function useRequest(requestStr, requestOptions) {
  const request = new Request(requestStr, requestOptions);
  const response = await fetch(request);
  return await response.json();
}

export const apiService = new ApiService("https://simple-js.firebaseio.com");
