import { type Request, type Response } from 'express';
import Ticket from '../models/Ticket.js';
import { ticketSchema } from '../utils/validation.js';
import { sendEmail, sendTicketUpdateEmail } from '../utils/email.js';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const result = ticketSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ success: false, message: result.error.issues[0]?.message });
    }
    const { name, email, title, description, priority } = req.body;
    const newTicket = new Ticket({ name, email, title, description, priority });
    await newTicket.save();

    await sendEmail(
      email,
      `Support Request Received: ${title}`,
      `Hello ${name},\n\nWe have received your support request regarding "${title}". Our team will review it and get back to you shortly.\n\nPriority: ${priority}\nDescription: ${description}`
    );

    res.status(201).json(newTicket);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    
    // @ts-ignore
    ticket.notes.push({ text });
    await ticket.save();

    // Send email to customer about the reply
    await sendTicketUpdateEmail(ticket.email, ticket.name, ticket.title, text);

    res.json(ticket);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
