import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AppLayout from "../components/app-layout";

const storageOptions = [
  { id: 1, name: "Ranchi Storage Warehouse", location: "Ranchi, Jharkhand" },
  { id: 2, name: "Jamshedpur Grain Storage", location: "Jamshedpur, Jharkhand" },
  { id: 3, name: "Dhanbad Agro Storage", location: "Dhanbad, Jharkhand" },
];

const mandiLocation = "Pandara Wholesale Mandi, Ranchi, Jharkhand";

// Sample 7-day price trend
const getPriceTrend = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    days.push({ day: dayLabel, price: Math.floor(Math.random() * 20) + 30 });
  }
  return days;
};

const DetailedGuidePage: React.FC = () => {
  const location = useLocation<any>();
  const cropName = location.state?.cropName || "All Crops";

  const fertilizerTips = [
    "Use balanced NPK fertilizers based on soil test.",
    "Apply organic compost for better soil fertility.",
  ];

  const pestTips = [
    "Monitor crops for aphids, stem borers, and fungal infections.",
    "Use eco-friendly pesticides and crop rotation to minimize damage.",
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          Detailed Guide for {cropName}
        </h1>

        {/* Current Weather */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 shadow-lg">
          <CardBody className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Current Weather - Ranchi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Temperature", value: "28°C", icon: "lucide:thermometer" },
                { label: "Humidity", value: "65%", icon: "lucide:droplet" },
                { label: "Rainfall", value: "Low", icon: "lucide:cloud-rain" },
                { label: "Sunlight", value: "High", icon: "lucide:sun" },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-white rounded-2xl shadow-md flex flex-col items-center">
                  <Icon icon={item.icon} className="text-primary h-6 w-6 mb-2" />
                  <p className="text-default-500 text-sm">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Harvest Timeline */}
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Harvest Timeline</h2>
            <div className="relative h-8 bg-gray-200 rounded-full">
              <div className="absolute left-0 top-0 h-8 w-1/3 bg-green-500 rounded-l-full"></div>
              <div className="absolute left-1/3 top-0 h-8 w-1/3 bg-yellow-400"></div>
              <div className="absolute left-2/3 top-0 h-8 w-1/3 bg-red-500 rounded-r-full"></div>
            </div>
            <div className="flex justify-between text-sm text-default-500 mt-1">
              <span>Sowing</span>
              <span>Growing</span>
              <span>Harvest</span>
            </div>
          </CardBody>
        </Card>

        {/* Price Trend */}
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Mandi Price Trend (Last 7 Days)</h2>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getPriceTrend()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip
                    formatter={(value: number) => [`₹${value}/kg`, "Price"]}
                    labelFormatter={(label) => `Updated: ${label}`}
                  />
                  <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Mandi Details */}
        <Card className="shadow-lg border-l-4 border-primary hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Pandara Wholesale Mandi</h2>
            <p className="text-default-600">
              Famous wholesale market in Jharkhand. Ideal for selling or purchasing crops with good storage & transport facilities.
            </p>
            <Button
              variant="solid"
              color="primary"
              endContent={<Icon icon="lucide:map-pin" />}
              onClick={() =>
                window.open(`https://www.google.com/maps/search/${encodeURIComponent(mandiLocation)}`, "_blank")
              }
            >
              View on Map
            </Button>
          </CardBody>
        </Card>

        {/* Nearby Storage Options */}
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Nearby Storage Options</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {storageOptions.map((storage) => (
                <Card key={storage.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{storage.name}</h3>
                    <p className="text-sm text-default-500">{storage.location}</p>
                  </div>
                  <Button
                    variant="flat"
                    color="primary"
                    size="sm"
                    endContent={<Icon icon="lucide:map-pin" />}
                    onClick={() =>
                      window.open(`https://www.google.com/maps/search/${encodeURIComponent(storage.location)}`, "_blank")
                    }
                  >
                    View on Map
                  </Button>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Fertilizer & Pest Info */}
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Fertilizer & Pest Control</h2>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-semibold">Fertilizer Tips</h3>
                <ul className="list-disc list-inside text-default-600">
                  {fertilizerTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h3 className="font-semibold">Pest Control Tips</h3>
                <ul className="list-disc list-inside text-default-600">
                  {pestTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Helpful Links */}
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardBody className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">Helpful Links</h2>
            <ul className="list-disc list-inside space-y-1 text-default-600">
              <li>
                <a
                  href="https://agricoop.nic.in/"
                  target="_blank"
                  className="text-primary hover:underline"
                  rel="noreferrer"
                >
                  Government Agriculture Portal
                </a>
              </li>
              <li>
                <a
                  href="https://farmer.gov.in/"
                  target="_blank"
                  className="text-primary hover:underline"
                  rel="noreferrer"
                >
                  Farmer Government Schemes
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="text-primary hover:underline"
                >
                  Local Agriculture Helpline
                </a>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <Button color="primary" variant="flat" endContent={<Icon icon="lucide:arrow-left" />} onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DetailedGuidePage;
