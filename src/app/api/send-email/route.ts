// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define interfaces for the request data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  installationDate: string;
  additionalNotes?: string;
  selectedSize?: string;
}

interface PackageData {
  id: string;
  title: string;
  description?: string;
  price: string | number;
  financing?: string;
  sizes?: string[];
  components?: string[];
  src?: string;
  category?: string;
  image?: string;
}

interface SelectedItem {
  id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
}

interface EmailRequestBody {
  formType: "package" | "custom";
  packageData?: PackageData;
  selectedItems: SelectedItem[];
  formData: FormData;
  estimatedTotal: number;
}

export async function POST(request: Request) {
  try {
    const body: EmailRequestBody = await request.json();

    // Format the email content based on form type
    const formatEmailContent = (): string => {
      if (body.formType === "package" && body.packageData) {
        return `
          <h2>Package Quote Request</h2>
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> ${body.packageData.title}</p>
          <p><strong>Price:</strong> $${body.packageData.price}</p>
          ${
            body.formData.selectedSize
              ? `<p><strong>Selected Size:</strong> ${body.formData.selectedSize}</p>`
              : ""
          }
          ${
            body.packageData.description
              ? `<p><strong>Description:</strong> ${body.packageData.description}</p>`
              : ""
          }
          
          ${
            body.packageData.components
              ? `
            <h4>Components:</h4>
            <ul>
              ${body.packageData.components
                .map((component: string) => `<li>${component}</li>`)
                .join("")}
            </ul>
          `
              : ""
          }
        `;
      } else {
        return `
          <h2>Custom Quote Request</h2>
          <h3>Selected Items:</h3>
          <ul>
            ${body.selectedItems
              .map(
                (item: SelectedItem) => `
              <li>
                <p><strong>${item.title}</strong> - $${item.price}</p>
                <p>${item.category ? `Category: ${item.category}` : ""}</p>
                <p>${item.description ? item.description : ""}</p>
              </li>
            `
              )
              .join("")}
          </ul>
          <p><strong>Estimated Total:</strong> $${body.estimatedTotal.toLocaleString()}</p>
        `;
      }
    };

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${formatEmailContent()}
        
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${body.formData.fullName}</p>
        <p><strong>Email:</strong> ${body.formData.email}</p>
        <p><strong>Phone:</strong> ${body.formData.phone}</p>
        <p><strong>Address:</strong> ${body.formData.address}</p>
        <p><strong>Preferred Installation Date:</strong> ${
          body.formData.installationDate || "Not specified"
        }</p>
        <p><strong>Additional Notes:</strong> ${
          body.formData.additionalNotes || "None"
        }</p>
      </div>
    `;

    // Type for Resend API response
    type ResendResponse = {
      data: { id: string } | null;
      error: Error | null;
    };

    const { data, error }: ResendResponse = await resend.emails.send({
      from: `MapleAir <MapleAirservice@xikode.lol>`, // Initially use this, later you can use a verified domain
      to: [
        "hesammoradizadeh2002@gmail.com",
        "amirezanmt@gmail.com",
        "sphr.mosafa@gmail.com",
      ],
      subject:
        body.formType === "package" && body.packageData
          ? `Package Quote Request: ${body.packageData.title}`
          : "Custom Quote Request",
      html: htmlContent,
      replyTo: body.formData.email, // So you can reply directly to the customer
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error(
      "Error sending email:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
