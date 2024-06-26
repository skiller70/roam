import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const customMapStyle = [
  {
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#324447" }],
  },
  {
    elementType: "geometry.stroke",
    stylers: [{ visibility: "on" }, { color: "#263538" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#324447" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#152022" }, { visibility: "on" }, { weight: 1 }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#2d4a5a" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ visibility: "on" }, { color: "#cccccc" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { weight: 0.1 }, { color: "#152022" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#473d40" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#2f4e43" }],
  },
  {
    featureType: "transit.station.airport",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#473d40" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{ visibility: "simplified" }, { lightness: -24 }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#263538" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ visibility: "on" }, { color: "#243942" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "on" }, { color: "#263538" }],
  },
];

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const initialRegion = {
    latitude: latitude || 37.78825,
    longitude: longitude || -122.4324,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLatitude(userLocation.coords.latitude);

      setLongitude(userLocation.coords.longitude);
    })();
  }, []);

  return (
    <View className="flex w-full h-full justify-center items-center">
      <MapView
        className=" w-full h-full bg-black"
        initialRegion={initialRegion}
        customMapStyle={customMapStyle}
        
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="My Marker"
          description="This is a marker"
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
