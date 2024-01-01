import {
  Body,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Container } from "lucide-react";

interface HipnodeReportProps {
  message: string;
  currentUrl: string;
  email: string;
}

export const HipnodeReport = ({
  message,
  currentUrl,
  email,
}: HipnodeReportProps) => {
  return (
    <Html>
      <Head />
      <Preview>{message}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>
            <strong>@{message}</strong>
          </Text>

          <Section style={section}>
            <Text style={text}>
              Please respond to this email{" "}
              <strong>
                <a href={`mailto:${email}`}>{email}</a>
              </strong>
            </Text>
            <Text style={text}>
              We are committed to responding to all complaints within 48 Hours
            </Text>
          </Section>
          <Text style={links}>
            <Link href={currentUrl} style={link}>
              Please look into this post, it has broken the Community Standards.
            </Link>
            ・<Link style={link}>Contact support</Link>
          </Text>
          <Text style={footer}>
            Hipnode ・Bulgaria, Poland, Canada & USA ・JS Mastery Graduates 2024
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default HipnodeReport;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
