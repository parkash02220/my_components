import { Suspense } from "react";
import GoogleSuccessContent from "./GoogleSearchContent";

const GoogleSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSuccessContent />
    </Suspense>
  );
};

export default GoogleSuccessPage;
