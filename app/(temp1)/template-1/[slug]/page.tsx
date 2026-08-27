import Home from "@/components/template-1/Home";
import { connectDB } from "@/lib/db";
import School from "@/lib/models/School";
import { SiteConfigUpdater } from "@/components/context/SiteConfigContext";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug).toLowerCase();

    await connectDB();
    // Search for case-insensitive exact title or space-replaced slug
    let school = await School.findOne({
      title: { $regex: new RegExp(`^${decodedSlug.replace(/-/g, " ")}$`, "i") }
    });

    if (!school) {
      school = await School.findOne({
        title: { $regex: new RegExp(`^${decodedSlug}$`, "i") }
      });
    }

    return {
      title: school ? `${school.title} - Kindergarten & School` : "School Not Found",
      description: school ? `Welcome to ${school.title}` : "Template School website",
    };
  } catch (error) {
    return {
      title: "School - Kindergarten & School",
    };
  }
}

export default async function DynamicSchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  let school = null;
  let connectionError = null;

  try {
    await connectDB();
    // Try matching space-replaced slug (e.g. "greenwood-school" -> "greenwood school")
    school = await School.findOne({
      title: { $regex: new RegExp(`^${decodedSlug.replace(/-/g, " ")}$`, "i") }
    });

    if (!school) {
      // Try matching slug directly (e.g. "Greenwood School")
      school = await School.findOne({
        title: { $regex: new RegExp(`^${decodedSlug}$`, "i") }
      });
    }
  } catch (error: any) {
    connectionError = error.message || error;
  }

  if (connectionError) {
    return (
      <div className="min-h-screen bg-[#FFF9EA] flex items-center justify-center p-6 font-quicksand">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-red-100 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Database Connection Error</h1>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Could not connect to MongoDB. Please check your connection URI and network settings.
          </p>
          <code className="block bg-slate-50 text-red-600 text-xs p-3 rounded-xl mb-6 overflow-x-auto text-left font-mono">
            {connectionError}
          </code>
          <Link
            href="/template-1"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
          >
            Go to Default School
          </Link>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-[#FFF9EA] flex items-center justify-center p-6 font-quicksand">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-orange-100 text-center">
          <div className="text-orange-400 text-5xl mb-4">🏫</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">School Not Found</h1>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            The school <strong className="text-orange-500">"{decodedSlug}"</strong> is not registered in the database.
          </p>
          <div className="space-y-3">
            <Link
              href="/api/seed"
              target="_blank"
              className="block bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
            >
              Seed Sample Schools Data 🚀
            </Link>
            <p className="text-xs text-slate-400">
              Opens a new tab to populate database with: Kingdom Kindergarten, Greenwood School, and Sunnyvale PlaySchool.
            </p>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                href="/template-1"
                className="text-sm font-semibold text-slate-500 hover:text-orange-400 transition-colors"
              >
                ← Back to Default Template
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Convert mongoose doc to plain object for React
  const schoolConfig = {
    title: school.title,
    mobile: school.mobile,
    email: school.email,
    address: school.address,
  };

  return (
    <>
      <SiteConfigUpdater config={schoolConfig} />
      <Home />
    </>
  );
}
