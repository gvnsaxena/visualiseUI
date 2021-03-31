export const callAPI = async (url) =>  {
    try {
        const res = await fetch(url);
        const response = await res.json();
         
        return response;
    } catch(err) {
        console.log('Error in API', err);
      };
}