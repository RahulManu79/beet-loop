import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import GooglePayButton from "@google-pay/button-react";

function Premium() {
  return (
    <div className="w-full  bg-white">
      <div className="w-full h-44  flex justify-center items-center gap-2 flex-col">
        <h1 className="text-4xl font-bold text-black">Pick your Premium</h1>
        <p className="text-black">
          Listen without limits on your phone, speaker, and other devices.
        </p>
      </div>
      <div className="w-full h-[71vh]  px-20 flex gap-5 justify-center items-center pb-4">
        <div className="h-[68vh] w-64 bg-white rounded-lg shadow-2xl border-t p-4 transition duration-500 hover:scale-105 ">
          <button className="bg-[#1D75DE] text-white font-medium px-2 py-1 rounded-md ">
            4 moths free{" "}
          </button>
          <button className="border text-[#1D75DE] border-[#1D75DE] px-2 border-2 rounded-md mt-3">
            One-time plans available
          </button>
          <h1 className="text-black font-bold text-2xl mt-1">Individual</h1>
          <p className="text-black mt-1">
            ₹119/month after offer period 1 account
          </p>
          <hr className="border-black mt-5" />
          <div className="gap-4 flex flex-col mt-2">
            <div className="flex gap-2">
              <DoneIcon sx={{ color: "black" }} />
              <p className="text-black">Ad-free music listening</p>
            </div>
            <div className="flex gap-2">
              <DoneIcon sx={{ color: "black" }} />
              <p className="text-black">Group Session</p>
            </div>
            <div className="flex gap-2">
              <DoneIcon sx={{ color: "black" }} />
              <p className="text-black">
                Download 10k songs/device on 5 devices
              </p>
            </div>
          </div>
          <div className="w-full h-14 mt-2 flex justify-center items-center">
            {/* <button className="bg-black text-white font-medium py-2 px-4 hover:scale-105 rounded-2xl">
              Purchase Plan
            </button> */}
            <GooglePayButton
              className="bg-black font-medium hover:scale-105 rounded-2xl"
              buttonSizeMode="fill"
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: "100.00",
                  currencyCode: "USD",
                  countryCode: "US",
                },
                shippingAddressRequired: false,
                callbackIntents: ["PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
              onPaymentAuthorized={(paymentData) => {
                console.log("payment Authorized success", paymentData);
                return { transactionState: "SUCCESS" };
              }}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="buy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
