import Navbar from "@/components/guest/navbar/navbar"

export default function GuestLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar />
        {children}
      </section>
    )
  }