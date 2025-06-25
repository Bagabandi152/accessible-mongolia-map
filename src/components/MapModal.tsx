import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (coords: { lat: number; lng: number }) => void;
}

const defaultCenter: LatLngExpression = [47.9186, 106.9178]; // Ulaanbaatar center

function LocationSelector({
  onPin,
}: {
  onPin: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPin(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const MapModal = ({ isOpen, onClose, onSelect }: MapModalProps) => {
  const [markerPos, setMarkerPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Байршил сонгох</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="h-[400px] w-full relative">
          <MapContainer
            center={defaultCenter}
            zoom={13}
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationSelector
              onPin={(lat, lng) => setMarkerPos({ lat, lng })}
            />
            {markerPos && <Marker position={markerPos} />}
          </MapContainer>
        </div>
        <div className="p-4 border-t flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Хаах
          </Button>
          <Button
            disabled={!markerPos}
            onClick={() => markerPos && onSelect(markerPos)}
            className={`${
              markerPos
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-200 text-blue-600 cursor-not-allowed"
            } font-semibold py-2 px-4 rounded`}
          >
            Мэдээлэл илгээх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
