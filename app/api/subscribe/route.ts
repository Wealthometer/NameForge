export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return Response.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Save to database (Supabase, Neon, etc.)
    // 2. Send to email service (Resend, SendGrid, etc.)
    // 3. Add to mailing list (Mailchimp, ConvertKit, etc.)

    // For now, we'll just log it and return success
    console.log("[v0] New email subscription:", email)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    return Response.json({
      success: true,
      message: "Successfully subscribed! Check your inbox for name ideas.",
    })
  } catch (error) {
    console.error("[v0] Error subscribing email:", error)
    return Response.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
