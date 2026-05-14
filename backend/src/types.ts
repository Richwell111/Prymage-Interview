export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

export interface TicketNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  notes: TicketNote[];
  createdAt: string;
}
