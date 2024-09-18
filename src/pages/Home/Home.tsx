import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { camera, cardOutline, logOutOutline } from "ionicons/icons";
import { usePhotoGallery } from "../../utils/hooks/usePhotoGallery";
import {
  convertUriToBase64,
  useReceiptProcessingContext,
} from "../../utils/receiptProcessing";
import { Routes } from "../../Routes";
import { HOME_PAGE_MENU_ID } from "./constants";
import { signout, useFirebaseContext } from "../../utils/auth/firebase";

import "./Home.css";
import { UseAppToast } from "../../utils/hooks/useAppToast";
import { useEffect, useState } from "react";
import {
  getBankDetails,
  getReceiptsByIds,
  getUserReceipts,
  Receipt,
} from "../../utils/database/firestore";
import { Capacitor } from "@capacitor/core";
import { CapturedReceipt } from "../../utils/receiptProcessing/types";
import { useDarkModeContext } from "../../utils/hooks/useDarkMode";
import { formatEpoch } from "../../utils/formatEpoch";

export const Home: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const router = useIonRouter();
  const { setCapturedReceipt: setCapturedReceipt } =
    useReceiptProcessingContext();
  const [present] = UseAppToast();
  const { user } = useFirebaseContext();
  const [userReceipts, setUserReceipts] = useState<Receipt[]>([]);
  const [fetchingUserReceipts, setFetchingUserReceipts] = useState(false);
  const { isDarkModeEnabled, toggleDarkMode } = useDarkModeContext();
  const [showAddBankDetails, setShowAddBankDetails] = useState(false);

  const getUserReceiptDetails = async (userId: string) => {
    try {
      setFetchingUserReceipts(true);
      const receiptIds = await getUserReceipts(userId);
      console.log("receipt ids", receiptIds);
      if (!receiptIds) return;
      const receipts = await getReceiptsByIds(receiptIds);
      // TODO: Check if the array could be <(Receipt|null)[]>
      setUserReceipts(receipts as Receipt[]);
    } finally {
      setFetchingUserReceipts(false);
    }
  };

  const fetchUserBankDetails = async (userId: string) => {
    const bankDetails = await getBankDetails(userId);
    if (!bankDetails?.accountName) {
      setShowAddBankDetails(true);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getUserReceiptDetails(user.uid);
      fetchUserBankDetails(user.uid);
    }
  }, [user?.uid]);

  const handleCapture = async () => {
    try {
      const receiptImage = await takePhoto();

      const image: CapturedReceipt = {
        uri: receiptImage?.path,
        webPath: receiptImage?.webPath,
        base64String: receiptImage?.base64String,
      };

      if (Capacitor.isNativePlatform()) {
        image.base64String = await convertUriToBase64(
          receiptImage?.webPath as string
        );
      }

      if (!image) return;

      setCapturedReceipt(image);

      // TODO: Remove the below line
      return router.push(Routes.ReadingReceipt, "forward");
      // TODO: Afer capturing the image, redirect to ReadingReceipt
    } catch (error) {
      console.log("error in capture", error);
      present("Unable to pick image. Please check the camera permissions");
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      router.push(Routes.Login);
    } catch (error) {
      console.log("error for logout", error);
    }
  };

  const redirectToBankDetails = () => {
    router.push(Routes.BankDetails, "none");
  };

  console.log("user receipts", userReceipts);
  return (
    <>
      <IonMenu contentId={HOME_PAGE_MENU_ID} side="end" type="push">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonToggle
                checked={isDarkModeEnabled}
                justify="space-between"
                onIonChange={toggleDarkMode}
              >
                Dark Mode
              </IonToggle>
            </IonItem>
            <IonItem routerDirection="forward" routerLink={Routes.BankDetails}>
              <IonIcon icon={cardOutline} slot="start" />
              <IonLabel>Bank Details</IonLabel>
            </IonItem>
            <IonItem detail onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id={HOME_PAGE_MENU_ID}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Bill Sharing</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSegment>
            <IonSegmentButton>
              <IonLabel>Created</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton>
              <IonLabel>Received</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          {showAddBankDetails && (
            <IonCard>
              <IonCardContent>
                <IonText>
                  <p>Enter your bank details to start receiving payments</p>
                </IonText>
                <IonButton fill="clear" onClick={redirectToBankDetails}>
                  Add
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}
          <IonList className="ion-margin-top">
            {fetchingUserReceipts &&
              [1, 2, 3].map((item) => (
                <IonItem key={item}>
                  <IonAvatar slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonAvatar>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText
                        animated={true}
                        style={{ width: "80%" }}
                      ></IonSkeletonText>
                    </h3>
                    <p>
                      <IonSkeletonText
                        animated={true}
                        style={{ width: "60%" }}
                      ></IonSkeletonText>
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            {!fetchingUserReceipts &&
              (userReceipts.length > 0 ? (
                userReceipts.map((receipt) => (
                  <IonItem
                    key={receipt.id}
                    routerDirection="none"
                    routerLink={Routes.ReceiptDetails.replace(
                      ":receiptId",
                      receipt.id
                    )}
                  >
                    <IonAvatar slot="start">
                      <img alt="receipt" src={receipt.imageUrl} />
                    </IonAvatar>
                    <IonLabel>
                      <h3>{receipt.title}</h3>
                      <p> {formatEpoch(receipt.createdAt)}</p>
                    </IonLabel>
                  </IonItem>
                ))
              ) : (
                <IonItem>
                  <IonLabel>
                    No expenses yet. Capture a receipt to start splitting the
                    bills
                  </IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <div className="ion-text-center">
              <IonButton onClick={handleCapture}>
                <IonIcon icon={camera} slot="start"></IonIcon>
                Capture Receipt
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};
