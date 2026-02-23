import Cookies from "js-cookie";
import LoginModal from "../Modal/Auth/LoginModal";
import { useNavigate, useOutletContext } from "react-router-dom";
import BreadCrumbParent from "../Component/BreadCrumbParent";
import DashboardPageItem from "@/Component/Dashboard/DashboardPageItem";
import { useEffect } from "react";

export default function DashboardPage() {

    const { setBreadcrumb } = useOutletContext(); // گرفتن تابع از Layout

    const navigation = useNavigate();
    const breadCrumbs = [
        { label: "پیستاچی هاب", href: "/" },
        { label: "حساب کاربری من", href: "/my-account" },
    ];
    useEffect(() => {
        if (setBreadcrumb) {
            setBreadcrumb(<BreadCrumbParent breadCrumbs={breadCrumbs} />);
        }
    }, []);
    if (!Cookies.get("t1")) {
        return (
            <div dir="rtl" className="min-h-screen bg-white">
                <LoginModal />
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-col md:flex-row lg:flex-row 2xl:flex-row gap-[2%] w-full px-[2%]">
                <DashboardPageItem
                    icon={"icon-shopping-cart"}
                    title={"سبد خرید"}
                    count={3}
                />
                <DashboardPageItem
                    icon={"icon-check-circle"}
                    title={"سفارشات تکمیل شده"}
                    count={0}
                />
                <DashboardPageItem
                    icon={"icon-check-circle"}
                    title={"سفارشات درحال پردازش"}
                    count={0}
                />
                <DashboardPageItem
                    icon={"icon-file-text"}
                    title={"سفارشات در دست بررسی"}
                    count={1}
                />
            </div>

            <div
            className="mt-[5%]"
            >

            </div>
        </>
    )
}
