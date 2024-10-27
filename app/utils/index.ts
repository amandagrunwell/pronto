import { getClientDetails } from "@/lib/Dao/emailServiceDao";
import { info } from "../types/type";
import path from "path";

export function setShowAlert(
  message: string,
  color: string,
  setAlert: (message: string, color: string) => void,
  timeout?: number
) {
  setAlert(message, color);
  setTimeout(() => {
    setAlert("", "");
  }, timeout ?? 3000);
}

export function capitalizeName(name: string): string {
  const words = name.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

// export function pdfAttachment(name: string) {
//   try {
//     const filePath = path.join(
//       __dirname,
//       "../..",
//       "public",
//       `${name.split(" ")[0].toLocaleLowerCase()}.pdf`
//     );
//     const fileContent =fs readFileSync(filePath);
//     return {
//       filename: `${name} Account Detail .pdf`,
//       content: fileContent,
//       contentType: "application/pdf",
//     };
//   } catch (error) {
//     console.error("Error reading the PDF file:", error);
//     return null;
//   }
// }

// export function formatDate(date: Date): string {
//   // Define options for the date part
//   const dateOptions: Intl.DateTimeFormatOptions = {
//     weekday: "short", // 'short' is a valid option
//     month: "short", // 'short' is a valid option
//     day: "numeric", // 'numeric' is a valid option
//     year: "numeric", // 'numeric' is a valid option
//   };
//
//   // Define options for the time part
//   const timeOptions: Intl.DateTimeFormatOptions = {
//     hour: "numeric", // 'numeric' is a valid option
//     minute: "numeric", // 'numeric' is a valid option
//     hour12: true, // boolean is valid here
//   };
//
//   // Format the date and time parts
//   const dateString = new Intl.DateTimeFormat("en-US", dateOptions).format(date);
//   const timeString = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
//
//   return `${dateString} at ${timeString}`;
// }

function formatDateShort(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
export function dateDiff(date: Date) {
  const today = new Date();
  const givenDate = new Date(date);
  const diffInMs = today.getTime() - givenDate.getTime();

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}
function formatFullDate(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `On ${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
// export function getCeoEmail(info: info) {
//   const [format, domain] = info.cfo_email.split("@");
//
//   const ceoFirstName = info.ceo_name.split(" ")[0];
//   return `${ceoFirstName}@${domain}`;
// }

export function getFirstName(name: string) {
  return capitalizeName(name.split(" ")[0]);
}
export * from "./appError";

export function getRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export async function getMessage(clName: string) {
  const date = new Date();
  const todayDay = date.getDate();
  const todayMonth = date.getMonth();
  const todayYear = date.getFullYear();
  const invoiceDate = formatDateShort(
    new Date(todayYear, todayMonth - 1, todayDay)
  );
  const dueDate = formatDateShort(
    new Date(todayYear, todayMonth, todayDay - 1)
  );
  const reminder = formatFullDate(
    new Date(todayYear, todayMonth, todayDay, 8, 33, 35)
  );

  try {
    const clDetails = await getClientDetails(clName);
    if (!clDetails) {
      process.exit(1);
    }
    const message = `<body>
    <div>
      <div>Please arrange payment for ${
        clDetails.name
      } today!!. ${"Below is the relevant thread with"} ${
      clDetails.gender === "female" ? "her" : "his"
    } details for your reference.</div>
      <br />
      Thank You,
      <br />
      <div
        class="x_542322869zmail_extra_hr"
        style="
          border-top: 1px solid rgb(204, 204, 204);
          min-height: 0px;
          margin-top: 10px;
          margin-bottom: 10px;
          line-height: 0px;
        "
      >
        <br />
      </div>
      <br />
      <div class="x_542322869zmail_extra">
        <div><br /></div>
        <div id="x_542322869Zm-_Id_-Sgn1">
          ---- ${reminder}
          <b
            >${clDetails.name} &lt;<a
              href="mailto:${clDetails.email}"
              target="_blank"
              >${clDetails.email}</a
            >&gt;</b
          >
          wrote: ---<br />
        </div>
        <div><br /></div>
        <div id="x_897536581zmail_block"></div>
      </div>
      <div
        style="
          border-left: 1px solid rgb(204, 204, 204);
          padding-left: 10px;
          margin: 0 0 0 9px;
        "
      >
        <div>
          <div
            style="
              font-family: Verdana, Arial, Helvetica, sans-serif;
              font-size: 10pt;
            "
          >
            <div><br /></div>
  
            <div><br /></div>
          </div>
        </div>
        <blockquote id="x_542322869blockquote_zmail" style="margin: 0px">
          <div>
            <div dir="ltr">
              <div
                style="
                  font-size: 13px;
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  padding-top: 0px;
                  border-top: 0px;
                "
                dir="ltr"
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none"
                    >Dear Customer,</span
                  ></span
                ><br />
              </div>
              <div>
                <span class="x_542322869colour" style="color: rgb(29, 34, 40)"
                  ><span
                    class="x_542322869font"
                    style="font-family: Verdana, Arial, Helvetica, sans-serif"
                    ><span
                      class="x_542322869size"
                      style="
                        font-size: 13.3333px;
                        letter-spacing: -0.32px;
                        outline: none;
                      "
                      ><span
                        class="x_542322869colour"
                        style="color: rgb(51, 51, 51); outline: none"
                        ><span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          ><span
                            class="x_542322869size"
                            style="
                              font-size: 14px;
                              letter-spacing: normal;
                              outline: none;
                            "
                            ><br
                              style="
                                outline: none;
                              " /></span></span></span></span></span
                ></span>
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  padding-top: 0px;
                  border-top: 0px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    >This is a friendly reminder on your past due
                    invoice&nbsp;</span
                  ></span
                ><span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    ><b style="outline: none"
                      ><span style="outline: none; text-align: center"
                        >000120919
                      </span></b
                    >. Please accept this as a friendly reminder and remit payment
                    at your earliest convenience via ACH or Direct Deposit as
                    discussed earlier.</span
                  ></span
                ><br style="outline: none" />
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <div>
                  <span
                    class="x_542322869font"
                    style="font-family: arial, sans-serif; outline: none"
                    ><br style="outline: none"
                  /></span>
                </div>
                <table
                  style="
                    outline: none;
                    font-size: 14px;
                    border: 1px solid black;
                    border-collapse: collapse;
                  "
                >
                  <tbody style="outline: none">
                    <tr style="outline: none">
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 100px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Inv</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 150px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Purchase Order</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 100px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Inv Date</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 100px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Due Date</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 200px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Original Inv Amount</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 100px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Balance Due</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          width: 100px;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Term</span
                        ><br style="outline: none" />
                      </td>
                    </tr>
                    <tr style="outline: none">
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >&nbsp;000120919</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >NA</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >${invoiceDate}</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >${dueDate}</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: right;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >${clDetails.amount}</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: right;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >${clDetails.amount}</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          text-align: center;
                        "
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >On-Receipt</span
                        ><br style="outline: none" />
                      </td>
                    </tr>
                    <tr style="outline: none">
                      <td style="word-break: normal; outline: none">
                        <br style="outline: none" />
                      </td>
                      <td style="word-break: normal; outline: none">
                        <br style="outline: none" />
                      </td>
                      <td style="word-break: normal; outline: none">
                        <br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          text-align: right;
                        "
                        colspan="2"
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >Total:</span
                        ><br style="outline: none" />
                      </td>
                      <td
                        style="
                          word-break: normal;
                          outline: none;
                          border: 1px solid black;
                          border-collapse: collapse;
                          padding-left: 3.4531px;
                        "
                        colspan="3"
                      >
                        <span
                          class="x_542322869font"
                          style="font-family: arial, sans-serif; outline: none"
                          >USD ${clDetails.amount}</span
                        ><br style="outline: none" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <span
                    class="x_542322869font"
                    style="font-family: arial, sans-serif; outline: none"
                    ><br style="outline: none" /><span
                      class="x_542322869size"
                      style="font-size: 14px; outline: none; margin: 0px"
                      >Please contact me if you have any billing questions.</span
                    ></span
                  >
                </div>
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    ><br /></span
                ></span>
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                  >
                    <div>
                      <p
                        style="
                          letter-spacing: -0.32px;
                          margin: 0in;
                          background-image: none;
                          background-size: auto;
                          background-repeat: repeat;
                          outline: none;
                        "
                      >
                        <span
                          class="x_542322869colour"
                          style="color: rgb(0, 0, 0)"
                          ><span
                            class="x_542322869font"
                            style="
                              font-family: Aptos, sans-serif;
                              letter-spacing: -0.32px;
                              margin: 0in;
                              background-image: none;
                              background-size: auto;
                              background-repeat: repeat;
                              outline: none;
                            "
                            ><span style="outline: none"
                              ><span
                                class="x_542322869colour"
                                style="color: rgb(51, 51, 51)"
                                ><span
                                  class="x_542322869font"
                                  style="
                                    font-family: Arial, sans-serif;
                                    outline: none;
                                  "
                                  >Payment can be made to the account details
                                  ${
                                    clDetails.accountLevel === "local"
                                      ? "below:"
                                      : "attached"
                                  }</span
                                ></span
                              ></span
                            ></span
                          ></span
                        ><br />
                      </p>
                     ${
                       clDetails.accountLevel === "local"
                         ? `<div class=bankPay>
                        <p
                          style="
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                        >
                          <span
                            class="x_542322869colour"
                            style="color: rgb(0, 0, 0)"
                            ><span
                              class="x_542322869font"
                              style="
                                font-family: Aptos, sans-serif;
                                letter-spacing: -0.32px;
                                margin: 0in;
                                background-image: none;
                                background-size: auto;
                                background-repeat: repeat;
                                outline: none;
                              "
                              ><span style="outline: none"
                                ><span
                                  class="x_542322869colour"
                                  style="color: rgb(51, 51, 51)"
                                  ><span
                                    class="x_542322869font"
                                    style="
                                      font-family: Arial, sans-serif;
                                      outline: none;
                                    "
                                    >Bank Name: ${clDetails.bankName}</span
                                  ></span
                                ></span
                              ></span
                            ></span
                          ><br />
                        </p>
                        <p
                          style="
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                        >
                          <span
                            class="x_542322869colour"
                            style="color: rgb(0, 0, 0)"
                            ><span
                              class="x_542322869font"
                              style="
                                font-family: Aptos, sans-serif;
                                letter-spacing: -0.32px;
                                margin: 0in;
                                background-image: none;
                                background-size: auto;
                                background-repeat: repeat;
                                outline: none;
                              "
                              ><span style="outline: none"
                                ><span
                                  class="x_542322869colour"
                                  style="color: rgb(51, 51, 51)"
                                  ><span
                                    class="x_542322869font"
                                    style="
                                      font-family: Arial, sans-serif;
                                      outline: none;
                                    "
                                    >Account Name: ${clDetails.name}&nbsp;</span
                                  ></span
                                ></span
                              ></span
                            ></span
                          ><br />
                        </p>
                        <p
                          style="
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                        >
                          <span
                            class="x_542322869colour"
                            style="color: rgb(0, 0, 0)"
                            ><span
                              class="x_542322869font"
                              style="
                                font-family: Aptos, sans-serif;
                                letter-spacing: -0.32px;
                                margin: 0in;
                                background-image: none;
                                background-size: auto;
                                background-repeat: repeat;
                                outline: none;
                              "
                              ><span style="outline: none"
                                ><span
                                  class="x_542322869colour"
                                  style="color: rgb(51, 51, 51)"
                                  ><span
                                    class="x_542322869font"
                                    style="
                                      font-family: Arial, sans-serif;
                                      outline: none;
                                    "
                                    >Routing Number:<span
                                      style="outline: none"
                                      dir="ltr"
                                      >${clDetails.routineNumber}</span
                                    ></span
                                  ></span
                                ></span
                              ></span
                            ></span
                          ><br />
                        </p>
                        <p
                          style="
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                        >
                          <span
                            class="x_542322869colour"
                            style="color: rgb(0, 0, 0)"
                            ><span
                              class="x_542322869font"
                              style="
                                font-family: Aptos, sans-serif;
                                letter-spacing: -0.32px;
                                margin: 0in;
                                background-image: none;
                                background-size: auto;
                                background-repeat: repeat;
                                outline: none;
                              "
                              ><span style="outline: none"
                                ><span
                                  class="x_542322869colour"
                                  style="color: rgb(51, 51, 51)"
                                  ><span
                                    class="x_542322869font"
                                    style="
                                      font-family: Arial, sans-serif;
                                      outline: none;
                                    "
                                    >Account Number:${clDetails.accountNumber}</span
                                  ></span
                                ></span
                              ></span
                            ></span
                          ><br />
                        </p>
                        <p
                          style="
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                        >
                          <span
                            class="x_542322869colour"
                            style="color: rgb(0, 0, 0)"
                            ><span
                              class="x_542322869font"
                              style="
                                font-family: Aptos, sans-serif;
                                letter-spacing: -0.32px;
                                margin: 0in;
                                background-image: none;
                                background-size: auto;
                                background-repeat: repeat;
                                outline: none;
                              "
                              ><span style="outline: none"
                                ><span
                                  class="x_542322869colour"
                                  style="color: rgb(51, 51, 51)"
                                  ><span
                                    class="x_542322869font"
                                    style="
                                      font-family: Arial, sans-serif;
                                      outline: none;
                                    "
                                    >Account Type : ${clDetails.accountType}</span
                                  ></span
                                ></span
                              ></span
                            ></span
                          ><br />
                        </p>
                      </div>`
                         : ""
                     }
                      <p
                        style="
                          letter-spacing: -0.32px;
                          margin: 0in;
                          background-image: none;
                          background-size: auto;
                          background-repeat: repeat;
                          outline: none;
                        "
                      >
                        <span
                          class="x_542322869colour"
                          style="color: rgb(0, 0, 0)"
                          ><span
                            class="x_542322869font"
                            style="
                              font-family: Aptos, sans-serif;
                              letter-spacing: -0.32px;
                              margin: 0in;
                              background-image: none;
                              background-size: auto;
                              background-repeat: repeat;
                              outline: none;
                            "
                            ><span style="outline: none"
                              ><span
                                class="x_542322869colour"
                                style="color: rgb(51, 51, 51)"
                                ><span
                                  class="x_542322869font"
                                  style="
                                    font-family: Arial, sans-serif;
                                    outline: none;
                                  "
                                  >&nbsp;</span
                                ></span
                              ></span
                            ></span
                          ></span
                        ><br />
                      </p>
                    </div>
                    <p
                      style="
                        letter-spacing: -0.32px;
                        margin: 0in;
                        background-image: none;
                        background-size: auto;
                        background-repeat: repeat;
                        outline: none;
                      "
                    >
                      <span class="x_542322869colour" style="color: rgb(0, 0, 0)"
                        ><span
                          class="x_542322869font"
                          style="
                            font-family: Aptos, sans-serif;
                            letter-spacing: -0.32px;
                            margin: 0in;
                            background-image: none;
                            background-size: auto;
                            background-repeat: repeat;
                            outline: none;
                          "
                          ><span style="outline: none"
                            ><span
                              class="x_542322869colour"
                              style="color: rgb(51, 51, 51)"
                              ><span
                                class="x_542322869font"
                                style="
                                  font-family: Arial, sans-serif;
                                  outline: none;
                                "
                                >Your continuous patronage is well
                                appreciated.&nbsp;</span
                              ></span
                            ></span
                          ></span
                        ></span
                      ><br /></p></span
                ></span>
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    ><br /></span
                ></span>
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    >Warm Regards</span
                  ></span
                ><br />
              </div>
              <div
                style="
                  outline: none;
                  font-family: Verdana, Arial, Helvetica, sans-serif;
                  color: rgb(51, 51, 51);
                  font-size: 11px;
                  margin: 0px;
                "
              >
                <span
                  class="x_542322869font"
                  style="font-family: arial, sans-serif; outline: none"
                  ><span
                    class="x_542322869size"
                    style="font-size: 14px; outline: none; margin: 0px"
                    >${clDetails.name}</span
                  ></span
                ><br />
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  </body>
  `;
    return message;
  } catch (error) {
    process.exit(1);
  }
}
