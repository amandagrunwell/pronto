import { getClientDetails } from "@/lib/Dao/emailServiceDao";
import path from "path";
import { info } from "../services/types";

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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}`;
}
export function getCustomCeoEmail(info: info) {
  const [format, domain] = info.cfo_email.split("@");

  const ceoFirstName = info.ceo_name.split(" ")[0];
  return `${ceoFirstName}@${domain}`;
}

export function getFirstName(name: string) {
  return capitalizeName(name.split(" ")[0]);
}
export * from "./appError";

export function getRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export async function getMessage(clName: string, info: info) {
  const date = new Date();
  const todayDay = date.getDate();
  const todayMonth = date.getMonth();
  const todayYear = date.getFullYear();
  const invoice_number = "";
  const ceo_name = info.ceo_name;
  const ceo_email = info.ceo_email;

  const toCeo = `</b> ${capitalizeName(ceo_name)}<br />`;
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
    const message = `
    <html
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
  xmlns="http://www.w3.org/TR/REC-html40"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
    <meta name="ProgId" content="Word.Document" />
    <meta name="Generator" content="Microsoft Word 15" />
    <meta name="Originator" content="Microsoft Word 15" />

    <!--[if gte mso 9
      ]><xml>
        <w:WordDocument>
          <w:DocumentKind>DocumentEmail</w:DocumentKind>
          <w:TrackMoves />
          <w:TrackFormatting />
          <w:ValidateAgainstSchemas />
          <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
          <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
          <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
          <w:DoNotPromoteQF />
          <w:LidThemeOther>en-US</w:LidThemeOther>
          <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
          <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
          <w:Compatibility>
            <w:DoNotExpandShiftReturn />
            <w:BreakWrappedTables />
            <w:SnapToGridInCell />
            <w:WrapTextWithPunct />
            <w:UseAsianBreakRules />
            <w:DontGrowAutofit />
            <w:SplitPgBreakAndParaMark />
            <w:EnableOpenTypeKerning />
            <w:DontFlipMirrorIndents />
            <w:OverrideTableStyleHps />
          </w:Compatibility>
          <m:mathPr>
            <m:mathFont m:val="Cambria Math" />
            <m:brkBin m:val="before" />
            <m:brkBinSub m:val="&#45;-" />
            <m:smallFrac m:val="off" />
            <m:dispDef />
            <m:lMargin m:val="0" />
            <m:rMargin m:val="0" />
            <m:defJc m:val="centerGroup" />
            <m:wrapIndent m:val="1440" />
            <m:intLim m:val="subSup" />
            <m:naryLim m:val="undOvr" /> </m:mathPr
        ></w:WordDocument> </xml
    ><![endif]-->
    <!--[if gte mso 9
      ]><xml>
        <w:LatentStyles
          DefLockedState="false"
          DefUnhideWhenUsed="false"
          DefSemiHidden="false"
          DefQFormat="false"
          DefPriority="99"
          LatentStyleCount="376"
        >
          <w:LsdException
            Locked="false"
            Priority="0"
            QFormat="true"
            Name="Normal"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            QFormat="true"
            Name="heading 1"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 2"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 3"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 4"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 5"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 6"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 7"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 8"
          />
          <w:LsdException
            Locked="false"
            Priority="9"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="heading 9"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 6"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 7"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 8"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index 9"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 1"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 2"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 3"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 4"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 5"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 6"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 7"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 8"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toc 9"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Normal Indent"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="footnote text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="annotation text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="header"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="footer"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="index heading"
          />
          <w:LsdException
            Locked="false"
            Priority="35"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="caption"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="table of figures"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="envelope address"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="envelope return"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="footnote reference"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="annotation reference"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="line number"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="page number"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="endnote reference"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="endnote text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="table of authorities"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="macro"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="toa heading"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Bullet"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Number"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Bullet 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Bullet 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Bullet 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Bullet 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Number 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Number 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Number 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Number 5"
          />
          <w:LsdException
            Locked="false"
            Priority="10"
            QFormat="true"
            Name="Title"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Closing"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Signature"
          />
          <w:LsdException
            Locked="false"
            Priority="1"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Default Paragraph Font"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text Indent"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Continue"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Continue 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Continue 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Continue 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="List Continue 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Message Header"
          />
          <w:LsdException
            Locked="false"
            Priority="11"
            QFormat="true"
            Name="Subtitle"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Salutation"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Date"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text First Indent"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text First Indent 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Note Heading"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text Indent 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Body Text Indent 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Block Text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Hyperlink"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="FollowedHyperlink"
          />
          <w:LsdException
            Locked="false"
            Priority="22"
            QFormat="true"
            Name="Strong"
          />
          <w:LsdException
            Locked="false"
            Priority="20"
            QFormat="true"
            Name="Emphasis"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Document Map"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Plain Text"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="E-mail Signature"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Top of Form"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Bottom of Form"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Normal (Web)"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Acronym"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Address"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Cite"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Code"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Definition"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Keyboard"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Preformatted"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Sample"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Typewriter"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="HTML Variable"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Normal Table"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="annotation subject"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="No List"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Outline List 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Outline List 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Outline List 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Simple 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Simple 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Simple 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Classic 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Classic 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Classic 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Classic 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Colorful 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Colorful 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Colorful 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Columns 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Columns 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Columns 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Columns 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Columns 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 6"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 7"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Grid 8"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 4"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 5"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 6"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 7"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table List 8"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table 3D effects 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table 3D effects 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table 3D effects 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Contemporary"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Elegant"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Professional"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Subtle 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Subtle 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Web 1"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Web 2"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Web 3"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Balloon Text"
          />
          <w:LsdException Locked="false" Priority="39" Name="Table Grid" />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Table Theme"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            Name="Placeholder Text"
          />
          <w:LsdException
            Locked="false"
            Priority="1"
            QFormat="true"
            Name="No Spacing"
          />
          <w:LsdException Locked="false" Priority="60" Name="Light Shading" />
          <w:LsdException Locked="false" Priority="61" Name="Light List" />
          <w:LsdException Locked="false" Priority="62" Name="Light Grid" />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2"
          />
          <w:LsdException Locked="false" Priority="65" Name="Medium List 1" />
          <w:LsdException Locked="false" Priority="66" Name="Medium List 2" />
          <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1" />
          <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2" />
          <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3" />
          <w:LsdException Locked="false" Priority="70" Name="Dark List" />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading"
          />
          <w:LsdException Locked="false" Priority="72" Name="Colorful List" />
          <w:LsdException Locked="false" Priority="73" Name="Colorful Grid" />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 1"
          />
          <w:LsdException Locked="false" SemiHidden="true" Name="Revision" />
          <w:LsdException
            Locked="false"
            Priority="34"
            QFormat="true"
            Name="List Paragraph"
          />
          <w:LsdException
            Locked="false"
            Priority="29"
            QFormat="true"
            Name="Quote"
          />
          <w:LsdException
            Locked="false"
            Priority="30"
            QFormat="true"
            Name="Intense Quote"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="60"
            Name="Light Shading Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="61"
            Name="Light List Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="62"
            Name="Light Grid Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="63"
            Name="Medium Shading 1 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="64"
            Name="Medium Shading 2 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="65"
            Name="Medium List 1 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="66"
            Name="Medium List 2 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="67"
            Name="Medium Grid 1 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="68"
            Name="Medium Grid 2 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="69"
            Name="Medium Grid 3 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="70"
            Name="Dark List Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="71"
            Name="Colorful Shading Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="72"
            Name="Colorful List Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="73"
            Name="Colorful Grid Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="19"
            QFormat="true"
            Name="Subtle Emphasis"
          />
          <w:LsdException
            Locked="false"
            Priority="21"
            QFormat="true"
            Name="Intense Emphasis"
          />
          <w:LsdException
            Locked="false"
            Priority="31"
            QFormat="true"
            Name="Subtle Reference"
          />
          <w:LsdException
            Locked="false"
            Priority="32"
            QFormat="true"
            Name="Intense Reference"
          />
          <w:LsdException
            Locked="false"
            Priority="33"
            QFormat="true"
            Name="Book Title"
          />
          <w:LsdException
            Locked="false"
            Priority="37"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Bibliography"
          />
          <w:LsdException
            Locked="false"
            Priority="39"
            SemiHidden="true"
            UnhideWhenUsed="true"
            QFormat="true"
            Name="TOC Heading"
          />
          <w:LsdException Locked="false" Priority="41" Name="Plain Table 1" />
          <w:LsdException Locked="false" Priority="42" Name="Plain Table 2" />
          <w:LsdException Locked="false" Priority="43" Name="Plain Table 3" />
          <w:LsdException Locked="false" Priority="44" Name="Plain Table 4" />
          <w:LsdException Locked="false" Priority="45" Name="Plain Table 5" />
          <w:LsdException
            Locked="false"
            Priority="40"
            Name="Grid Table Light"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light"
          />
          <w:LsdException Locked="false" Priority="47" Name="Grid Table 2" />
          <w:LsdException Locked="false" Priority="48" Name="Grid Table 3" />
          <w:LsdException Locked="false" Priority="49" Name="Grid Table 4" />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="Grid Table 1 Light Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="Grid Table 2 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="Grid Table 3 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="Grid Table 4 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="Grid Table 5 Dark Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="Grid Table 6 Colorful Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="Grid Table 7 Colorful Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light"
          />
          <w:LsdException Locked="false" Priority="47" Name="List Table 2" />
          <w:LsdException Locked="false" Priority="48" Name="List Table 3" />
          <w:LsdException Locked="false" Priority="49" Name="List Table 4" />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 1"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 2"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 3"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 4"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 5"
          />
          <w:LsdException
            Locked="false"
            Priority="46"
            Name="List Table 1 Light Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="47"
            Name="List Table 2 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="48"
            Name="List Table 3 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="49"
            Name="List Table 4 Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="50"
            Name="List Table 5 Dark Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="51"
            Name="List Table 6 Colorful Accent 6"
          />
          <w:LsdException
            Locked="false"
            Priority="52"
            Name="List Table 7 Colorful Accent 6"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Mention"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Smart Hyperlink"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Hashtag"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Unresolved Mention"
          />
          <w:LsdException
            Locked="false"
            SemiHidden="true"
            UnhideWhenUsed="true"
            Name="Smart Link"
          />
        </w:LatentStyles> </xml
    ><![endif]-->
    <style>
      <!--
       /* Font Definitions */
       @font-face
      	{font-family:"Cambria Math";
      	panose-1:2 4 5 3 5 4 6 3 2 4;
      	mso-font-charset:0;
      	mso-generic-font-family:roman;
      	mso-font-pitch:variable;
      	mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
      @font-face
      	{font-family:Calibri;
      	panose-1:2 15 5 2 2 2 4 3 2 4;
      	mso-font-charset:0;
      	mso-generic-font-family:swiss;
      	mso-font-pitch:variable;
      	mso-font-signature:-469750017 -1040178053 9 0 511 0;}
      @font-face
      	{font-family:Aptos;
      	mso-font-charset:0;
      	mso-generic-font-family:swiss;
      	mso-font-pitch:variable;
      	mso-font-signature:536871559 3 0 0 415 0;}
       /* Style Definitions */
       p.MsoNormal, li.MsoNormal, div.MsoNormal
      	{mso-style-unhide:no;
      	mso-style-qformat:yes;
      	mso-style-parent:"";
      	margin:0cm;
      	mso-pagination:widow-orphan;
      	font-size:12.0pt;
      	font-family:"Aptos",sans-serif;
      	mso-fareast-font-family:Aptos;
      	mso-fareast-theme-font:minor-latin;
      	mso-bidi-font-family:Aptos;}
      a:link, span.MsoHyperlink
      	{mso-style-noshow:yes;
      	mso-style-priority:99;
      	color:#467886;
      	mso-themecolor:hyperlink;
      	text-decoration:underline;
      	text-underline:single;}
      a:visited, span.MsoHyperlinkFollowed
      	{mso-style-noshow:yes;
      	mso-style-priority:99;
      	color:#96607D;
      	mso-themecolor:followedhyperlink;
      	text-decoration:underline;
      	text-underline:single;}
      p
      	{mso-style-noshow:yes;
      	mso-style-priority:99;
      	margin:0cm;
      	mso-pagination:widow-orphan;
      	font-size:12.0pt;
      	font-family:"Aptos",sans-serif;
      	mso-fareast-font-family:Aptos;
      	mso-fareast-theme-font:minor-latin;
      	mso-bidi-font-family:Aptos;}
      p.msonormal0, li.msonormal0, div.msonormal0
      	{mso-style-name:msonormal;
      	mso-style-unhide:no;
      	margin:0cm;
      	mso-pagination:widow-orphan;
      	font-size:12.0pt;
      	font-family:"Aptos",sans-serif;
      	mso-fareast-font-family:Aptos;
      	mso-fareast-theme-font:minor-latin;
      	mso-bidi-font-family:Aptos;}
      span.EmailStyle19
      	{mso-style-type:personal;
      	mso-style-noshow:yes;
      	mso-style-unhide:no;
      	mso-ansi-font-size:12.0pt;
      	mso-bidi-font-size:12.0pt;
      	font-family:"Aptos",sans-serif;
      	mso-ascii-font-family:Aptos;
      	mso-ascii-theme-font:minor-latin;
      	mso-fareast-font-family:Aptos;
      	mso-fareast-theme-font:minor-latin;
      	mso-hansi-font-family:Aptos;
      	mso-hansi-theme-font:minor-latin;
      	mso-bidi-font-family:"Times New Roman";
      	mso-bidi-theme-font:minor-bidi;
      	color:windowtext;}
      span.EmailStyle20
      	{mso-style-type:personal-compose;
      	mso-style-noshow:yes;
      	mso-style-unhide:no;
      	mso-ansi-font-size:12.0pt;
      	mso-bidi-font-size:12.0pt;
      	font-family:"Aptos",sans-serif;
      	mso-ascii-font-family:Aptos;
      	mso-ascii-theme-font:minor-latin;
      	mso-fareast-font-family:Aptos;
      	mso-fareast-theme-font:minor-latin;
      	mso-hansi-font-family:Aptos;
      	mso-hansi-theme-font:minor-latin;
      	mso-bidi-font-family:"Times New Roman";
      	mso-bidi-theme-font:minor-bidi;
      	color:windowtext;}
      .MsoChpDefault
      	{mso-style-type:export-only;
      	mso-default-props:yes;
      	font-size:10.0pt;
      	mso-ansi-font-size:10.0pt;
      	mso-bidi-font-size:10.0pt;
      	mso-font-kerning:0pt;
      	mso-ligatures:none;}
      @page WordSection1
      	{size:612.0pt 792.0pt;
      	margin:72.0pt 72.0pt 72.0pt 72.0pt;
      	mso-header-margin:36.0pt;
      	mso-footer-margin:36.0pt;
      	mso-paper-source:0;}
      div.WordSection1
      	{page:WordSection1;}
      -->
    </style>
    <!--[if gte mso 10]>
      <style>
        /* Style Definitions */
        table.MsoNormalTable {
          mso-style-name: "Table Normal";
          mso-tstyle-rowband-size: 0;
          mso-tstyle-colband-size: 0;
          mso-style-noshow: yes;
          mso-style-priority: 99;
          mso-style-parent: "";
          mso-padding-alt: 0cm 5.4pt 0cm 5.4pt;
          mso-para-margin: 0cm;
          mso-pagination: widow-orphan;
          font-size: 10pt;
          font-family: "Times New Roman", serif;
        }
      </style>
    <![endif]-->
  </head>

  <body
    lang="en-US"
    link="#467886"
    vlink="#96607D"
    style="tab-interval: 36pt; word-wrap: break-word"
  >
    <div class="WordSection1">
      <p class="MsoNormal"><o:p>&nbsp;</o:p></p>

      <p class="MsoNormal">
        <span
          lang="en-US"
          style="
            mso-ascii-font-family: Aptos;
            mso-ascii-theme-font: minor-latin;
            mso-hansi-font-family: Aptos;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: 'Times New Roman';
            mso-bidi-theme-font: minor-bidi;
            mso-ansi-language: #0c00;
            mso-fareast-language: EN-US;
          "
          >Could we arrange payment for ${clDetails.name} today? Below is the
          relevant thread with ${
            clDetails.gender === "female" ? "her" : "his"
          } details for your reference.</span
        ><span
          style="
            mso-ascii-font-family: Aptos;
            mso-ascii-theme-font: minor-latin;
            mso-hansi-font-family: Aptos;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: 'Times New Roman';
            mso-bidi-theme-font: minor-bidi;
            mso-fareast-language: EN-US;
          "
          ><o:p></o:p
        ></span>
      </p>

      <p class="MsoNormal">
        <span
          lang="en-US"
          style="
            mso-ascii-font-family: Aptos;
            mso-ascii-theme-font: minor-latin;
            mso-hansi-font-family: Aptos;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: 'Times New Roman';
            mso-bidi-theme-font: minor-bidi;
            mso-ansi-language: #0c00;
            mso-fareast-language: EN-US;
          "
          ><br />
          Thank You,&nbsp;</span
        ><span
          style="
            mso-ascii-font-family: Aptos;
            mso-ascii-theme-font: minor-latin;
            mso-hansi-font-family: Aptos;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: 'Times New Roman';
            mso-bidi-theme-font: minor-bidi;
            mso-fareast-language: EN-US;
          "
          ><o:p></o:p
        ></span>
      </p>

      <p class="MsoNormal">
        <span
          lang="en-US"
          style="
            mso-ascii-font-family: Aptos;
            mso-ascii-theme-font: minor-latin;
            mso-hansi-font-family: Aptos;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: 'Times New Roman';
            mso-bidi-theme-font: minor-bidi;
            mso-ansi-language: #0c00;
            mso-fareast-language: EN-US;
          "
          ><o:p>&nbsp;</o:p></span
        >
      </p>

      <div>
        <div
          style="
            border: none;
            border-top: solid #e1e1e1 1pt;
            padding: 3pt 0cm 0cm 0cm;
          "
        >
          <p class="MsoNormal">
            <a name="_MailOriginal"
              ><b
                ><span
                  lang="EN-US"
                  style="
                    font-size: 11pt;
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    mso-ansi-language: EN-US;
                  "
                  >From:</span
                ></b
              ></a
            ><span style="mso-bookmark: _MailOriginal"
              ><span
                lang="EN-US"
                style="
                  font-size: 11pt;
                  font-family: 'Calibri', sans-serif;
                  mso-fareast-font-family: 'Times New Roman';
                  mso-ansi-language: EN-US;
                "
              >
                ${clDetails.name} &lt;${clDetails.email}&gt; <br />
                <b>Sent:</b> ${reminder}<br />
                <b>To:${toCeo}
                <b>Subject:</b> Outstanding Invoice Reminder<o:p></o:p></span
            ></span>
          </p>
        </div>
      </div>

      <p class="MsoNormal">
        <span style="mso-bookmark: _MailOriginal"><o:p>&nbsp;</o:p></span>
      </p>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Dear Customer,<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal" style="margin-bottom: 12pt">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              ><o:p>&nbsp;</o:p></span
            ></span
          >
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >This is a friendly reminder on your past due invoice
              <b>${invoice_number} </b>. Please accept this as a friendly
              reminder and remit payment at your earliest convenience via ACH or
              Direct Deposit as discussed earlier.<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal" style="margin-bottom: 12pt">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              ><o:p>&nbsp;</o:p></span
            ></span
          >
        </p>
      </div>

      <table
        class="MsoNormalTable"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          border-collapse: collapse;
          mso-yfti-tbllook: 1184;
          mso-padding-alt: 0cm 0cm 0cm 0cm;
          border-spacing: 0px;
          box-sizing: border-box;
        "
      >
        <tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes">
          <td
            width="100"
            style="
              width: 75pt;
              border: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Inv<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="150"
            style="
              width: 112.5pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Purchase Order<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="100"
            style="
              width: 75pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Inv Date<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="100"
            style="
              width: 75pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Due Date<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="200"
            style="
              width: 150pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Original Inv Amount<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="100"
            style="
              width: 75pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Balance Due<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            width="100"
            style="
              width: 75pt;
              border: solid black 1pt;
              border-left: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Term<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
        </tr>
        <tr style="mso-yfti-irow: 1">
          <td
            style="
              border: solid black 1pt;
              border-top: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >&nbsp;${invoice_number}<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >N/A<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >${invoiceDate}<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >${dueDate}<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="right" style="text-align: right">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >${clDetails.amount}<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="right" style="text-align: right">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >${clDetails.amount}<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border-top: none;
              border-left: none;
              border-bottom: solid black 1pt;
              border-right: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="center" style="text-align: center">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >On-Receipt<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
        </tr>
        <tr style="mso-yfti-irow: 2; mso-yfti-lastrow: yes">
          <td
            style="
              border-top: none;
              border-left: solid black 1pt;
              border-bottom: solid black 1pt;
              border-right: none;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <span style="mso-bookmark: _MailOriginal"></span>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border: none;
              border-bottom: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <span style="mso-bookmark: _MailOriginal"></span>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            style="
              border: none;
              border-bottom: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <span style="mso-bookmark: _MailOriginal"></span>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            colspan="2"
            style="
              border: none;
              border-bottom: solid black 1pt;
              padding: 0.75pt 0.75pt 0.75pt 0.75pt;
            "
          >
            <p class="MsoNormal" align="right" style="text-align: right">
              <span style="mso-bookmark: _MailOriginal"
                ><span
                  style="
                    font-family: 'Calibri', sans-serif;
                    mso-fareast-font-family: 'Times New Roman';
                    color: black;
                  "
                  >Total:<o:p></o:p></span
              ></span>
            </p>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
          <td
            colspan="2"
            style="
              border: solid black 1pt;
              border-top: none;
              padding: 0.75pt 0.75pt 0.75pt 2.6pt;
            "
          >
            <div>
              <p class="MsoNormal">
                <span style="mso-bookmark: _MailOriginal"
                  ><span
                    style="
                      font-family: 'Calibri', sans-serif;
                      mso-fareast-font-family: 'Times New Roman';
                      color: black;
                    "
                    >USD ${clDetails.amount}<o:p></o:p></span
                ></span>
              </p>
            </div>
          </td>
          <span style="mso-bookmark: _MailOriginal"></span>
        </tr>
      </table>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              ><br />
              Please contact me if you have any billing questions.<o:p
              ></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal" style="margin-bottom: 12pt">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              ><o:p>&nbsp;</o:p></span
            ></span
          >
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Payment can be made to the account details below:<o:p
              ></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Bank Name: ${clDetails.bankName}<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Account Name: ${clDetails.name}&nbsp;<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Routing Number: ${clDetails.routineNumber}<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Account Number: ${clDetails.accountNumber}<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Account Type : ${clDetails.accountType}<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >&nbsp;<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Your continuous patronage is well appreciated.&nbsp;<o:p
              ></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal" style="margin-bottom: 12pt">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              ><o:p>&nbsp;</o:p></span
            ></span
          >
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >Warm Regards<o:p></o:p></span
          ></span>
        </p>
      </div>

      <div>
        <p class="MsoNormal">
          <span style="mso-bookmark: _MailOriginal"
            ><span
              style="
                font-family: 'Calibri', sans-serif;
                mso-fareast-font-family: 'Times New Roman';
                color: black;
              "
              >${clDetails.name}<o:p></o:p></span
          ></span>
        </p>
      </div>

      <span style="mso-bookmark: _MailOriginal"></span>

      <div>
        <p class="MsoNormal">
          <span
            style="
              font-family: 'Calibri', sans-serif;
              mso-fareast-font-family: 'Times New Roman';
              color: black;
            "
            ><o:p>&nbsp;</o:p></span
          >
        </p>
      </div>
    </div>
  </body>
</html>
  `;
    return message;
  } catch (error) {
    process.exit(1);
  }
}
