import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { site } from "@/lib/site";

type SubmissionStatus =
  | "NEW"
  | "CONTACTED"
  | "COMPLETED";

type SubmissionType =
  | "GENERAL"
  | "KUNDALI_MILAN"
  | "JANAM_KUNDLI";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const submissions = await prisma.submission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  async function logout() {
    "use server";

    await signOut({
      redirectTo: "/admin/login",
    });
  }

  const data = submissions.map((item) => ({
    id: item.id,

    // Submission type
    type: (item.type || "GENERAL") as SubmissionType,

    // General consultation
    name: item.name ?? undefined,
    dob: item.dob ?? undefined,
    birthTime: item.birthTime ?? undefined,
    address: item.address ?? undefined,
    question: item.question ?? undefined,

    // Kundali Milan - Person 1
    person1Name: item.person1Name ?? undefined,
    person1Dob: item.person1Dob ?? undefined,
    person1BirthTime:
      item.person1BirthTime ?? undefined,
    person1BirthPlace:
      item.person1BirthPlace ?? undefined,

    // Kundali Milan - Person 2
    person2Name: item.person2Name ?? undefined,
    person2Dob: item.person2Dob ?? undefined,
    person2BirthTime:
      item.person2BirthTime ?? undefined,
    person2BirthPlace:
      item.person2BirthPlace ?? undefined,

    status: item.status as SubmissionStatus,

    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#f5efe4] text-[#291412]">

      {/* HEADER */}

      <header className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#d7ad63]" />

          <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-20 top-10 text-5xl text-[#d7ad63]">
            ✦
          </div>

        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-8">

          <div className="flex items-center justify-between">

            {/* BRAND */}

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cda456]/50 text-xl text-[#e4c57d]">
                ✦
              </div>

              <div>

                <p className="font-serif text-lg text-[#f2d99d]">
                  श्री नक्षत्रलोक
                </p>

                <p className="text-[9px] tracking-[3px] text-[#a99683]">
                  JYOTISH SANSTHAN
                </p>

              </div>

            </div>


            {/* ACCOUNT */}

            <div className="flex items-center gap-3">

              <div className="hidden text-right sm:block">

                <p className="text-xs text-[#a99683]">
                  Signed in as
                </p>

                <p className="text-sm font-medium text-[#ead9b3]">
                  {session.user.email}
                </p>

              </div>

              <form action={logout}>

                <button
                  type="submit"
                  className="rounded-full border border-[#d5ae62]/40 px-5 py-2.5 text-xs font-semibold tracking-wide text-[#ead49a] transition hover:bg-white/10"
                >
                  Logout
                </button>

              </form>

            </div>

          </div>

        </div>

      </header>


      {/* DASHBOARD */}

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">

        <div className="mb-10">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            PRIVATE DASHBOARD
          </p>

          <div className="mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">

            <div>

              <h1 className="font-serif text-4xl font-medium text-[#57120d] md:text-5xl">
                Consultation Requests
              </h1>

              <p className="mt-2 text-sm text-[#806d66]">
                Manage and review enquiries received through
                your website.
              </p>

            </div>

            <div className="hidden text-right md:block">

              <p className="text-xs uppercase tracking-[2px] text-[#a58c78]">
                Office Hours
              </p>

              <p className="mt-1 text-sm font-semibold text-[#57120d]">
                {site.timings}
              </p>

            </div>

          </div>

        </div>


        <AdminDashboard submissions={data} />

      </section>


      {/* FOOTER */}

      <footer className="border-t border-[#d8c9b3] bg-[#eee6d8]">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center text-[10px] tracking-wide text-[#8c796b] md:flex-row md:items-center md:justify-between md:px-8 md:text-left">

          <span>
            © {new Date().getFullYear()} Shree Nakshatralok
            Jyotish Sansthan
          </span>

          <span className="text-[#a2742e]">
            सत्य · सेवा · विश्वास
          </span>

        </div>

      </footer>

    </main>
  );
}