// Coordenadas de Buenos Aires (centro AMBA)
export const BA_CENTER = { lat: -34.6037, lng: -58.3816 };

/**
 * Modo desarrollo: usar BA_CENTER en lugar del GPS real.
 * Definir en .env / eas.json: EXPO_PUBLIC_USE_BA_COORDS=true
 * (equivalente a NEXT_PUBLIC_USE_BA_COORDS en bondiya — en Expo el prefijo
 * público del lado cliente es EXPO_PUBLIC_ en vez de NEXT_PUBLIC_).
 */
export const USE_BA_COORDS_DEV = process.env.EXPO_PUBLIC_USE_BA_COORDS === "true";
