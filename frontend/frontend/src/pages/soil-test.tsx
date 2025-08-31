import React from "react";
import { Card, CardBody, Button, Input, Textarea, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "../components/app-layout";

const SoilTestPage: React.FC = () => {
  const [selected, setSelected] = React.useState("upload");
  const [isUploading, setIsUploading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Form state for manual entry
  const [formData, setFormData] = React.useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organic_matter: "",
    calcium: "",
    magnesium: "",
    sulfur: ""
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, this would navigate to results or update state
      alert("Soil test report uploaded successfully!");
    }, 2000);
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, this would navigate to results or update state
      alert("Soil test data submitted successfully!");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Soil Test Report</h1>
          <p className="text-default-500">
            Upload your soil test report or manually enter soil parameters for more accurate crop recommendations
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto">
          <CardBody className="p-6">
            <Tabs 
              aria-label="Soil test options" 
              selectedKey={selected} 
              onSelectionChange={setSelected as any}
              className="mb-6"
            >
              <Tab key="upload" title="Upload Report" />
              <Tab key="manual" title="Manual Entry" />
            </Tabs>
            
            {selected === "upload" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <Icon icon="lucide:file-text" className="text-primary h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-lg font-semibold">Upload Soil Test Report</h2>
                  <p className="text-default-500 mt-2">
                    Upload your soil test report in PDF or image format
                  </p>
                </div>
                
                <div 
                  className="border-2 border-dashed border-default-200 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
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
                        PDF, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    className="px-8"
                    isDisabled={!selectedFile}
                    isLoading={isUploading}
                    onPress={handleUpload}
                    startContent={!isUploading && <Icon icon="lucide:upload-cloud" />}
                  >
                    {isUploading ? "Uploading..." : "Upload Report"}
                  </Button>
                </div>
                
                <div className="bg-default-50 p-4 rounded-medium">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:info" className="text-primary" />
                    Don't have a soil test report?
                  </h3>
                  <p className="text-sm text-default-600">
                    You can still get crop recommendations based on your location and weather data. 
                    Alternatively, you can manually enter soil parameters if you know them.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmitForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Soil pH"
                      placeholder="e.g., 6.5"
                      description="pH scale (0-14)"
                      value={formData.ph}
                      onValueChange={(value) => handleInputChange("ph", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Nitrogen (N)"
                      placeholder="e.g., 280"
                      description="kg/ha or ppm"
                      value={formData.nitrogen}
                      onValueChange={(value) => handleInputChange("nitrogen", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Phosphorus (P)"
                      placeholder="e.g., 25"
                      description="kg/ha or ppm"
                      value={formData.phosphorus}
                      onValueChange={(value) => handleInputChange("phosphorus", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Potassium (K)"
                      placeholder="e.g., 180"
                      description="kg/ha or ppm"
                      value={formData.potassium}
                      onValueChange={(value) => handleInputChange("potassium", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Organic Matter"
                      placeholder="e.g., 1.5"
                      description="Percentage (%)"
                      value={formData.organic_matter}
                      onValueChange={(value) => handleInputChange("organic_matter", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Calcium (Ca)"
                      placeholder="e.g., 1200"
                      description="ppm"
                      value={formData.calcium}
                      onValueChange={(value) => handleInputChange("calcium", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Magnesium (Mg)"
                      placeholder="e.g., 150"
                      description="ppm"
                      value={formData.magnesium}
                      onValueChange={(value) => handleInputChange("magnesium", value)}
                    />
                    
                    <Input
                      type="number"
                      label="Sulfur (S)"
                      placeholder="e.g., 12"
                      description="ppm"
                      value={formData.sulfur}
                      onValueChange={(value) => handleInputChange("sulfur", value)}
                    />
                  </div>
                  
                  <Textarea
                    label="Additional Notes"
                    placeholder="Any other information about your soil or field conditions"
                    className="w-full"
                  />
                  
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="px-8"
                      isLoading={isSubmitting}
                      startContent={!isSubmitting && <Icon icon="lucide:send" />}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Soil Data"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </CardBody>
        </Card>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Why Soil Testing Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardBody className="p-4 text-center">
                <Icon icon="lucide:target" className="text-primary h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Precise Recommendations</h3>
                <p className="text-sm text-default-500">
                  Get crop recommendations tailored specifically to your soil's composition
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-4 text-center">
                <Icon icon="lucide:sprout" className="text-primary h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Improved Yield</h3>
                <p className="text-sm text-default-500">
                  Optimize fertilizer use and growing conditions for better crop yield
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="p-4 text-center">
                <Icon icon="lucide:indian-rupee" className="text-primary h-8 w-8 mx-auto mb-3" />
                <h3 className="font-medium mb-2">Cost Savings</h3>
                <p className="text-sm text-default-500">
                  Reduce unnecessary fertilizer expenses by knowing exactly what your soil needs
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SoilTestPage;