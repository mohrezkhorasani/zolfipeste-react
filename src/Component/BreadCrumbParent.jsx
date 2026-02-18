// BreadCrumbParent.jsx
export default function BreadCrumbParent({ breadCrumbs }) {
  return (
    <nav className="text-sm flex items-center space-x-1 ">
      {breadCrumbs.map((crumb, index) => {
        const isLast = index === breadCrumbs.length - 1;
        return (
          <span key={index} className="flex items-center">
            {isLast ? (
              <span className="text-gray-400">{crumb.label}</span>
            ) : (
              <a href={crumb.href} className="text-black hover:text-[#BBD430]">
                {crumb.label}
              </a>
            )}
            {!isLast && <span className="mx-1 text-gray-400">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
