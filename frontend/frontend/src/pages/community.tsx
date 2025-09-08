import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import AppLayout from "../components/app-layout"; // Import AppLayout

const Community: React.FC = () => {
  return (
    <AppLayout> {/* Wrap page in AppLayout to include navbar & footer */}
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3 text-primary">🌱 Community</h1>
          <p className="text-default-600 text-lg">
            Connect with farmers, experts, and government resources.  
            Stay updated and support each other for better farming practices 🚜🌾
          </p>
        </div>

        {/* Govt Helplines */}
        <Card shadow="sm" className="rounded-2xl border">
          <CardBody className="p-6 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Icon icon="mdi:phone" width={24} className="text-primary" />
              Govt. Helplines
            </h2>
            <div className="space-y-1">
              <p className="text-lg font-medium text-default-700">📞 1800-180-1551 (General Agriculture)</p>
              <p className="text-lg font-medium text-default-700">📞 1800-180-1550 (Soil Health & Subsidies)</p>
              <p className="text-lg font-medium text-default-700">📞 1967 (Kisan Call Centre)</p>
            </div>
            <p className="text-sm text-default-500">
              Toll-free numbers for agriculture-related support and schemes.
            </p>
          </CardBody>
        </Card>

        {/* Govt Offices */}
        <Card shadow="sm" className="rounded-2xl border">
          <CardBody className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Icon icon="mdi:office-building" width={24} className="text-primary" />
              Govt. Agriculture Offices
            </h2>

            {/* Office 1 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-default-700">
                  Krishi Bhavan, New Delhi
                </p>
                <p className="text-sm text-default-500">
                  Ministry of Agriculture & Farmers Welfare HQ.
                </p>
              </div>
              <Button
                as="a"
                href="https://goo.gl/maps/RJQb9Hvz7YJ2"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="flat"
                startContent={<Icon icon="mdi:map-marker" width={18} />}
              >
                View Location
              </Button>
            </div>

            {/* Office 2 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-default-700">
                  State Agriculture Office, Lucknow
                </p>
                <p className="text-sm text-default-500">
                  Regional office for Uttar Pradesh farmers.
                </p>
              </div>
              <Button
                as="a"
                href="https://goo.gl/maps/fGzM8m45z9y"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="flat"
                startContent={<Icon icon="mdi:map-marker" width={18} />}
              >
                View Location
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* WhatsApp Community */}
        <Card shadow="sm" className="rounded-2xl border">
          <CardBody className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Icon icon="mdi:whatsapp" width={24} className="text-green-500" />
              Join Our WhatsApp Group
            </h2>
            <p className="text-default-600">
              Stay connected with fellow farmers and experts in our WhatsApp community.
            </p>
            <Button
              as="a"
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              rel="noopener noreferrer"
              color="success"
              variant="flat"
              className="w-fit"
              startContent={<Icon icon="mdi:whatsapp" width={20} />}
            >
              Join WhatsApp Community
            </Button>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Community;
