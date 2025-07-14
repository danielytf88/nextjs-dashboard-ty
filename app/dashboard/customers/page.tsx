import { fetchFilteredCustomersPages } from "@/app/lib/data";
import Table from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customerTotalPages = await fetchFilteredCustomersPages(query);

  return (
    <div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={customerTotalPages} />
      </div>
    </div>
  );
}