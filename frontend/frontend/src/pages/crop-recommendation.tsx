import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Tooltip,
  Line,
} from 'recharts';
import AppLayout from '../components/app-layout';
import { CropRecommendation } from '../contexts/types';
import { useRecommended } from '../contexts/recommended_crops';
import { useHistory } from 'react-router-dom';

const CropRecommendationPage: React.FC = () => {
  const history = useHistory();
  const [selected, setSelected] = React.useState('recommended');
  const { recommendedCrops } = useRecommended();

  const alternativeCrops = recommendedCrops;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Crop Recommendations</h1>
          <p className="text-default-500">
            Personalized crop suggestions based on your location, weather
            conditions, and soil type
          </p>
        </div>

        {/* Location Data Card */}
        <Card className="mb-8">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-shrink-0">
                <div className="bg-primary-100 p-4 rounded-full">
                  <Icon
                    icon="lucide:map-pin"
                    className="text-primary h-8 w-8"
                  />
                </div>
              </div>
              <div className="flex-grow space-y-1">
                <h2 className="text-lg font-semibold">Your Location Data</h2>
                <p className="text-default-500">Ranchi, Jharkhand, India</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Chip size="sm" variant="flat" color="primary">
                    Rainfall: High
                  </Chip>
                  <Chip size="sm" variant="flat" color="primary">
                    Temperature: 28°C
                  </Chip>
                  <Chip size="sm" variant="flat" color="primary">
                    Soil Type: Red & Lateritic
                  </Chip>
                  <Chip size="sm" variant="flat" color="primary">
                    Season: Kharif
                  </Chip>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  color="primary"
                  variant="flat"
                  endContent={<Icon icon="lucide:refresh-cw" />}
                >
                  Update Data
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Tabs */}
        <Tabs
          aria-label="Crop recommendations"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as string)}
          className="mb-6"
        >
          <Tab key="recommended" title="Recommended Crops" />
          <Tab key="alternative" title="Alternative Options" />
        </Tabs>

        {/* Crop Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(selected === 'recommended'
            ? recommendedCrops
            : alternativeCrops
          ).map((crop: CropRecommendation) => (
            <motion.div key={crop.Id} variants={itemVariants}>
              <Card className="h-full">
                <CardBody className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Icon icon={crop.Icon} className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{crop.Name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon
                          icon="lucide:check-circle"
                          className="text-success h-4 w-4"
                        />
                        <span className="text-sm text-success">
                          {crop.Confidence}% match
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-default-600 text-sm mb-4">
                    {crop.Description}
                  </p>

                  <div className="space-y-4">
                    {/* Advantages */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Icon
                          icon="lucide:check"
                          className="text-success h-4 w-4"
                        />
                        Advantages
                      </h4>
                      <ul className="list-disc list-inside text-sm text-default-600 space-y-1 pl-1">
                        {crop.Pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Icon icon="lucide:x" className="text-danger h-4 w-4" />
                        Challenges
                      </h4>
                      <ul className="list-disc list-inside text-sm text-default-600 space-y-1 pl-1">
                        {crop.Cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-default-50 rounded-medium">
                        <p className="text-default-500">Water Need</p>
                        <p className="font-medium">{crop.WaterRequirement}</p>
                      </div>
                      <div className="p-2 bg-default-50 rounded-medium">
                        <p className="text-default-500">Soil Type</p>
                        <p className="font-medium">{crop.SoilType}</p>
                      </div>
                      <div className="p-2 bg-default-50 rounded-medium">
                        <p className="text-default-500">Growth</p>
                        <p className="font-medium">{crop.GrowthPeriod}</p>
                      </div>
                    </div>

                    {/* Price Timeline */}
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={crop.PriceTimeline}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <Tooltip
                            formatter={(value: number) => [
                              `₹${value}/kg`,
                              'Price',
                            ]}
                            labelFormatter={(label) =>
                              `Updated every 7 days: ${label}`
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="Price"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-default-600 flex items-center gap-1">
                        <Icon
                          icon="lucide:map-pin"
                          className="h-4 w-4 text-primary"
                        />
                        {crop.Location}
                      </span>
                      <Button
                        size="sm"
                        variant="flat"
                        endContent={<Icon icon="lucide:arrow-right" />}
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/${encodeURIComponent(
                              crop.Location
                            )}`,
                            '_blank'
                          )
                        }
                      >
                        View Location
                      </Button>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="gap-2">
                  <Button
                    color="primary"
                    className="flex-grow"
                    endContent={<Icon icon="lucide:info" />}
                    onClick={() => history.push('/detailed-guide')}
                  >
                    Detailed Guide
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-default-500 mb-4">
            Need more personalized recommendations based on your soil
            composition?
          </p>
          <Button
            color="primary"
            variant="flat"
            size="lg"
            href="/soil-test"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            Upload Soil Test Report
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CropRecommendationPage;
