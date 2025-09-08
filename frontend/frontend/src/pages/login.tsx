// import React from "react";
// import { Link as RouterLink, useHistory } from "react-router-dom";
// import { Card, CardBody, Input, Button, Link, Checkbox } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { useAuth } from "../contexts/auth-context";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [error, setError] = React.useState("");
//   const { login } = useAuth();
//   const history = useHistory();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
    
//     if (!email || !password) {
//       setError("Please enter both email and password");
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       await login(email, password);
//       history.push("/location-permission");
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Icon icon="lucide:leaf" className="text-primary h-12 w-12" />
//           </div>
//           <h1 className="text-2xl font-bold text-foreground">KrishiSuraksha</h1>
//           <p className="text-default-500">Smart Agriculture Advisory</p>
//         </div>
        
//         <Card className="w-full">
//           <CardBody className="p-6 space-y-6">
//             <div className="space-y-2">
//               <h2 className="text-xl font-semibold">Login</h2>
//               <p className="text-default-500 text-sm">
//                 Enter your credentials to access your account
//               </p>
//             </div>
            
//             {error && (
//               <div className="p-3 rounded-medium bg-danger-50 text-danger text-sm">
//                 {error}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <Input
//                 type="email"
//                 label="Email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onValueChange={setEmail}
//                 startContent={
//                   <Icon icon="lucide:mail" className="text-default-400 w-4 h-4" />
//                 }
//                 isRequired
//               />
              
//               <Input
//                 type="password"
//                 label="Password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onValueChange={setPassword}
//                 startContent={
//                   <Icon icon="lucide:lock" className="text-default-400 w-4 h-4" />
//                 }
//                 isRequired
//               />
              
//               <div className="flex items-center justify-between">
//                 <Checkbox size="sm">Remember me</Checkbox>
//                 <Link href="#" size="sm">Forgot password?</Link>
//               </div>
              
//               <Button
//                 type="submit"
//                 color="primary"
//                 className="w-full"
//                 isLoading={isLoading}
//               >
//                 Login
//               </Button>
              
//               <div className="text-center text-sm">
//                 <span className="text-default-500">Don't have an account? </span>
//                 <Link as={RouterLink} to="/signup">Sign up</Link>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { Card, CardBody, Input, Button, Link, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/auth-context";

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { login } = useAuth();
  const history = useHistory();
 const location = useLocation<LocationState>();

// Redirect user to location-permission first if no intended page
const from = location.state?.from?.pathname || "/location-permission";


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password); // login via AuthContext
      // Redirect to the page user intended to access
      history.replace(from);
      const response = await login(email, password);
      if (response)
      history.push("/location-permission");
    } catch (err) {
      setError("Invalid email or password");
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
              <h2 className="text-xl font-semibold">Login</h2>
              <p className="text-default-500 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-medium bg-danger-50 text-danger text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onValueChange={setEmail}
                startContent={<Icon icon="lucide:mail" className="text-default-400 w-4 h-4" />}
                isRequired
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onValueChange={setPassword}
                startContent={<Icon icon="lucide:lock" className="text-default-400 w-4 h-4" />}
                isRequired
              />

              <div className="flex items-center justify-between">
                <Checkbox size="sm">Remember me</Checkbox>
                <Link href="#" size="sm">Forgot password?</Link>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Login
              </Button>

              <div className="text-center text-sm">
                <span className="text-default-500">Don't have an account? </span>
                <Link as={RouterLink} to="/signup">Sign up</Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
