import Paystack from "@/services/paystack";
import { TransactionData } from "@/types";
import useThemeColor from "@/hooks/useThemeColor";
import { openBrowserAsync, WebBrowserResult } from "expo-web-browser";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useOrders from "./useOrders";
import useCart from "./useCart";
import useCurrentUser from "./useCurrentUser";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { Platform } from "react-native";


export default function usePayment() {
    const primary = useThemeColor({}, "primary");
    const [result, setResult] = useState<WebBrowserResult>();
    const [transactionRef, setTransactionRef] = useState<string>("");
    const { refreshOrders } = useOrders();
    const { currentUser } = useCurrentUser();
    const { refreshCart } = useCart(currentUser?.id!);
    const router = useRouter();

    

    useEffect(() => {
        console.log('effectworking',{result,transactionRef});
        
        // if (!result || result.type !== "cancel" || !transactionRef) return
        if (!result || !transactionRef) return;
    
        // Check for Platform before applying the cancel condition
        const isAndroid = Platform.OS === 'android';
        if (!isAndroid && result.type !== "cancel") return;
        
        verifyTransactionForPaystack(transactionRef)
            .then(async () => {
                return await Promise.all([
                    await refreshOrders(),
                    await refreshCart(),
                ])
            })
            .then(() => {
                return router.back();
            })
    }, [result,transactionRef]);
  
    async function verifyTransaction(transactionReference: string) {
        const paymentSucceeded = await Paystack.verifyTransaction(transactionReference);
        return paymentSucceeded
    }
  

    async function initializeTransaction(data: TransactionData) {   
        const response = await Paystack.initializeTransaction(data);
        console.log("paystack",response)
        setTransactionRef(response.reference)
        console.log("opening browser with URL:", response.authorization_url);
        const result = await openBrowserAsync(response.authorization_url, {
            createTask: false,
            dismissButtonStyle: 'close',
            toolbarColor: primary
        })
        console.log("browser result:", result);
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