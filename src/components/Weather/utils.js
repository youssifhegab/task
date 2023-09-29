export const getCurrentLocation = () => {
  navigator?.geolocation.getCurrentPosition((position) => {
    localStorage.setItem(
      "location",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  });
};
