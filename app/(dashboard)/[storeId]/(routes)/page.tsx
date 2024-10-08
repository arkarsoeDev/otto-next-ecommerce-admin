// import { getGraphRevenue } from "@/actions/get-graph-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getStockCount } from "@/actions/get-stock-count";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getGraphRevenue } from "@/actions";
import { getSalesCount } from "@/actions/dashboard/get-sales-count";
import { getStockCount } from "@/actions/dashboard/get-stock-count";
import { getTotalRevenue } from "@/actions/dashboard/get-total-revenue";
import ErrorPage from "@/components/common/error-page";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCardIcon, DollarSignIcon, Package } from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const { data: totalRevenue } = await getTotalRevenue(params.storeId);
  const { data: salesCount } = await getSalesCount(params.storeId);
  const { data: stockCount } = await getStockCount(params.storeId);
  const { data: graphRevenue } = await getGraphRevenue(params.storeId);

  if (!graphRevenue) {
    return <ErrorPage error={{ message: 'data fetching error' }
    } />
  }

  if (!totalRevenue) {
    return <ErrorPage error={{ message: 'data fetching error' }
    } />
  }

  if (!stockCount) {
    return <ErrorPage error={{ message: 'data fetching error' }
    } />
  }

  if (!salesCount) {
    return <ErrorPage error={{ message: 'data fetching error' }
    } />
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue.content)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{salesCount.content}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stockCount.content}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue.content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
