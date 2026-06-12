import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

import { stripe } from '@/lib/stripe';
import { createSubscription } from '@/lib/actions';


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status == 'complete') {
    const subInfo = {
      email: customerEmail,
      planId: metadata.planId
    }
    await createSubscription(subInfo)
    
    
  }

  return (
    <section className="relative bg-black py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">

            {/* Top Gradient Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

            <div className="p-8 md:p-12 lg:p-16">

              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500 blur-3xl opacity-20" />

                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <CheckCircle2 className="h-16 w-16 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                  <Sparkles size={16} />
                  Payment Completed
                </div>
              </div>

              {/* Heading */}
              <div className="mt-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                  Welcome to
                  <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    HireLoop Premium
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                  Your subscription has been activated successfully.
                  You now have access to all premium recruiting tools and
                  advanced hiring features.
                </p>
              </div>

              {/* Email Box */}
              <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                <p className="text-sm text-zinc-500">
                  Confirmation email sent to
                </p>

                <p className="mt-2 break-all text-lg font-semibold text-emerald-400">
                  {customerEmail}
                </p>
              </div>

              {/* Premium Features */}
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="font-semibold text-white">
                    Unlimited Jobs
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Post and manage more opportunities effortlessly.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="font-semibold text-white">
                    Better Visibility
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Boost company exposure and candidate reach.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                  <h3 className="font-semibold text-white">
                    Premium Tools
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    Access advanced hiring and recruitment features.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition-all hover:bg-emerald-400"
                >
                  Go To Dashboard
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:bg-zinc-900"
                >
                  Back To Home
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-12 border-t border-zinc-800 pt-6 text-center">
                <p className="text-sm text-zinc-500">
                  Need help with your subscription?
                </p>

                <a
                  href="mailto:support@hireloop.com"
                  className="mt-2 inline-block text-cyan-400 hover:text-cyan-300"
                >
                  support@hireloop.com
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}