export default function DepartmentSkeleton() {
    return (
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:pl-64 lg:grid-cols-3">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-2xl border border-gray-200 bg-gray-100 p-6"
          >
            {/* العنوان */}
            <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
  
            {/* عدد الأعضاء */}
            <div className="mb-6 h-4 w-1/4 rounded bg-gray-300"></div>
  
            {/* أعضاء وهميين */}
            {[...Array(4)].map((__, i) => (
              <div
                key={i}
                className="mb-3 h-10 rounded bg-gray-300"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
  