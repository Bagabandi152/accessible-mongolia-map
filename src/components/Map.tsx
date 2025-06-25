
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Report {
  id: string;
  location: string;
  type: string;
  description: string;
  timestamp: string;
  status: string;
}

interface MapProps {
  reports: Report[];
}

const Map = ({ reports }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  // Check for existing token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setIsTokenSet(true);
    }
  }, []);

  // Initialize map when token is available
  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [106.9057, 47.9184], // Ulaanbaatar coordinates
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each report
    reports.forEach((report) => {
      // Try to parse coordinates from location string
      const coordMatch = report.location.match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
      
      if (coordMatch) {
        const [, lat, lng] = coordMatch;
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          // Create marker element
          const markerElement = document.createElement('div');
          markerElement.className = 'custom-marker';
          markerElement.style.cssText = `
            width: 30px;
            height: 30px;
            background-color: #ef4444;
            border: 2px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          `;

          // Create popup content
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <h4 style="margin: 0 0 8px 0; font-weight: bold;">${report.type}</h4>
                <p style="margin: 0 0 4px 0; font-size: 14px;">${report.description}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${new Date(report.timestamp).toLocaleDateString('mn-MN')}
                </p>
              </div>
            `);

          // Add marker to map
          new mapboxgl.Marker(markerElement)
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map.current!);
        }
      }
    });

    // Cleanup function
    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken, reports]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsTokenSet(true);
    }
  };

  if (!isTokenSet) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mapbox токен оруулна уу</h3>
          <p className="text-sm text-gray-600 mb-4">
            Газрын зургийг ашиглахын тулд Mapbox-н токен хэрэгтэй. 
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              mapbox.com
            </a> -ээс бүртгүүлээд токен авна уу.
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              Тохируулах
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;
