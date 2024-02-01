import * as React from 'react';

interface FeedbackEmailProps {
  email: string;
  message: string;
}

export const FeedbackEmailTemplate: React.FC<Readonly<FeedbackEmailProps>> = ({
  email,
  message,
}) => (
  <div>
    <p>New feedback from, {email}</p>
    <p>{message}</p>
  </div>
);
