import Paystack from "@/services/paystack";
import { TransactionData } from "@/types";
import useThemeColor from "@/hooks/useThemeColor";
import { openBrowserAsync, WebBrowserResult } from "expo-web-browser";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function usePayment() {
    const primary = useThemeColor({}, "primary");
    const [result, setResult] = useState<WebBrowserResult>();
    const [transactionRef, setTransactionRef] = useState<string>("");

    useEffect(() => {
        if (!result || result.type !== "cancel" || !transactionRef) return
        
        verifyTransactionForPaystack(transactionRef);
    }, [result]);
  
    async function verifyTransaction(transactionReference: string) {
        const paymentSucceeded = await Paystack.verifyTransaction(transactionReference);
        return paymentSucceeded
    }
  

    async function initializeTransaction(data: TransactionData) {
        const response = await Paystack.initializeTransaction(data);
        setTransactionRef(response.reference)

        const result = await openBrowserAsync(response.authorization_url, {
            createTask: false,
            dismissButtonStyle: 'close',
            toolbarColor: primary
        })
    
        setResult(result)
    }

    const { mutateAsync: initializeTransactionForPaystack } = useMutation({
        mutationFn: initializeTransaction
    })

    const { mutateAsync: verifyTransactionForPaystack } = useMutation({
        mutationFn: verifyTransaction,
        onSuccess: (paymentSucceeded) => {
            if (!paymentSucceeded) {
                return Toast.show({
                    type: "error",
                    text1: "Payment was not successful"
                })
            } else {
                return Toast.show({
                    type: "success",
                    text1: "Payment was successful"
                })
            }
        }
    })


    return {
        initializeTransactionForPaystack,

    }
}