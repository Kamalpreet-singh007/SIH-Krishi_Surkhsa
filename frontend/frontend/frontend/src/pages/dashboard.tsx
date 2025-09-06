import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import AppLayout from '../components/app-layout';
import { useAuth } from '../contexts/auth-context';
import { useRecommended } from '../contexts/recommended_crops';
import { react } from '@babel/types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const cropContext = useRecommended();
  const { recommendedCrops, fetchRecommendedCrops } = cropContext;
  const [weatherData, setWeatherData] = React.useState({
    temperature: '28°C',
    humidity: '65%',
    rainfall: 'Low',
    sunlight: 'High',
  });

  React.useEffect(() => {
    const lat = localStorage.getItem('latitude');
    const lon = localStorage.getItem('longitude');
    console.log('here');
    if (lat && lon) fetchRecommendedCrops(parseFloat(lat), parseFloat(lon));
  }, [fetchRecommendedCrops]);
  // Mock data for recommended crops

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, {user?.name || 'Farmer'}!
          </h1>
          <p className="text-default-500">
            Get personalized crop recommendations and agricultural advice based
            on your location and conditions.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Weather Card */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Card className="h-full">
              <CardBody className="gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Current Weather</h2>
                  <Icon
                    icon="lucide:cloud-sun"
                    className="text-primary h-6 w-6"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-default-500">Temperature</span>
                    <span className="font-medium">
                      {weatherData.temperature}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-default-500">Humidity</span>
                    <span className="font-medium">{weatherData.humidity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-default-500">Rainfall</span>
                    <span className="font-medium">{weatherData.rainfall}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-default-500">Sunlight</span>
                    <span className="font-medium">{weatherData.sunlight}</span>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  as={RouterLink}
                  to="/crop-recommendation"
                  color="primary"
                  variant="flat"
                  className="w-full"
                  endContent={<Icon icon="lucide:arrow-right" />}
                >
                  Get Crop Recommendations
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Recommended Crops Card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="h-full">
              <CardBody className="gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Recommended Crops</h2>
                  <Icon icon="lucide:plant" className="text-primary h-6 w-6" />
                </div>

                <div className="space-y-4">
                  {recommendedCrops.map((crop) => (
                    <div
                      key={crop.Id}
                      className="flex items-center p-3 rounded-medium bg-default-50"
                    >
                      <div className="bg-primary-100 p-2 rounded-full mr-4">
                        <Icon
                          icon={crop.Icon}
                          className="text-primary h-5 w-5"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{crop.Name}</h3>
                        <p className="text-xs text-default-500">
                          {crop.Confidence}% match for your conditions
                        </p>
                      </div>
                      <Button
                        as={RouterLink}
                        to={`/crop-recommendation?crop=${crop.Name}`}
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter>
                <Link
                  as={RouterLink}
                  to="/crop-recommendation"
                  color="primary"
                  className="w-full text-center"
                >
                  View all recommendations
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Card className="h-full">
              <CardBody className="gap-4">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    as={RouterLink}
                    to="/soil-test"
                    variant="flat"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:flask-conical" />}
                  >
                    Upload Soil Test Report
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/diagnosis"
                    variant="flat"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:scan" />}
                  >
                    Diagnose Crop Disease
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/voice-assistant"
                    variant="flat"
                    className="w-full justify-start"
                    startContent={<Icon icon="lucide:mic" />}
                  >
                    Voice Assistant
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Government Schemes */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="h-full">
              <CardBody className="gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Active Government Schemes
                  </h2>
                  <Icon
                    icon="lucide:landmark"
                    className="text-primary h-6 w-6"
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-3 rounded-medium bg-default-50">
                    <h3 className="font-medium">PM-KISAN</h3>
                    <p className="text-sm text-default-500 mt-1">
                      Income support of ₹6,000 per year in three equal
                      installments
                    </p>
                  </div>
                  <div className="p-3 rounded-medium bg-default-50">
                    <h3 className="font-medium">Soil Health Card Scheme</h3>
                    <p className="text-sm text-default-500 mt-1">
                      Free soil testing and recommendations for farmers
                    </p>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  as={RouterLink}
                  to="/government-schemes"
                  color="primary"
                  variant="flat"
                  className="w-full"
                  endContent={<Icon icon="lucide:arrow-right" />}
                >
                  View All Schemes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
