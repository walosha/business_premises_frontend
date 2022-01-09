import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import axios from "axios";
import { formatCurrency } from "utils/formatCurrency";
import { useRouter } from "next/router";

export default function HeaderStats() {
  const [businessesCount, setBusinessCount] = useState(0);
  const [invoicesCount, setInvoicesCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const businesses = axios.get("/api/businesses/count");
    const invoices = axios.get("/api/invoices/count");
    axios
      .all([businesses, invoices])
      .then((response) => {
        const [businesses, invoices] = response;
        setBusinessCount(businesses.data.data);
        setInvoicesCount(invoices.data.data[0]);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/");
        }
      });
  }, []);
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Total Businesses Captured"
                  statTitle={businessesCount}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Total Bills Generated"
                  statTitle={formatCurrency(invoicesCount?.totalAmount)}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Current Amount Generated"
                  statTitle="N 924,000.43"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
