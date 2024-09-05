export const metadata = {
  title: "samirbhattarai",
  description: "Developed by Samir Bhattarai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
