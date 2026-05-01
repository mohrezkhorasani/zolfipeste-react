import { Outlet } from "react-router-dom";
import HeaderStickTop from "../Component/HeaderStickTop";
import Footer from "../Component/Footer";
import FooterUpper from "../Component/FooterUpper";
import { useAuth } from "../Tools/AuthProvider";
import LoadingPage from "../Pages/loading";
import { VerifyToken } from "../api/post";
const BaseLayout = () => {
  const { user, loading, refetchUser } = useAuth();
  // console.log(user,loading) 
  if(loading)
    return <LoadingPage/>

  return (
    <div className="min-h-screen bg-white"
      dir="rtl"

    >
      {/* <HeaderStickTop 
        user={user}
      /> */}

      {/* محتوای هر صفحه اینجا رندر می‌شود */}
      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default BaseLayout;