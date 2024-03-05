export interface Request {
    id: string;
    type: RequestType;
    personDetails: PersonDetails;
    requestDetails: RequestDetails;
    history: History[];
  }
  
  export interface PersonDetails {
    fistName: string;
    lastName: string;
    birthDay: string;
    position: string;
  }
  
  export interface History {
    created: string;
    status: HistoryStatus;
    comment?: string;
  }

  export type HistoryStatus = 'SUBMITTED' | 'APPROVED_BY_MANAGER' | 'REJECTED_BY_MANAGER';
  export type RequestType = 'INTERNAL_MOBILITY' | 'PARENTAL_LEAVE' | 'ILLNESS';
  export type RequestDetails = InternalMobilityDetails | ParentalLeaveDetails | IllnessDetails;
 
  export type InternalMobilityDetails = {
    desiredStartDate: string;
    from: string;
    to: string;
  }

  export type DateRange = {
    startDate: string;
     endDate: string;
    }

  export type ParentalLeaveDetails = DateRange & {
    flexible: boolean;
    numberOfMaximumFlexibleDays: number;
  }

  export type IllnessDetails = DateRange & {
    longTerm: boolean;
    medicalDocumentRequired: boolean;
  }