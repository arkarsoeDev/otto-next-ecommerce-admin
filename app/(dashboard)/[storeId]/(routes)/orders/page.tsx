import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { getAllOrders } from "@/actions/owner/order";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const { data, error } = await getAllOrders({ params: { storeId: params.storeId } })

  let content
  if (data) {
    const formattedOrders: OrderColumn[] = data.content.map((item) => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


    content = (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OrderClient data={formattedOrders} />
        </div>
      </div>
    )
  } else {
    content = (
      <div>no order exist</div>
    )
  }

  return (
    <>
      {content}
    </>
  );
}

export default OrdersPage;
