import EmailForm from "./EmailForm";

interface EmailTemplateProps {
  firstName: string;
}

const EmailTemplate = ({ firstName }: EmailTemplateProps) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <EmailForm />
  </div>
);

export default EmailTemplate;
