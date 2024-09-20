

export const metadata = {
  title: 'ASME-CET',
  description: 'American Society of Mechanical Engineers - College of Engineering Trivandrum',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
