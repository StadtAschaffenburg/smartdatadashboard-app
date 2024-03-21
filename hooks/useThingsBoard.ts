
import { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature?: number; // Definiere hier alle erwarteten Daten
  humidity?: number;
}

// Hook, der Wetterdaten von ThingsBoard abruft
export const useThingsBoard = (deviceToken: string) => {
  const [data, setData] = useState<WeatherData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData>(`https://deine-thingsboard-instance/api/v1/${deviceToken}/telemetry`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Das Leben ist wie eine API-Anfrage, manchmal kriegt man nicht, was man will.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deviceToken]); // Abhängigkeit, um bei Änderung erneut zu fetchen

  return { data, isLoading, error };
};