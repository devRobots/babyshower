import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Button,
} from '@react-email/components';

interface RSVPConfirmationEmailProps {
  guestName: string;
  isAttending: boolean;
  message?: string | null;
}

export default function RSVPConfirmationEmail({
  guestName,
  isAttending,
  message,
}: RSVPConfirmationEmailProps) {
  const firstName = guestName.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>
        {isAttending
          ? `¡Confirmado! Te esperamos en el baby shower`
          : 'Lamentamos que no puedas asistir'}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isAttending ? '🎉 ¡Confirmado!' : '💕 Gracias por responder'}
          </Heading>

          <Text style={text}>Hola {firstName},</Text>

          {isAttending ? (
            <>
              <Text style={text}>
                ¡Nos alegra mucho contar contigo! Tu asistencia ha sido confirmada para nuestro baby shower.
              </Text>
              <Text style={text}>
                Estamos muy emocionados de compartir este momento tan especial contigo.
              </Text>
              <Section style={buttonContainer}>
                <Button style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/gifts`}>
                  Seleccionar un regalo
                </Button>
              </Section>
            </>
          ) : (
            <>
              <Text style={text}>
                Aunque no puedas acompañarnos en persona, sigues siendo una parte muy especial de este momento.
              </Text>
              <Text style={text}>
                Tu cariño y buenos deseos significan mucho para nosotros.
              </Text>
            </>
          )}

          {message && (
            <>
              <Text style={text}>Tu mensaje:</Text>
              <Section style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </Section>
            </>
          )}

          <Text style={footer}>
            Con cariño,
            <br />
            Los futuros papás 👶
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f8f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '48px 32px',
  marginBottom: '32px',
  borderRadius: '24px',
  maxWidth: '600px',
  border: '4px solid #efd4db',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#d55873',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0 0 32px',
  textAlign: 'center' as const,
};

const text = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d55873',
  borderRadius: '9999px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 36px',
};

const messageBox = {
  backgroundColor: '#f8f6f6',
  borderRadius: '16px',
  border: '2px solid #efd4db',
  padding: '20px',
  margin: '24px 0',
};

const messageText = {
  color: '#666666',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '0',
};

const footer = {
  color: '#999999',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '40px',
  textAlign: 'center' as const,
};
