import { User } from "./user";

export interface iHeader {
    user?: User | null;
    title?: string;
    showMyAccount?: boolean;
    showStats?: boolean;
    showSponsor?: boolean;
}