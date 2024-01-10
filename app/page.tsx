import Image from "next/image"
import Pagination from "./_components/Pagination"

export default function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <div className="w-100 p-4 bg-slate-200">
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  )
}
