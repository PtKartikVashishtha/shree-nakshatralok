import { signIn } from "@/auth";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#4b0d08] px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <div className="text-3xl text-amber-600">
            ✦
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#68170f]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Shree Nakshatralok Jyotish Sansthan
          </p>

        </div>

        <form action={login} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border p-3 outline-none focus:border-amber-600"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border p-3 outline-none focus:border-amber-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#8b2418] px-6 py-3 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Sign In
          </button>

        </form>

      </div>

    </main>
  );
}