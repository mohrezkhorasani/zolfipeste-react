// BreadCrumb.jsx
import BreadCrumbParent from "./BreadCrumbParent";

export default function BreadCrumb() {
  const breadCrumbs = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "پسته احمدآقایی", href: "/products/ahmadaghayi" },
  ];

  return <BreadCrumbParent breadCrumbs={breadCrumbs} />;
}
