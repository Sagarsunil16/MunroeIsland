import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactInquiryEmails } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone or WhatsApp number.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please enter your message or question.' },
        { status: 400 }
      );
    }

    const cleanSubject = (subject && typeof subject === 'string' && subject.trim()) || 'General Inquiry';

    // 1. Save lead to database if available
    try {
      await prisma.lead.create({
        data: {
          boatType: 'CANOE',
          experienceTitle: cleanSubject,
          source: 'form_inquiry',
        },
      });
    } catch (dbErr) {
      console.warn('Prisma lead creation skipped:', dbErr);
    }

    // 2. Dispatch emails to customer and admin
    try {
      await sendContactInquiryEmails({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: cleanSubject,
        message: message.trim(),
      });
    } catch (emailErr) {
      console.warn('Contact inquiry email dispatch failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been delivered to our dispatch desk. We will respond via email/WhatsApp shortly.',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message. Please try again or reach out on WhatsApp.' },
      { status: 500 }
    );
  }
}
