import { RouteComponentProps } from "react-router";

export type ReceiptDetailsProps = RouteComponentProps<{
  receiptId: string;
}>;


export type ReceiptDetailsUrlParams = {
  receiptId: string;
};