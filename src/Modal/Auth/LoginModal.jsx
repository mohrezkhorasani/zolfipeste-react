import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MobileModal from "./MobileModal";
import CodeModal from "./CodeModal";

export default function LoginModal() {
  const [showMobile, setShowMobile] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (!Cookies.get("t1")) {
      setShowMobile(true);
    }
  }, []);

  const handleMobileNext = (num) => {
    setMobile(num);
    setShowMobile(false);
    setShowCode(true);
  };

  const handleSuccess = () => {
    setShowCode(false);
  };

  return (
    <>
      {showMobile && <MobileModal onNext={handleMobileNext} />}
      {showCode && <CodeModal mobile={mobile} onSuccess={handleSuccess} />}
    </>
  );
}