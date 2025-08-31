import React from "react";
import { Card, CardBody, Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "../components/app-layout";

const DiagnosisPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">AI Diagnosis Results</h1>
          <p className="text-default-500">
            Comprehensive analysis of your crop health
          </p>
        </div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardBody className="p-6 flex flex-col items-center gap-6">
                <div className="text-center">
                  <Icon icon="lucide:scan" className="text-primary h-12 w-12 mb-4" />
                  <h2 className="text-xl font-semibold">Upload Crop Image</h2>
                  <p className="text-default-500 mt-2">
                    Upload a clear image of your crop to diagnose any diseases or issues
                  </p>
                </div>

                <div 
                  className="border-2 border-dashed border-default-200 rounded-lg p-8 w-full text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-2">
                      <Icon icon="lucide:check-circle" className="text-success h-12 w-12" />
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-default-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Icon icon="lucide:upload" className="text-default-400 h-12 w-12" />
                      <p className="font-medium">Click to upload</p>
                      <p className="text-xs text-default-500">
                        JPG, PNG or GIF (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  color="primary"
                  className="w-full"
                  isDisabled={!selectedFile}
                  isLoading={isAnalyzing}
                  onPress={handleAnalyze}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-danger">
                    <Icon icon="lucide:alert-triangle" className="h-6 w-6" />
                    <h2 className="text-xl font-semibold">Disease Detected: Late Blight</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img 
                        src="https://img.heroui.chat/image/ai?w=400&h=300&u=tomato_blight" 
                        alt="Tomato Late Blight" 
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-default-500">Crop Type:</p>
                          <p className="font-medium text-lg">Tomato</p>
                        </div>
                        <div>
                          <p className="text-default-500">Confidence:</p>
                          <p className="font-medium text-lg text-success">94%</p>
                        </div>
                        <div>
                          <p className="text-default-500">Severity:</p>
                          <p className="font-medium text-lg text-warning">Moderate</p>
                        </div>
                        <div>
                          <p className="text-default-500">Affected Area:</p>
                          <p className="font-medium text-lg text-danger">35%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider className="my-6" />

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon icon="lucide:clipboard-list" className="text-primary h-6 w-6" />
                        <h3 className="text-lg font-semibold">Treatment Recommendations</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                            <div className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">1</div>
                          </div>
                          <p>Apply copper-based fungicide immediately</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                            <div className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">2</div>
                          </div>
                          <p>Improve air circulation around plants</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary-100 rounded-full p-1 mt-0.5">
                            <div className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</div>
                          </div>
                          <p>Remove affected leaves and dispose properly</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon icon="lucide:info" className="text-primary h-6 w-6" />
                        <h3 className="text-lg font-semibold">About Late Blight</h3>
                      </div>
                      <p className="text-default-600">
                        Late blight is a devastating disease caused by the fungus-like organism Phytophthora infestans. 
                        It spreads rapidly in cool, wet conditions and can destroy entire crops within days if not treated. 
                        The disease affects leaves, stems, and fruits, causing dark lesions and eventual rotting.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon="lucide:cloud-sun" className="text-primary h-6 w-6" />
                    <h3 className="text-lg font-semibold">Environmental Factors</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:thermometer" className="text-danger h-5 w-5" />
                        <span>Temperature</span>
                      </div>
                      <span className="font-medium">22-28°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:droplets" className="text-primary h-5 w-5" />
                        <span>Humidity</span>
                      </div>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:cloud-rain" className="text-primary h-5 w-5" />
                        <span>Rainfall</span>
                      </div>
                      <span className="font-medium">High</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon icon="lucide:zap" className="text-primary h-6 w-6" />
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="flat"
                      color="warning"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:alert-triangle" />}
                    >
                      Report to Expert
                    </Button>
                    <Button
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:save" />}
                    >
                      Save Diagnosis
                    </Button>
                    <Button
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Icon icon="lucide:users" />}
                    >
                      Ask Community
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default DiagnosisPage;