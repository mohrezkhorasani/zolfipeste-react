import { Outlet } from "react-router-dom";
import HeaderStickTop from "../Component/HeaderStickTop";
import Footer from "../Component/Footer";
import FooterUpper from "../Component/FooterUpper";

const BaseLayout = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <HeaderStickTop />
      
      {/* محتوای هر صفحه اینجا رندر می‌شود */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      <FooterUpper />
      <Footer />
    </div>
  );
};

export default BaseLayout;