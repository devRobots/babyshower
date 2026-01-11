import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Img,
  Button,
} from '@react-email/components';

interface GiftSelectionEmailProps {
  guestName: string;
  giftName: string;
  giftDescription?: string | null;
  giftImage?: string | null;
  giftLink?: string | null;
}

export default function GiftSelectionEmail({
  guestName,
  giftName,
  giftDescription,
  giftImage,
  giftLink,
}: GiftSelectionEmailProps) {
  const firstName = guestName.split(' ')[0];

  return (
    <Html>
      <Head />
      <Preview>¡Regalo reservado! Gracias por tu generosidad</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎁 ¡Regalo reservado!</Heading>

          <Text style={text}>Hola {firstName},</Text>

          <Text style={text}>
            ¡Muchas gracias por tu generosidad! Has seleccionado el siguiente regalo:
          </Text>

          <Section style={giftBox}>
            {giftImage && (
              <Img
                src={giftImage}
                alt={giftName}
                width="120"
                height="120"
                style={giftImage as any}
              />
            )}
            <Heading style={giftName as any}>{giftName}</Heading>
            {giftDescription && (
              <Text style={giftDescription as any}>{giftDescription}</Text>
            )}
            {giftLink && (
              <Button style={linkButton} href={giftLink}>
                Ver producto en Amazon
              </Button>
            )}
          </Section>

          <Text style={text}>
            Tu regalo será muy especial para nuestro bebé y nuestra familia.
          </Text>

          <Text style={highlight}>
            ¡Te lo agradecemos de corazón! 💝
          </Text>

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

const giftBox = {
  backgroundColor: '#f8f6f6',
  borderRadius: '16px',
  border: '2px solid #efd4db',
  padding: '32px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const giftImageStyle = {
  borderRadius: '16px',
  margin: '0 auto 16px',
  objectFit: 'contain' as const,
};

const giftNameStyle = {
  color: '#333333',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '16px 0',
};

const giftDescStyle = {
  color: '#666666',
  fontSize: '14px',
  margin: '8px 0',
};

const linkButton = {
  backgroundColor: '#efd4db',
  borderRadius: '9999px',
  color: '#d55873',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 28px',
  marginTop: '16px',
};

const highlight = {
  color: '#d55873',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '32px 0',
};

const footer = {
  color: '#999999',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '40px',
  textAlign: 'center' as const,
};
