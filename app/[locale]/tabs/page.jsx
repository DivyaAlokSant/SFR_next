// app/tabpage/[locale]/page.jsx (or .tsx) – Server Component
import { fetchOverviewTab, fetchFinancesofstatesTab } from "@/app/api";
import TabClient from "@/app/components/dashboard/TabClient";

export default async function TabPage({ params }) {
  const { locale } = await params;

  const [overviewData, financesData] = await Promise.all([
    fetchOverviewTab(locale),
    fetchFinancesofstatesTab(locale),
  ]);

  const overviewContent = overviewData?.[0]?.dynamicContent || [];
  const financesContent = financesData?.[0]?.dynamicContent || [];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-200 via-orange-50 to-blue-200 py-10 px-2">
      <TabClient
        overviewContent={overviewContent}
        financesContent={financesContent}
      />
    </div>
  );
}
