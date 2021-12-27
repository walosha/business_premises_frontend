const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
const { verifyToken } = require("utils/generateToken");

const withAuth = (WrappedComponet) => {
  return (props) => {
    const [verified, setVerified] = useState(false);
    if (typeof window !== undefined) {
      const Router = useRouter();
      useEffect(() => {
        async function resolveToken() {
          const token = localStorage.getItem("token");

          if (!token) {
            return Router.push("/");
          }

          if (token) {
            const isVerified = await verifyToken(token);
            if (isVerified) {
              setVerified(isVerified);
            } else {
              localStorage.removeItem("token");
              return Router.push("/");
            }
          }
        }

        resolveToken();
      }, [Router]);
    }

    if (verified) {
      return <WrappedComponet {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
