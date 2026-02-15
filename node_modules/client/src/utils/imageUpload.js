// Image upload utility using imgBB API
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', import.meta.env.VITE_IMGBB_API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || 'Image upload failed');
    }
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};
