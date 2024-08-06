import { ComponentProps, FC } from "react";
import { Redirect, Route } from "react-router";
import { useFirebaseContext } from "../../utils/auth/firebase";
import { Routes } from "../../Routes";
import Lottie from "lottie-react";
import unlockAnimation from "../../../public/lottie-animations/Unlock.json";

import "./AuthRoute.css";

export const AuthRoute: FC<ComponentProps<typeof Route>> = ({
  children,
  ...rest
}) => {
  const { user, isLoading } = useFirebaseContext();

  if (isLoading) {
    return (
      <div className="animation-container">
        <Lottie animationData={unlockAnimation} height={50} width={50} />{" "}
      </div>
    );
  }

  if (user) {
    return <Redirect to={Routes.Home} />;
  }

  return <Route {...rest}>{children}</Route>;
};
