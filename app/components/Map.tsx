'use client';

import { Marker, TileLayer, MapContainer } from "react-leaflet";
import L from "leaflet";

import marketIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import marketShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";
import { FC } from "react";

interface IMapProps {
    center?: number;
}

const Map:FC<IMapProps> = ({ center }) => {
    return <MapContainer 
        className="h-[35vh] rounded-md mt-2 z-20"
        center={center as L.LatLngExpression || [60.11, 62.00]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
    >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
}
 
export default Map;