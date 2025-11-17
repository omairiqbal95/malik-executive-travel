// utils/loadGoogleMaps.js
let isLoaded = false;
let callbacks = [];

export function loadGoogleMapsAPI(callback) {
  if (isLoaded) {
    callback();
    return;
  }

  callbacks.push(callback);

  if (!document.querySelector('#google-maps-script')) {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isLoaded = true;
      callbacks.forEach(cb => cb());
      callbacks = [];
    };
    document.head.appendChild(script);
  }
}
