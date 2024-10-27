export type messageDetails = {
    clName: string;
    clEmail: string;
    initialDate: string;
    reminderDate: string;
    mailSubject: string;
    bankDetails: string;
};

export type info = {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    ceo_name: string;
    ceo_email: string | null;
    cfo_email: string;
    isSent: boolean;
    isOpen: boolean;
    location?: string;
};

export type bodyType = {
    number: number;
    clName: "amanda";
};

export interface ClientMessage {
    name: string;
    email: string;
    bankName: string;
    routineNumber: string;
    accountNumber: string;
    accountType: string;
    isActive: boolean;
    accountLevel: string;
}
