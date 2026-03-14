"use client"
import { notFound, useParams, useRouter } from "next/navigation";
import PurchaseForm from "@/components/AddEditPurchase";
import { PurchaseFormData } from "@/components/AddEditPurchase";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
const [purchase, setPurchase] = useState<PurchaseFormData | null>(null)
  const params = useParams();
  const id = params?.id;
  const router = useRouter()

   useEffect(() => {
    // Move fetchPurchase inside useEffect
    const fetchPurchase = async () => {
      try {
        // Replace with your HTTP client implementation
        // const response = await axios.get(`/api/purchases/${purchaseId}`);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/purchases/${id}`, {
          withCredentials: true
        });
        const data = await response.data;
        console.log(data.purchase)
        setPurchase(data.purchase);
      } catch (error) {
        console.error('Error fetching purchase:', error);
        toast.error('Failed to load purchase details');
        router.push('/purchases');
      }
    };

    if (id) {
      fetchPurchase();
    }
  }, []); 
  return <PurchaseForm purchase={purchase} />; // Pass the purchase data as a prop
}