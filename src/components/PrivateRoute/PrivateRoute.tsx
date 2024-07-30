import { ComponentProps, FC } from "react";
import { Redirect, Route } from "react-router";
import { useFirebaseContext } from "../../utils/auth/firebase";
import { Routes } from "../../Routes";
import { IonLoading } from "@ionic/react";
import Lottie from "lottie-react";
import unlockAnimation from "../../../public/lottie-animations/Unlock.json";

import "./PrivateRoute.css";

export const PrivateRoute: FC<ComponentProps<typeof Route>> = ({
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

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: Routes.Login,
          state: { path: rest.path },
          search: rest.location?.search,
          hash: rest.location?.hash,
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};
