export interface User {
        id: number;
        nume: string;
        prenume: string;
        datanastere: Date; //string
        email: string;
        telefon: string;
        dataadaugare?: Date;
        cnp?: string;
        poza?: string;
        actiune?: string;
        users?: any;
      }

