import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import School from "@/lib/models/School";

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await School.deleteMany({});

    // Insert sample schools
    const sampleSchools = [
      {
        title: "Kingdom Kindergarten",
        mobile: "+91 99999 99999",
        email: "contact.businesskiduniya@gmail.com",
        address: "2nd floor 86/3, Sant Nagar Marg, Parvatiya Anchal, Maurya Enclave, Baba Colony, Burari, Delhi, India 110084",
      },
      {
        title: "Greenwood School",
        mobile: "+1 (555) 123-4567",
        email: "admissions@greenwood.edu",
        address: "456 Skyline Drive, Vista, CA 92081",
      },
      {
        title: "Sunnyvale PlaySchool",
        mobile: "+1 (555) 987-6543",
        email: "info@sunnyvaleplay.com",
        address: "789 Blossom Lane, Sunnyvale, CA 94085",
      },
    ];

    const created = await School.insertMany(sampleSchools);

    return NextResponse.json({
      message: "Database seeded successfully",
      count: created.length,
      schools: created,
    }, { status: 200 });
  } catch (error: any) {
    console.error("Seeding failed:", error);
    return NextResponse.json({
      message: "Seeding failed",
      error: error.message || error,
    }, { status: 500 });
  }
}
