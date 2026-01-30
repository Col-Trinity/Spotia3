import '@/src/app/globals.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6">
      {children}
    </section>
  )
}
