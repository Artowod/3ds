import { ChangeEvent, ChangeEventHandler, useState } from "react";
import s from "./LandingPage.module.css";
import moment from "moment";

import visa from "assets/icons/visa.png";
import mastercard from "assets/icons/mastercard.png";

export interface IMenuData {
  id: number;
  name: string;
  route?: string;
}
export const LandingPage = () => {
  const bank = { name: "MonoBank" };
  const transactionData = {
    merchant: "Coca-Cola ltd.",
    amount: 500,
    currency: "UAH",
    date: moment().format("yy-MM-DD").toString(),
    cardNumber: "4335-3333-7766-7654",
    cardType: "Visa",
    bankMessage: "",
  };

  const [code, setCode] = useState<number | string>();
  const [isError, setIsError] = useState<{ name: string } | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(null);
    setCode(e.target.value);
  };

  const showCardNumber = (cardNumber: string) => {
    if (cardNumber) {
      const convertedNumber = cardNumber.split("-");
      return `${convertedNumber[0]}-XXXX-XXXX-${convertedNumber[3]}`;
    }
  };

  const handleSubmit = () => {
    setIsError(null);
    if (code) {
      setIsSubmitting(true);
    } else setIsError({ name: "code" });
  };

  return (
    <div className={s.container}>
      <h2>3D Secure</h2>
      <div className={s.header}>
        <div className={s.headerTitle}>
          <span>Verified by</span>
          <img
            src={transactionData?.cardType === "Visa" ? visa : mastercard}
            alt=""
            width={80}
            height={80}
          />
        </div>
        <div className={s.headerTitle}>{bank?.name || "undefined bank"}</div>
      </div>
      <h3>
        {`Please submit your Verified by ${
          transactionData?.cardType || "..."
        } passcode`}
      </h3>

      <ul>
        <li className={s.dataLine}>
          <span>Merchant:</span>
          <span>{transactionData.merchant}</span>
        </li>
        <li className={s.dataLine}>
          <span>Amount:</span>
          <span
            className={s.cash}
          >{`${transactionData.currency} ${transactionData.amount}`}</span>
        </li>
        <li className={s.dataLine}>
          <span>Date:</span>
          <span>{transactionData.date}</span>
        </li>
        <li className={s.dataLine}>
          <span>Card Number:</span>
          <span>{showCardNumber(transactionData.cardNumber)}</span>
        </li>
        {transactionData.bankMessage && (
          <li className={s.dataLine}>
            <span>Bank Message:</span>
            <span>{transactionData.bankMessage}</span>
          </li>
        )}
      </ul>
      <div className={s.codeWrapper}>
        <span>Please type your code here: </span>
        <input
          style={{ borderColor: isError?.name === "code" ? "red" : "" }}
          type="number"
          value={code}
          onChange={handleChangeCode}
        ></input>
      </div>
      <div className={s.submitBtn} onClick={handleSubmit}>
        {isSubmitting ? "Submitting ..." : "Submit"}
      </div>
    </div>
  );
};
