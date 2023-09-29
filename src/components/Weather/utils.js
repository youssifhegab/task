export const getCoords = () => {
  navigator?.geolocation.getCurrentPosition((position) => {
    localStorage.setItem(
      "coords",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  });
};
