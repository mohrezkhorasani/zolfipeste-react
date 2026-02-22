// BreadCrumbParent.jsx
export default function BreadCrumbParent({ breadCrumbs }) {
  return (
    <nav className="text-sm flex flex-wrap md:flex-nowrap items-center space-x-1 overflow-hidden">
      {breadCrumbs.map((crumb, index) => {
        const isLast = index === breadCrumbs.length - 1;
        return (
          <span key={index} className="flex items-center truncate">
            {isLast ? (
              <span className="text-gray-400 truncate">{crumb.label}</span>
            ) : (
              <a
                href={crumb.href}
                className="text-black hover:text-[#BBD430] truncate"
              >
                {crumb.label}
              </a>
            )}
            {!isLast && <span className="mx-1 text-gray-400"> &gt; </span>}
          </span>
        );
      })}
    </nav>
  );
}