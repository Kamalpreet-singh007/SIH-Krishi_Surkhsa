import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import AppLayout from "../components/app-layout";

const Landing: React.FC = () => {
  const history = useHistory();
  const { user, loading } = useAuth();

  const handleEnter = () => {
    if (user) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  };

  return (
    <AppLayout hideNavbar hideFooter>
      <div className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-br from-green-100 to-blue-100 min-h-screen">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-12 h-12 border-4 border-t-primary border-gray-300 rounded-full animate-spin"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top-right Login/Signup buttons */}
        {!loading && !user && (
          <div className="absolute top-6 right-6 flex gap-2">
            <Button
              size="sm"
              variant="flat"
              onPress={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              size="sm"
              color="primary"
              onPress={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}

        {/* Heading */}
        {!loading && (
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🌱 Welcome to SmartCrop
          </motion.h1>
        )}

        {/* Description */}
        {!loading && (
          <motion.p
            className="text-lg text-gray-600 max-w-xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Get personalized crop recommendations, price trends, and farming
            insights tailored to your location.
          </motion.p>
        )}

        {/* Enter Dashboard button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:arrow-right" />}
              onClick={handleEnter}
            >
              Enter Dashboard
            </Button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default Landing;           