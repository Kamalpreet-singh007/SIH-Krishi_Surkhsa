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
import AppLayout from '../components/app-layout';
import { CropRecommendation } from '../contexts/types';
import { useRecommended } from '../contexts/recommended_crops';

const CropRecommendationPage: React.FC = () => {
  const [selected, setSelected] = React.useState('recommended');
  const cropcontext = useRecommended();
  const { recommendedCrops } = cropcontext;

  const alternativeCrops = recommendedCrops;
  // Mock data for recommended crops
  // const recommendedCrops: CropRecommendation[] = [
  //   {
  //     id: 1,
  //     name: 'Rice',
  //     confidence: 95,
  //     description:
  //       'Rice is a staple food crop well-suited for the climate and soil conditions in your region. It thrives in areas with high rainfall and humidity.',
  //     pros: [
  //       'High market demand',
  //       'Suitable for local climate',
  //       'Government subsidies available',
  //       'Well-established supply chain',
  //     ],
  //     cons: [
  //       'Water-intensive cultivation',
  //       'Susceptible to certain pests',
  //       'Requires specialized equipment',
  //     ],
  //     waterRequirement: 'High',
  //     soilType: 'Clay or clay loam',
  //     growthPeriod: '3-6 months',
  //     icon: 'lucide:wheat',
  //   },
  //   {
  //     id: 2,
  //     name: 'Maize',
  //     confidence: 87,
  //     description:
  //       "Maize (corn) is a versatile crop that can be grown in various conditions. It's relatively drought-tolerant compared to rice.",
  //     pros: [
  //       'Multiple uses (food, feed, industrial)',
  //       'Relatively shorter growing season',
  //       'Lower water requirement than rice',
  //       'Good market value',
  //     ],
  //     cons: [
  //       'Susceptible to fall armyworm',
  //       'Requires adequate nitrogen',
  //       'Price fluctuations',
  //     ],
  //     waterRequirement: 'Medium',
  //     soilType: 'Well-drained loamy soil',
  //     growthPeriod: '3-4 months',
  //     icon: 'lucide:wheat',
  //   },
  //   {
  //     id: 3,
  //     name: 'Soybean',
  //     confidence: 82,
  //     description:
  //       "Soybean is a legume crop that improves soil fertility by fixing nitrogen. It's a good rotation crop with cereals.",
  //     pros: [
  //       'Improves soil fertility',
  //       'Good market demand',
  //       'Drought-tolerant',
  //       'Low input requirement',
  //     ],
  //     cons: [
  //       'Susceptible to pod shattering',
  //       'Requires proper inoculation',
  //       'Sensitive to photoperiod',
  //     ],
  //     waterRequirement: 'Medium-Low',
  //     soilType: 'Well-drained loamy soil',
  //     growthPeriod: '3-5 months',
  //     icon: 'lucide:sprout',
  //   },
  // ];

  // const alternativeCrops: CropRecommendation[] = [
  //   {
  //     id: 4,
  //     name: 'Groundnut',
  //     confidence: 78,
  //     description:
  //       "Groundnut (peanut) is a legume crop that grows well in light sandy soils. It's drought-tolerant and improves soil fertility.",
  //     pros: [
  //       'Drought-tolerant',
  //       'Improves soil fertility',
  //       'Multiple uses (oil, food)',
  //       'Good market value',
  //     ],
  //     cons: [
  //       'Labor-intensive harvesting',
  //       'Susceptible to aflatoxin contamination',
  //       'Requires well-drained soil',
  //     ],
  //     waterRequirement: 'Medium-Low',
  //     soilType: 'Sandy loam',
  //     growthPeriod: '3-5 months',
  //     icon: 'lucide:sprout',
  //   },
  //   {
  //     id: 5,
  //     name: 'Black Gram',
  //     confidence: 75,
  //     description:
  //       'Black gram is a pulse crop that requires less water and can be grown as an intercrop or rotation crop.',
  //     pros: [
  //       'Short duration crop',
  //       'Low water requirement',
  //       'Improves soil fertility',
  //       'Can be grown as intercrop',
  //     ],
  //     cons: [
  //       'Susceptible to pests and diseases',
  //       'Lower yield potential',
  //       'Requires proper seed treatment',
  //     ],
  //     waterRequirement: 'Low',
  //     soilType: 'Well-drained loamy soil',
  //     growthPeriod: '2-3 months',
  //     icon: 'lucide:sprout',
  //   },
  // ];

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
          <h1 className="text-2xl font-bold mb-2">Crop Recommendations</h1>
          <p className="text-default-500">
            Personalized crop suggestions based on your location, weather
            conditions, and soil type
          </p>
        </div>

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

        <Tabs
          aria-label="Crop recommendations"
          selectedKey={selected}
          onSelectionChange={setSelected as any}
          className="mb-6"
        >
          <Tab key="recommended" title="Recommended Crops" />
          <Tab key="alternative" title="Alternative Options" />
        </Tabs>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(selected === 'recommended'
            ? recommendedCrops
            : alternativeCrops
          ).map((crop) => (
            <motion.div key={crop.Id} variants={itemVariants}>
              <Card className="h-full">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4 mb-4">
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

                  <p className="text-default-600 text-sm mb-4">
                    {crop.Description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Icon
                          icon="lucide:check"
                          className="text-success h-4 w-4"
                        />
                        Advantages
                      </h4>
                      <ul className="list-disc list-inside text-sm text-default-600 space-y-1 pl-1">
                        {crop.Pros.map((pro, index: number) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>

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
                  </div>
                </CardBody>
                <CardFooter className="gap-2">
                  <Button
                    color="primary"
                    className="flex-grow"
                    endContent={<Icon icon="lucide:info" />}
                  >
                    Detailed Guide
                  </Button>
                  <Button
                    variant="flat"
                    className="flex-grow"
                    endContent={<Icon icon="lucide:share" />}
                  >
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
