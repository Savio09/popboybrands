import { formatCurrency, formatNumber } from "@/lib/formatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { db } from "../db/db";
import { use } from "react";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getProductData() {
  const [available, notAvailable] = await Promise.all([
    db.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    db.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);
  return {
    available,
    notAvailable,
  };
}

async function getCustomerData() {
  const [customerCount, orderData] = await Promise.all([
    db.customer.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    customerCount,
    averageValuePerUser:
      customerCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / customerCount / 100,
  };
}

export default async function AdminDashboard() {
  const [
    { amount, numberOfSales },
    { customerCount, averageValuePerUser },
    { available, notAvailable },
  ] = await Promise.all([getSalesData(), getCustomerData(), getProductData()]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Active Products"
        description="Manage your products"
        subtitle={formatNumber(notAvailable) + " Inactive Products"}
        body={formatNumber(available) + " Active Products"}
      />
      <DashboardCard
        title="Customers"
        description="Manage your customers"
        subtitle={formatNumber(customerCount) + " customers"}
        body={formatCurrency(averageValuePerUser) + " average value per user"}
      />
      <DashboardCard
        title="Sales"
        description={"Manage your sales"}
        subtitle={`You have ${formatNumber(numberOfSales)} orders`}
        body={formatCurrency(amount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  description: string;
  subtitle?: string;
  body: string;
};

function DashboardCard({
  title,
  description,
  subtitle,
  body,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
          {subtitle && <h2 className="text-2xl">{subtitle}</h2>}
        </CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
