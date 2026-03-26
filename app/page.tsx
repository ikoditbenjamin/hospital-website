import { AppointmentForm } from "@/components/appointment-form";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonial";

export const metadata = {
  title: "Home",
  description:
    "Jiddena Medical Clinic in Kampala provides trusted healthcare services including consultation, diagnosis, and treatment. Book your appointment today.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
       <Hero />
      <Services />
      <Testimonials />
      <AppointmentForm />

     
    </main>
  )
}
