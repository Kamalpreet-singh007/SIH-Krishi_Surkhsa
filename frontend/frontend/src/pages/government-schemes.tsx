import React from "react";
import { Card, CardBody, Input, Button, Chip, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "../components/app-layout";

interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string;
  deadline: string | null;
  applicationLink: string;
  category: "subsidy" | "insurance" | "loan" | "other";
  isNew: boolean;
}

const GovernmentSchemesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  // Mock data for government schemes
  const schemes: Scheme[] = [
    {
      id: "pm-kisan",
      title: "PM-KISAN",
      description: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India.",
      eligibility: [
        "Small and marginal farmers",
        "All landholding farmers' families",
        "Subject to exclusion criteria"
      ],
      benefits: "Financial benefit of Rs. 6,000 per year in three equal installments of Rs. 2,000 each, every four months.",
      deadline: null,
      applicationLink: "https://pmkisan.gov.in/",
      category: "subsidy",
      isNew: false
    },
    {
      id: "pmfby",
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "A crop insurance scheme that aims to reduce the premium burden on farmers and ensure early settlement of crop assurance claims for the full insured sum.",
      eligibility: [
        "All farmers growing notified crops in notified areas",
        "Both loanee and non-loanee farmers"
      ],
      benefits: "Comprehensive risk coverage for pre-sowing to post-harvest losses due to natural calamities, pests & diseases.",
      deadline: "July 31, 2023 for Kharif crops",
      applicationLink: "https://pmfby.gov.in/",
      category: "insurance",
      isNew: false
    },
    {
      id: "soil-health-card",
      title: "Soil Health Card Scheme",
      description: "A scheme to issue soil health cards to farmers. The scheme provides information on soil nutrient status and recommendations on appropriate dosage of nutrients for improving soil health and fertility.",
      eligibility: [
        "All farmers across India"
      ],
      benefits: "Free soil testing and recommendations for farmers to improve productivity through judicious use of inputs.",
      deadline: null,
      applicationLink: "https://soilhealth.dac.gov.in/",
      category: "other",
      isNew: false
    },
    {
      id: "kcc",
      title: "Kisan Credit Card",
      description: "The Kisan Credit Card (KCC) scheme aims to provide adequate and timely credit support to farmers for their cultivation needs.",
      eligibility: [
        "All farmers, including small farmers, marginal farmers, sharecroppers, and tenant farmers",
        "Oral lessees and self-help groups of farmers"
      ],
      benefits: "Short-term credit for cultivation, post-harvest expenses, and maintenance of farm assets. Interest subvention of 2% and additional 3% for prompt repayment.",
      deadline: null,
      applicationLink: "https://www.nabard.org/",
      category: "loan",
      isNew: false
    },
    {
      id: "pmksy",
      title: "Pradhan Mantri Krishi Sinchayee Yojana",
      description: "A scheme to ensure access to some means of protective irrigation to all agricultural farms in the country and to produce 'per drop more crop'.",
      eligibility: [
        "All farmers with focus on small and marginal farmers"
      ],
      benefits: "Financial assistance for micro-irrigation systems like drip and sprinkler irrigation. Subsidy up to 55% for small and marginal farmers.",
      deadline: null,
      applicationLink: "https://pmksy.gov.in/",
      category: "subsidy",
      isNew: true
    }
  ];
  
  // Filter schemes based on search query and category
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? scheme.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "subsidy":
        return "primary";
      case "insurance":
        return "success";
      case "loan":
        return "warning";
      default:
        return "default";
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "subsidy":
        return "lucide:indian-rupee";
      case "insurance":
        return "lucide:shield";
      case "loan":
        return "lucide:landmark";
      default:
        return "lucide:info";
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Government Schemes</h1>
          <p className="text-default-500">
            Explore active government schemes and subsidies for farmers
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search schemes..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="flex-grow"
            />
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "solid" : "flat"}
                color="primary"
                size="sm"
                onPress={() => setSelectedCategory(null)}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "subsidy" ? "solid" : "flat"}
                color="primary"
                size="sm"
                startContent={<Icon icon="lucide:indian-rupee" />}
                onPress={() => setSelectedCategory("subsidy")}
              >
                Subsidies
              </Button>
              <Button
                variant={selectedCategory === "insurance" ? "solid" : "flat"}
                color="success"
                size="sm"
                startContent={<Icon icon="lucide:shield" />}
                onPress={() => setSelectedCategory("insurance")}
              >
                Insurance
              </Button>
              <Button
                variant={selectedCategory === "loan" ? "solid" : "flat"}
                color="warning"
                size="sm"
                startContent={<Icon icon="lucide:landmark" />}
                onPress={() => setSelectedCategory("loan")}
              >
                Loans
              </Button>
              <Button
                variant={selectedCategory === "other" ? "solid" : "flat"}
                color="default"
                size="sm"
                startContent={<Icon icon="lucide:info" />}
                onPress={() => setSelectedCategory("other")}
              >
                Others
              </Button>
            </div>
          </div>
        </div>
        
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-12">
            <Icon icon="lucide:search-x" className="text-default-400 h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">No schemes found</h2>
            <p className="text-default-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredSchemes.map((scheme) => (
              <motion.div key={scheme.id} variants={itemVariants}>
                <Card>
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-semibold">{scheme.title}</h2>
                          {scheme.isNew && (
                            <Chip color="primary" size="sm" variant="flat">New</Chip>
                          )}
                        </div>
                        
                        <div className="mb-4 flex items-center gap-2">
                          <Chip
                            startContent={<Icon icon={getCategoryIcon(scheme.category)} size={16} />}
                            color={getCategoryColor(scheme.category) as any}
                            variant="flat"
                            size="sm"
                          >
                            {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                          </Chip>
                          
                          {scheme.deadline && (
                            <Chip
                              startContent={<Icon icon="lucide:calendar" size={16} />}
                              color="warning"
                              variant="flat"
                              size="sm"
                            >
                              Deadline: {scheme.deadline}
                            </Chip>
                          )}
                        </div>
                        
                        <p className="text-default-600 mb-4">
                          {scheme.description}
                        </p>
                        
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Eligibility:</h3>
                          <ul className="list-disc list-inside text-default-600 space-y-1">
                            {scheme.eligibility.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Benefits:</h3>
                          <p className="text-default-600">{scheme.benefits}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center gap-3 md:min-w-[200px]">
                        <Button
                          as={Link}
                          href={scheme.applicationLink}
                          target="_blank"
                          color="primary"
                          endContent={<Icon icon="lucide:external-link" />}
                        >
                          Apply Now
                        </Button>
                        
                        <Button
                          variant="flat"
                          endContent={<Icon icon="lucide:info" />}
                        >
                          More Details
                        </Button>
                        
                        <Button
                          variant="flat"
                          endContent={<Icon icon="lucide:download" />}
                        >
                          Download Guidelines
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default GovernmentSchemesPage;