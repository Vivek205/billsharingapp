// TODO: Merge with FirebaseUser or Rename it
export type UserDetails = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  receiptIds?: string[];
};
