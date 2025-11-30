'use client';

import { Marker, TileLayer, MapContainer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import { FC, useId } from "react";

interface IMapProps {
    center?: [number, number];
}

const Map: FC<IMapProps> = ({ center }) => {

    const id = useId();
    const mapKey = `${id}-${center?.[0] || 0}-${center?.[1] || 0}`;

    return <MapContainer
        key={mapKey}
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