import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapLocationProps {
  selectedMarkers: { coords: { lat: number; lng: number }; title: string }[]; // `"string"` биш `string`
}

const defaultCenter: LatLngExpression = [47.9186, 106.9178]; // Ulaanbaatar center

const MapLocation = ({ selectedMarkers }: MapLocationProps) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(
    null
  );

  return (
    <div className="h-[400px] w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="h-full w-full z-0 rounded-md"
        ref={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {selectedMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.coords}
            eventHandlers={{
              click: () => setActiveTooltipIndex(index),
            }}
          >
            {activeTooltipIndex === index && (
              <Tooltip direction="top" offset={[0, -10]} permanent>
                {marker.title}
              </Tooltip>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapLocation;
