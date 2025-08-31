import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/auth-context";

const SignupPage: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      setIsLoading(true);
      await signup(name, email, password);
      history.push("/location-permission");
    } catch (err) {
      setError("Failed to create an account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Icon icon="lucide:leaf" className="text-primary h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">KrishiSuraksha</h1>
          <p className="text-default-500">Smart Agriculture Advisory</p>
        </div>
        
        <Card className="w-full">
          <CardBody className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-default-500 text-sm">
                Sign up to get personalized crop recommendations
              </p>
            </div>
            
            {error && (
              <div className="p-3 rounded-medium bg-danger-50 text-danger text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onValueChange={setName}
                startContent={
                  <Icon icon="lucide:user" className="text-default-400 w-4 h-4" />
                }
                isRequired
              />
              
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onValueChange={setEmail}
                startContent={
                  <Icon icon="lucide:mail" className="text-default-400 w-4 h-4" />
                }
                isRequired
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="Create a password"
                value={password}
                onValueChange={setPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400 w-4 h-4" />
                }
                isRequired
              />
              
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400 w-4 h-4" />
                }
                isRequired
              />
              
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Sign Up
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-default-500">Already have an account? </span>
                <Link as={RouterLink} to="/">Login</Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;