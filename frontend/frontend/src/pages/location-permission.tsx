import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const LocationPermissionPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const history = useHistory();

  const handleGetLocation = () => {
    setIsLoading(true);
    setError("");
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would store these coordinates and use them for API calls
        const { latitude, longitude } = position.coords;
        console.log(`Location: ${latitude}, ${longitude}`);
        
        // Mock API call delay
        setTimeout(() => {
          setIsLoading(false);
          history.push("/dashboard");
        }, 1500);
      },
      (err) => {
        setIsLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("You denied the request for location access");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case err.TIMEOUT:
            setError("The request to get user location timed out");
            break;
          default:
            setError("An unknown error occurred");
            break;
        }
      }
    );
  };
  
  const handleSkip = () => {
    history.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full">
          <CardBody className="p-8 flex flex-col items-center text-center space-y-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <Icon icon="lucide:map-pin" className="text-primary h-12 w-12" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Location Access</h2>
              <p className="text-default-500">
                We need your location to provide accurate crop recommendations based on your local climate and soil conditions.
              </p>
            </div>
            
            {error && (
              <div className="p-3 w-full rounded-medium bg-danger-50 text-danger text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-3 w-full">
              <Button
                color="primary"
                className="w-full"
                onPress={handleGetLocation}
                isLoading={isLoading}
                startContent={!isLoading && <Icon icon="lucide:map-pin" />}
              >
                Allow Location Access
              </Button>
              
              <Button
                variant="flat"
                color="default"
                className="w-full"
                onPress={handleSkip}
              >
                Skip for Now
              </Button>
            </div>
            
            <p className="text-xs text-default-400">
              Your location data is only used to provide personalized recommendations and is never shared with third parties.
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default LocationPermissionPage;