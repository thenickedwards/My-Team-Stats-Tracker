// upload image to cloudinary, receive URL as res
const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'content-type': 'application/json' },
      });
  
      if (response.ok) {
        const url = await response.json();
        return url;
      } else {
        console.log(response);
        return response;
      }
    } catch (error) {
      return console.error(error);
    }
  };
  
  export default uploadImage;