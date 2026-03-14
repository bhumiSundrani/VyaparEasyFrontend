"use client"
import SalesForm from "@/components/AddEditSales";
import { SaleFormData } from "@/components/AddEditSales";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";



export default function Page() {
  const params = useParams();
  const id = params?.id
  const [sale, setSale] = useState<SaleFormData|null>(null);
  const router = useRouter();
  useEffect(() => {
    // Move fetchPurchase inside useEffect
    const fetchSale = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sales/${id}`, {withCredentials: true});
        const data = response.data;
        setSale(data.sale);
      } catch (error) {
        console.error('Error fetching sale:', error);
        toast.error('Failed to load sale details');
        router.push('/sales');
      }
    };

    if (id) {
      fetchSale();
    }
  }, [id]);
  return <SalesForm sale={sale} />; // Pass the purchase data as a prop
}