'use client';

import { Marker, TileLayer, MapContainer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import { FC } from "react";

interface IMapProps {
    center?: [number, number];
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
        {center && <Marker position={center as LatLngExpression} />}
    </MapContainer>
}
 
export default Map;