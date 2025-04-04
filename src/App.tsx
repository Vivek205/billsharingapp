import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import {
  FirebaseAuthProvider,
  initializeFirebase,
} from "./utils/auth/firebase";
import { Signup } from "./pages/Signup";
import { Routes } from "./Routes";
import { BankDetails } from "./pages/BankDetails";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { initializeFirestore } from "./utils/database/firestore";
import { ReadingReceipt } from "./pages/ReadingReceipt";
import { ItemsReview } from "./pages/ItemsReview";
import { SharePaymentLink } from "./pages/SharePaymentLink";
import { ReceiptProcessingProvider } from "./utils/receiptProcessing";
import { AuthRoute } from "./components/AuthRoute/AuthRoute";
import { ReceiptDetails } from "./pages/ReceiptDetails";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import "@ionic/react/css/palettes/dark.class.css";
/* import "@ionic/react/css/palettes/dark.system.css"; */

/* Theme variables */
import "./theme/variables.css";
import { DarkModeProvider } from "./utils/hooks/useDarkMode";

setupIonicReact();
initializeFirebase();
initializeFirestore();

const App: React.FC = () => (
  <IonApp>
    <FirebaseAuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <DarkModeProvider>
            <ReceiptProcessingProvider>
              <Switch>
                <AuthRoute exact path={Routes.Login}>
                  <Login />
                </AuthRoute>
                <AuthRoute exact path={Routes.Signup}>
                  <Signup />
                </AuthRoute>

                <PrivateRoute exact path={Routes.Home}>
                  <Home />
                </PrivateRoute>
                <PrivateRoute exact path={Routes.ReadingReceipt}>
                  <ReadingReceipt />
                </PrivateRoute>
                <PrivateRoute exact path={Routes.ItemsReview}>
                  <ItemsReview />
                </PrivateRoute>
                <PrivateRoute exact path={Routes.SharePaymentLink}>
                  <SharePaymentLink />
                </PrivateRoute>
                <PrivateRoute exact path={Routes.BankDetails}>
                  <BankDetails />
                </PrivateRoute>
                <PrivateRoute
                  component={ReceiptDetails}
                  exact
                  path={Routes.ReceiptDetails}
                />
                <Route component={Home} exact path={Routes.Home} />
                <Route exact path={Routes.Root}>
                  <Redirect to={Routes.Login} />
                </Route>
              </Switch>
            </ReceiptProcessingProvider>
          </DarkModeProvider>
        </IonRouterOutlet>
      </IonReactRouter>
    </FirebaseAuthProvider>
  </IonApp>
);

export default App;
